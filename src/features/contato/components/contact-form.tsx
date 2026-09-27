"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/field";

// Número institucional com DDI e DDD, apenas dígitos. Ex.: 5588999999999
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

const initialForm = { nome: "", email: "", telefone: "", assunto: "", mensagem: "" };

export function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [notice, setNotice] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!WHATSAPP_NUMBER) {
      setNotice("O canal de WhatsApp ainda não foi configurado. Tente novamente em breve.");
      return;
    }

    const text = [
      "Olá, A∴R∴L∴S∴ Luz da Sabedoria de Milagres Nº 18.",
      "",
      `Nome: ${form.nome}`,
      `E-mail: ${form.email}`,
      form.telefone && `Telefone: ${form.telefone}`,
      `Assunto: ${form.assunto}`,
      "",
      form.mensagem,
    ]
      .filter((line) => line !== "")
      .join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Nome" htmlFor="nome">
          <Input id="nome" name="nome" required autoComplete="name" value={form.nome} onChange={handleChange} />
        </Field>
        <Field label="E-mail" htmlFor="email">
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
          />
        </Field>
        <Field label="Telefone" htmlFor="telefone" hint="Opcional">
          <Input
            id="telefone"
            name="telefone"
            type="tel"
            autoComplete="tel"
            placeholder="(88) 90000-0000"
            value={form.telefone}
            onChange={handleChange}
          />
        </Field>
        <Field label="Assunto" htmlFor="assunto">
          <Input id="assunto" name="assunto" required value={form.assunto} onChange={handleChange} />
        </Field>
      </div>

      <Field label="Mensagem" htmlFor="mensagem">
        <Textarea id="mensagem" name="mensagem" required rows={6} value={form.mensagem} onChange={handleChange} />
      </Field>

      {notice && (
        <p role="status" className="rounded-sm border border-warning/30 bg-warning/5 px-4 py-3 text-sm text-warning">
          {notice}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">O envio abre uma conversa no WhatsApp com a mensagem pronta.</p>
        <Button type="submit" size="lg">
          <MessageCircle aria-hidden />
          Enviar pelo WhatsApp
        </Button>
      </div>
    </form>
  );
}
