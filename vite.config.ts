import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

/**
 * Dev-only plugin that mounts the Vercel serverless function at /api/contact
 * during `vite dev`, so the contact form can be tested locally without running
 * `vercel dev`. In production Vercel serves /api/contact.js natively and this
 * plugin is not involved — it has no effect on the build output.
 */
function vercelApiDevPlugin(env: Record<string, string>): Plugin {
  return {
    name: "vercel-api-dev",
    apply: "serve",
    configureServer(server) {
      // Make non-VITE_ env vars (e.g. RESEND_API_KEY) available to the handler.
      for (const [key, value] of Object.entries(env)) {
        if (process.env[key] === undefined) process.env[key] = value;
      }

      server.middlewares.use("/api/contact", async (req, res) => {
        const sendJson = (code: number, payload: unknown) => {
          res.statusCode = code;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(payload));
        };

        // Minimal Express-like response shim matching the handler's usage.
        const resShim = {
          _code: 200,
          status(code: number) {
            this._code = code;
            return this;
          },
          json(payload: unknown) {
            sendJson(this._code, payload);
            return this;
          },
          setHeader: (k: string, v: string) => res.setHeader(k, v),
        };

        let raw = "";
        for await (const chunk of req) raw += chunk;
        let body: unknown = {};
        try {
          body = raw ? JSON.parse(raw) : {};
        } catch {
          body = {};
        }

        try {
          const mod = await server.ssrLoadModule("/api/contact.js");
          await mod.default(
            { method: req.method, headers: req.headers, body },
            resShim,
          );
        } catch (err) {
          console.error("[vercel-api-dev] handler error:", err);
          sendJson(500, {
            error:
              "Er is iets misgegaan bij het versturen van jouw bericht. Probeer het later opnieuw.",
          });
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react(), vercelApiDevPlugin(env)].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
