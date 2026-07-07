import React, { useState } from 'react';
import { CheckCircle2, Send, Loader2, AlertCircle } from 'lucide-react';
import { getSupabase } from '@/lib/supabase';

/**
 * ContactSection
 * Shared contact form section used on the Homepage.
 * Preserves the exact design, text, layout, form and spacing
 * that was previously on the Platform page.
 */
const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    projectType: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Naam is verplicht';
    if (!formData.email.trim()) errors.email = 'E-mail is verplicht';else if (!formData.email.includes('@') || !formData.email.includes('.')) errors.email = 'Vul een geldig e-mailadres in';
    if (!formData.company.trim()) errors.company = 'Bedrijfsnaam is verplicht';
    if (!formData.message.trim()) errors.message = 'Bericht is verplicht';
    return errors;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setFormStatus('loading');
    try {
      // Persist to Supabase (best-effort, non-blocking) only when configured.
      const supabase = getSupabase();
      if (supabase) {
        try {
          await supabase.from('contacts').insert({
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            company: formData.company.trim(),
            phone: formData.phone.trim() || null,
            project_type: formData.projectType || null,
            message: formData.message.trim(),
            read: false
          });
        } catch (dbErr) {
          // Don't block the user on DB errors; we still want the email to go through
          console.error('Supabase insert failed (non-blocking):', dbErr);
        }
      }

      // Send email via Resend through the serverless API route (/api/contact).
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          company: formData.company.trim(),
          phone: formData.phone.trim(),
          projectType: formData.projectType,
          message: formData.message.trim(),
          timestamp: new Date().toISOString()
        })
      });

      let data: { success?: boolean; error?: string } | null = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok || !data?.success) {
        const serverMsg = data?.error;
        console.error('Contact API error:', response.status, serverMsg);
        setSubmitError(serverMsg || 'Er is iets misgegaan bij het versturen van jouw bericht. Probeer het later opnieuw.');
        setFormStatus('error');
        return;
      }

      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        projectType: '',
        message: ''
      });
    } catch (err) {
      console.error('Contact form submit failed:', err);
      setSubmitError('Kan geen verbinding maken met de server. Controleer jouw internetverbinding en probeer het opnieuw.');
      setFormStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => {
        const next = {
          ...prev
        };
        delete next[name];
        return next;
      });
    }
    if (formStatus === 'error') {
      setFormStatus('idle');
      setSubmitError('');
    }
  };
  return <section id="contact-section" className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <div>
            <span className="text-[#6BA539] text-sm font-semibold uppercase tracking-[0.2em]">
              Contact
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6 tracking-tight">
              Neem contact met ons op
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed mb-10">Wil je meer weten? Vul het formulier in en we nemen binnen 1 werkdag  contact met je op.</p>

            <div className="space-y-6">
              {[{
              title: 'Kennismakings- of adviesgesprek',
              desc: 'Vrijblijvend gesprek over de mogelijkheden voor jouw project.'
            }, {
              title: 'Platform demo',
              desc: 'Live demonstratie van het NursiTree monitoringplatform.'
            }, {
              title: 'Technische documentatie',
              desc: 'Ontvang onze volledige technische specificaties.'
            }, {
              title: 'Bezoek demolocatie:',
              desc: 'Laat je onder het genot van een Flakkeese bolus inspireren en ervaar het in de praktijk.'
            }, {
              title: 'Bakfietstocht:',
              desc: 'Ga in sportieve modus met ons mee en bezoek verschillende projectlocaties.'

            }].map(item => <div key={item.title} className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#6BA539] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>)}
            </div>
          </div>

          {/* Right: Form */}
          <div>
            {formStatus === 'success' ? <div className="bg-[#f0f7eb] rounded-2xl p-12 text-center border border-[#6BA539]/20">
                <div className="w-16 h-16 rounded-full bg-[#6BA539] flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Bedankt voor je bericht!
                </h3>
                <p className="text-gray-600 mb-6">
                  We nemen binnen 1 werkdag contact met je op.
                </p>
                <button onClick={() => setFormStatus('idle')} className="text-[#6BA539] font-semibold text-sm hover:underline">
                  Nog een bericht versturen
                </button>
              </div> : <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                {formStatus === 'error' && submitError && <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-800">Verzenden mislukt</p>
                      <p className="text-xs text-red-600 mt-0.5">{submitError}</p>
                    </div>
                  </div>}

                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Naam *
                    </label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} disabled={formStatus === 'loading'} className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#6BA539]/20 focus:border-[#6BA539] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${formErrors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'}`} placeholder="Jouw naam" />
                    {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      E-mail *
                    </label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} disabled={formStatus === 'loading'} className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#6BA539]/20 focus:border-[#6BA539] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${formErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'}`} placeholder="jij@email.nl" />
                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Bedrijf *
                    </label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange} disabled={formStatus === 'loading'} className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#6BA539]/20 focus:border-[#6BA539] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${formErrors.company ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'}`} placeholder="Bedrijfsnaam" />
                    {formErrors.company && <p className="text-red-500 text-xs mt-1">{formErrors.company}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Telefoon
                    </label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} disabled={formStatus === 'loading'} className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#6BA539]/20 focus:border-[#6BA539] transition-colors disabled:opacity-50 disabled:cursor-not-allowed" placeholder="+31 6 1234 5678" />
                  </div>
                </div>

                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Type project
                  </label>
                  <select name="projectType" value={formData.projectType} onChange={handleChange} disabled={formStatus === 'loading'} className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#6BA539]/20 focus:border-[#6BA539] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    <option value="">Selecteer een projecttype</option>
                    <option value="woningbouw">Woningbouw</option>
                    <option value="infrastructuur">Infrastructuur</option>
                    <option value="openbare-ruimte">Openbare ruimte</option>
                    <option value="commercieel">Commercieel</option>
                    <option value="herinrichting">Herinrichting</option>
                    <option value="anders">Anders</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Bericht *
                  </label>
                  <textarea name="message" value={formData.message} onChange={handleChange} disabled={formStatus === 'loading'} rows={4} className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#6BA539]/20 focus:border-[#6BA539] transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed ${formErrors.message ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'}`} placeholder="Vertel ons over jouw project..." />
                  {formErrors.message && <p className="text-red-500 text-xs mt-1">{formErrors.message}</p>}
                </div>

                <button type="submit" disabled={formStatus === 'loading'} className="w-full px-8 py-4 bg-[#6BA539] text-white text-base font-semibold rounded-xl hover:bg-[#5A9030] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                  {formStatus === 'loading' ? <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Bezig met versturen...
                    </> : <>
                      <Send className="w-5 h-5" />
                      Verstuur bericht
                    </>}
                </button>
              </form>}
          </div>
        </div>
      </div>
    </section>;
};
export default ContactSection;