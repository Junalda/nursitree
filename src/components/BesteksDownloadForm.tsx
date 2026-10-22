import React, { useState } from 'react';
import { Download, Loader2, CheckCircle2 } from 'lucide-react';

/**
 * Lead-capture download for the besteksposten. The visitor enters name + email;
 * on submit we POST to /api/besteksposten, which e-mails the documents (PDF +
 * RAW/RSX) to them. For convenience the PDF also downloads immediately.
 *
 * Designed for the green download segment on the Producten page (white text).
 */
const PDF_PATH = '/downloads/besteksposten-nursitree-urban-tree-pit.pdf';

const BesteksDownloadForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const triggerDownload = () => {
    const a = document.createElement('a');
    a.href = PDF_PATH;
    a.download = 'Besteksposten-NursiTree-Urban-Tree-Pit.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setStatus('error');
      setErrorMsg('Vul je naam en e-mailadres in.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setErrorMsg('Vul een geldig e-mailadres in.');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');
    try {
      const res = await fetch('/api/besteksposten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), timestamp: new Date().toISOString() }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Er is iets misgegaan. Probeer het later opnieuw.');
      }
      setStatus('success');
      triggerDownload();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Er is iets misgegaan. Probeer het later opnieuw.');
    }
  };

  if (status === 'success') {
    return (
      <div className="mx-auto max-w-xl rounded-2xl bg-white/15 border border-white/25 backdrop-blur-sm px-6 py-8 text-center">
        <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-white" aria-hidden="true" />
        <p className="text-lg font-semibold text-white">De besteksposten zijn onderweg!</p>
        <p className="mt-2 text-white/85">
          We hebben de PDF en het RAW-bestand (RSX) naar <span className="font-semibold">{email}</span> gestuurd.
          De download start ook direct — controleer eventueel je spamfolder.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl text-left" noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="bestek-naam">Naam</label>
        <input
          id="bestek-naam"
          type="text"
          autoComplete="name"
          placeholder="Je naam"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={status === 'submitting'}
          className="w-full rounded-xl border border-white/30 bg-white px-4 py-3.5 text-[15px] text-gray-900 placeholder-gray-400 shadow-sm focus:border-white focus:outline-none focus:ring-2 focus:ring-white/60 disabled:opacity-70"
          required
        />
        <label className="sr-only" htmlFor="bestek-email">E-mailadres</label>
        <input
          id="bestek-email"
          type="email"
          autoComplete="email"
          placeholder="E-mailadres"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'submitting'}
          className="w-full rounded-xl border border-white/30 bg-white px-4 py-3.5 text-[15px] text-gray-900 placeholder-gray-400 shadow-sm focus:border-white focus:outline-none focus:ring-2 focus:ring-white/60 disabled:opacity-70"
          required
        />
      </div>

      <div className="mt-4 flex flex-col items-center gap-3">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-[#6BA539] shadow-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-80 sm:w-auto"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              Bezig met versturen…
            </>
          ) : (
            <>
              <Download className="h-5 w-5" aria-hidden="true" />
              Ontvang de besteksposten
            </>
          )}
        </button>
        {status === 'error' && (
          <p className="text-sm font-medium text-white" role="alert">{errorMsg}</p>
        )}
        <p className="text-xs text-white/70">
          We mailen je de PDF en het RAW-bestand (RSX). Je gegevens gebruiken we alleen hiervoor.
        </p>
      </div>
    </form>
  );
};

export default BesteksDownloadForm;
