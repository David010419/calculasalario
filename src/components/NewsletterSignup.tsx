"use client";

import { useState, type FormEvent } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setStatus("sent");
    setEmail("");
  }

  return (
    <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-accent/5 p-6 text-center">
      <h3 className="font-heading text-lg font-semibold text-text">Recibe tendencias salariales</h3>
      <p className="mx-auto mt-1 max-w-md text-sm text-text-muted">
        Envíos mensuales con datos actualizados del mercado laboral español. Sin spam.
      </p>
      {status === "sent" ? (
        <p className="mt-4 font-medium text-accent">¡Gracias! Te avisaremos con las próximas actualizaciones.</p>
      ) : (
        <form onSubmit={handleSubmit} className="mx-auto mt-4 flex max-w-sm flex-col gap-2 sm:flex-row">
          <input
            type="email"
            required
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <button
            type="submit"
            className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark cursor-pointer"
          >
            Apuntarme
          </button>
        </form>
      )}
    </div>
  );
}
