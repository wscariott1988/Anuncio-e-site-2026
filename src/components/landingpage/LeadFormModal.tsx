"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import {
  trackFormStart,
  trackFormStep,
  trackFormSubmitAttempt,
  trackFormError,
  trackGenerateLead,
  trackWhatsappAfterLead,
  trackWhatsappFormError,
} from "@/lib/tracking";
import { getWhatsappAfterLeadUrl, getWhatsappErrorUrl } from "@/lib/whatsapp";
import { SITUACAO_OPCOES } from "@/lib/constants";
import type { CtaLocation, FormData, FormState, FormStepName, SituacaoAnuncios, PossuiSite } from "@/types";

interface LeadFormModalProps {
  isOpen: boolean;
  ctaLocation: CtaLocation | null;
  onClose: () => void;
}

const INITIAL_DATA: FormData = {
  nome: "",
  whatsapp: "",
  negocioServico: "",
  situacaoAnuncios: "",
  possuiSite: "",
  urlAtual: "",
  consentimento: false,
};

const STEP_NAMES: FormStepName[] = ["contact", "project", "confirmation"];

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length === 11;
}

function isValidEmailishUrl(value: string): boolean {
  if (!value) return true;
  try {
    new URL(value);
    return true;
  } catch {
    return /^https?:\/\/.+\..+/.test(value);
  }
}

export function LeadFormModal({ isOpen, ctaLocation, onClose }: LeadFormModalProps) {
  const [state, setState] = useState<FormState>("idle");
  const [data, setData] = useState<FormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [leadId, setLeadId] = useState<string | null>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state === "step_1" && firstFieldRef.current) {
      firstFieldRef.current.focus();
    }
  }, [state]);

  const handleClose = useCallback(() => {
    setState("idle");
    setErrors({});
    setFailedAttempts(0);
    setLeadId(null);
    onClose();
  }, [onClose]);

  const handleStart = useCallback(() => {
    if (!ctaLocation) return;
    trackFormStart(ctaLocation);
    setState("step_1");
  }, [ctaLocation]);

  const currentStepIndex = state === "step_1" ? 0 : state === "step_2" ? 1 : state === "step_3" ? 2 : -1;

  const updateField = useCallback(<K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const validateStep = useCallback(
    (step: number): boolean => {
      const newErrors: Record<string, string> = {};

      if (step === 0) {
        if (!data.nome.trim()) newErrors.nome = "Informe seu nome para continuar.";
        if (!isValidPhone(data.whatsapp)) newErrors.whatsapp = "Informe um número de WhatsApp válido com DDD.";
      } else if (step === 1) {
        if (!data.negocioServico.trim()) newErrors.negocioServico = "Informe qual é o seu negócio ou serviço.";
        if (!data.situacaoAnuncios) newErrors.situacaoAnuncios = "Selecione uma opção para continuar.";
        if (!data.possuiSite) newErrors.possuiSite = "Selecione uma opção para continuar.";
        if (data.possuiSite === "Sim" && data.urlAtual && !isValidEmailishUrl(data.urlAtual)) {
          newErrors.urlAtual = "Informe um endereço válido.";
        }
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [data]
  );

  const goNext = useCallback(() => {
    if (state === "step_1" && validateStep(0)) {
      trackFormStep(1, "contact", ctaLocation!);
      setState("step_2");
    } else if (state === "step_2" && validateStep(1)) {
      trackFormStep(2, "project", ctaLocation!);
      setState("step_3");
    }
  }, [state, validateStep, ctaLocation]);

  const goBack = useCallback(() => {
    if (state === "step_2") setState("step_1");
    else if (state === "step_3") setState("step_2");
  }, [state]);

  const handleSubmit = useCallback(async () => {
    if (!ctaLocation) return;
    if (!data.consentimento) {
      setErrors({ consentimento: "Confirme que leu a Política de Privacidade para enviar." });
      return;
    }

    trackFormSubmitAttempt(ctaLocation);
    setState("submitting");

    const params = new URLSearchParams();
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid", "fbclid"]) {
        const val = url.searchParams.get(key);
        if (val) params.set(key, val);
      }
      params.set("entry_path", window.location.pathname);
      const referrer = document.referrer;
      if (referrer) {
        try {
          params.set("referrer_hostname", new URL(referrer).hostname);
        } catch {
          // ignore
        }
      }
    }

    const payload = {
      nome: data.nome.trim(),
      whatsapp: data.whatsapp,
      negocioServico: data.negocioServico.trim(),
      situacaoAnuncios: data.situacaoAnuncios,
      possuiSite: data.possuiSite,
      urlAtual: data.urlAtual.trim(),
      consentimento: data.consentimento,
      leadSource: "direct",
      sourceCta: ctaLocation,
      utmSource: params.get("utm_source") || "",
      utmMedium: params.get("utm_medium") || "",
      utmCampaign: params.get("utm_campaign") || "",
      utmTerm: params.get("utm_term") || "",
      utmContent: params.get("utm_content") || "",
      gclid: params.get("gclid") || "",
      gbraid: params.get("gbraid") || "",
      wbraid: params.get("wbraid") || "",
      fbclid: params.get("fbclid") || "",
      entryPath: params.get("entry_path") || "/landingpage",
      referrerHostname: params.get("referrer_hostname") || "",
      honeypot: honeypotRef.current?.value || "",
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.ok && (result.status === "created" || result.status === "duplicate")) {
        setLeadId(result.lead_id);
        trackGenerateLead(result.lead_id, result.status, ctaLocation);
        setState("success");
        return;
      }

      if (result.code === "PENDING_INTEGRATION") {
        setState("pending_integration");
        return;
      }

      setFailedAttempts((prev) => prev + 1);
      setState("error_server");
      trackFormError("server_error", STEP_NAMES[currentStepIndex] || "unknown", failedAttempts + 1);
    } catch {
      setFailedAttempts((prev) => prev + 1);
      setState("error_server");
      trackFormError("network_error", STEP_NAMES[currentStepIndex] || "unknown", failedAttempts + 1);
    }
  }, [ctaLocation, data, currentStepIndex, failedAttempts]);

  const openWhatsappAfterLead = useCallback(() => {
    const url = getWhatsappAfterLeadUrl();
    if (url && leadId && ctaLocation) {
      trackWhatsappAfterLead(leadId, ctaLocation);
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }, [leadId, ctaLocation]);

  const openWhatsappError = useCallback(() => {
    const url = getWhatsappErrorUrl();
    if (url) {
      trackWhatsappFormError("server_error");
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Formulário de contato">
      <div className="bg-[var(--surface)] min-h-[60dvh] md:min-h-[80vh] flex flex-col">
        {/* Progress bar */}
        {(state === "step_1" || state === "step_2" || state === "step_3") && (
          <div className="px-5 pt-3 pb-1 md:px-6 md:pt-4 md:pb-2 border-b border-[var(--border)]">
            <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
              {["Contato", "Sobre o projeto", "Confirmar"].map((label, i) => (
                <div key={label} className="flex items-center gap-2">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      i <= currentStepIndex
                        ? "bg-[var(--brand)] text-white"
                        : "bg-[var(--border)] text-[var(--text-secondary)]"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className={i <= currentStepIndex ? "text-[var(--text-primary)] font-medium" : ""}>{label}</span>
                  {i < 2 && <div className="w-6 h-px bg-[var(--border)]" />}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex-1 flex items-start md:items-center justify-center px-5 py-3 md:px-8 md:py-6">
          <div className="w-full max-w-[480px] space-y-6">
            {/* Honeypot — hidden from humans, visible to screen readers and bots */}
            <div className="absolute -left-[9999px] opacity-0 h-0 overflow-hidden" aria-hidden="true">
              <label htmlFor="form-hp" className="sr-only">Não preencha este campo</label>
              <input
                ref={honeypotRef}
                id="form-hp"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* IDLE / INTRO */}
            {state === "idle" && (
              <div className="space-y-6 text-center">
                <span className="text-xs font-medium text-[var(--brand)] uppercase tracking-wider">Conte sobre seu projeto</span>
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] leading-tight">
                  Antes de continuar, preciso entender sua necessidade
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Responda algumas perguntas rápidas para eu entender seu projeto e confirmar se ele se encaixa na proposta de R$ 997.
                </p>
                <p className="text-sm text-[var(--text-secondary)]">Leva cerca de 40 segundos.</p>
                <button
                  onClick={handleStart}
                  className="w-full h-12 px-6 text-base font-medium bg-[var(--brand)] text-white rounded-xl hover:bg-[var(--brand-hover)] transition-colors"
                >
                  Começar
                </button>
              </div>
            )}

            {/* STEP 1: Contact */}
            {state === "step_1" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="form-nome" className="block text-sm font-medium text-[var(--text-primary)]">
                    Como posso chamar você?
                  </label>
                  <input
                    ref={firstFieldRef}
                    id="form-nome"
                    type="text"
                    value={data.nome}
                    onChange={(e) => updateField("nome", e.target.value)}
                    placeholder="Seu nome"
                    className={`w-full h-12 px-4 rounded-xl border text-base text-[var(--text-primary)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--brand)] ${
                      errors.nome ? "border-red-500" : "border-[var(--border)]"
                    }`}
                    autoComplete="name"
                  />
                  {errors.nome && <p className="text-sm text-red-500">{errors.nome}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="form-whatsapp" className="block text-sm font-medium text-[var(--text-primary)]">
                    Qual WhatsApp devo usar para responder?
                  </label>
                  <input
                    id="form-whatsapp"
                    type="tel"
                    value={data.whatsapp}
                    onChange={(e) => updateField("whatsapp", formatPhone(e.target.value))}
                    placeholder="(00) 00000-0000"
                    className={`w-full h-12 px-4 rounded-xl border text-base text-[var(--text-primary)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--brand)] ${
                      errors.whatsapp ? "border-red-500" : "border-[var(--border)]"
                    }`}
                    style={{ fontSize: "16px" }}
                    autoComplete="tel"
                  />
                  {errors.whatsapp && <p className="text-sm text-red-500">{errors.whatsapp}</p>}
                  <p className="text-xs text-[var(--text-secondary)]">
                    Usarei esse número apenas para analisar sua solicitação e entrar em contato sobre o projeto.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={goNext}
                    className="flex-1 h-12 px-6 text-base font-medium bg-[var(--brand)] text-white rounded-xl hover:bg-[var(--brand-hover)] transition-colors"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Project */}
            {state === "step_2" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="form-negocio" className="block text-sm font-medium text-[var(--text-primary)]">
                    Qual é o seu negócio ou serviço?
                  </label>
                  <input
                    id="form-negocio"
                    type="text"
                    value={data.negocioServico}
                    onChange={(e) => updateField("negocioServico", e.target.value)}
                    placeholder="Ex.: clínica odontológica, advocacia ou móveis planejados"
                    className={`w-full h-12 px-4 rounded-xl border text-base text-[var(--text-primary)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--brand)] ${
                      errors.negocioServico ? "border-red-500" : "border-[var(--border)]"
                    }`}
                  />
                  {errors.negocioServico && <p className="text-sm text-red-500">{errors.negocioServico}</p>}
                  <p className="text-xs text-[var(--text-secondary)]">Descreva em poucas palavras o que sua empresa oferece.</p>
                </div>

                <fieldset>
                  <legend className="block text-sm font-medium text-[var(--text-primary)] mb-3">
                    Qual é a situação atual dos seus anúncios?
                  </legend>
                  <div className="space-y-2">
                    {SITUACAO_OPCOES.map((opt) => (
                      <label
                        key={opt}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                          data.situacaoAnuncios === opt
                            ? "border-[var(--brand)] bg-[var(--brand-soft)]"
                            : "border-[var(--border)] hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="situacao"
                          value={opt}
                          checked={data.situacaoAnuncios === opt}
                          onChange={() => updateField("situacaoAnuncios", opt as SituacaoAnuncios)}
                          className="w-4 h-4 text-[var(--brand)]"
                        />
                        <span className="text-sm text-[var(--text-primary)]">{opt}</span>
                      </label>
                    ))}
                  </div>
                  {errors.situacaoAnuncios && <p className="text-sm text-red-500 mt-2">{errors.situacaoAnuncios}</p>}
                </fieldset>

                <fieldset>
                  <legend className="block text-sm font-medium text-[var(--text-primary)] mb-3">
                    Você já possui site ou Landing Page?
                  </legend>
                  <div className="flex gap-3">
                    {(["Sim", "Não"] as const).map((opt) => (
                      <label
                        key={opt}
                        className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-colors ${
                          data.possuiSite === opt
                            ? "border-[var(--brand)] bg-[var(--brand-soft)]"
                            : "border-[var(--border)] hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="possuiSite"
                          value={opt}
                          checked={data.possuiSite === opt}
                          onChange={() => updateField("possuiSite", opt as PossuiSite)}
                          className="w-4 h-4 text-[var(--brand)]"
                        />
                        <span className="text-sm text-[var(--text-primary)]">{opt}</span>
                      </label>
                    ))}
                  </div>
                  {errors.possuiSite && <p className="text-sm text-red-500 mt-2">{errors.possuiSite}</p>}
                </fieldset>

                {data.possuiSite === "Sim" && (
                  <div className="space-y-2">
                    <label htmlFor="form-url" className="block text-sm font-medium text-[var(--text-primary)]">
                      Qual é o endereço da página atual?
                    </label>
                    <input
                      id="form-url"
                      type="url"
                      value={data.urlAtual}
                      onChange={(e) => updateField("urlAtual", e.target.value)}
                      placeholder="https://www.seusite.com.br"
                      className={`w-full h-12 px-4 rounded-xl border text-base text-[var(--text-primary)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--brand)] ${
                        errors.urlAtual ? "border-red-500" : "border-[var(--border)]"
                      }`}
                    />
                    {errors.urlAtual && <p className="text-sm text-red-500">{errors.urlAtual}</p>}
                    <p className="text-xs text-[var(--text-secondary)]">
                      Esse campo é opcional. Se preferir, você poderá continuar sem informar o endereço.
                    </p>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={goBack}
                    className="h-12 px-6 text-base font-medium border border-[var(--border)] text-[var(--text-primary)] rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={goNext}
                    className="flex-1 h-12 px-6 text-base font-medium bg-[var(--brand)] text-white rounded-xl hover:bg-[var(--brand-hover)] transition-colors"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Review & Submit */}
            {state === "step_3" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-[var(--text-primary)]">Confira suas informações</h2>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Revise os dados antes de enviar. Você pode voltar e corrigir qualquer resposta.
                  </p>
                </div>

                <div className="space-y-3 bg-[var(--background)] rounded-2xl border border-[var(--border)] p-5">
                  {[
                    { label: "Nome", value: data.nome, goTo: () => setState("step_1") },
                    { label: "WhatsApp", value: data.whatsapp, goTo: () => setState("step_1") },
                    { label: "Negócio ou serviço", value: data.negocioServico, goTo: () => setState("step_2") },
                    { label: "Situação dos anúncios", value: data.situacaoAnuncios, goTo: () => setState("step_2") },
                    { label: "Site ou Landing Page atual", value: data.possuiSite, goTo: () => setState("step_2") },
                    ...(data.possuiSite === "Sim" && data.urlAtual
                      ? [{ label: "URL atual", value: data.urlAtual, goTo: () => setState("step_2") }]
                      : []),
                  ].map((item) => (
                    <div key={item.label} className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs text-[var(--text-secondary)]">{item.label}</p>
                        <p className="text-sm text-[var(--text-primary)] font-medium">{item.value}</p>
                      </div>
                      <button onClick={item.goTo} className="text-xs text-[var(--brand)] hover:underline flex-shrink-0">
                        Editar
                      </button>
                    </div>
                  ))}
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.consentimento}
                    onChange={(e) => updateField("consentimento", e.target.checked)}
                    className="w-4 h-4 mt-0.5 text-[var(--brand)] rounded"
                  />
                  <span className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    Li e concordo com a{" "}
                    <a href="/politica-de-privacidade" className="text-[var(--brand)] hover:underline" target="_blank" rel="noopener noreferrer">
                      Política de Privacidade
                    </a>{" "}
                    e autorizo o uso destas informações para análise e contato sobre minha solicitação.
                  </span>
                </label>
                {errors.consentimento && <p className="text-sm text-red-500">{errors.consentimento}</p>}

                <div className="flex gap-3">
                  <button
                    onClick={goBack}
                    className="h-12 px-6 text-base font-medium border border-[var(--border)] text-[var(--text-primary)] rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Voltar
                  </button>
                  <button
                    ref={submitButtonRef}
                    onClick={handleSubmit}
                    disabled={!data.consentimento}
                    className="flex-1 h-12 px-6 text-base font-medium bg-[var(--brand)] text-white rounded-xl hover:bg-[var(--brand-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Enviar informações
                  </button>
                </div>
              </div>
            )}

            {/* SUBMITTING */}
            {state === "submitting" && (
              <div className="space-y-4 text-center" role="status">
                <p className="text-base text-[var(--text-primary)] font-medium">Enviando informações…</p>
                <p className="text-sm text-[var(--text-secondary)]">Suas informações estão sendo enviadas. Aguarde.</p>
              </div>
            )}

            {/* SUCCESS */}
            {state === "success" && (
              <div className="space-y-6 text-center">
                <div className="space-y-2">
                  <span className="text-xs font-medium text-green-600 uppercase tracking-wider">Informações enviadas</span>
                  <h2 className="text-xl font-bold text-[var(--text-primary)]">Recebi suas informações!</h2>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    Obrigado por responder. Vou analisar e entrar em contato pelo WhatsApp em breve.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={openWhatsappAfterLead}
                    className="h-12 px-6 text-base font-medium bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                  >
                    Continuar no WhatsApp
                  </button>
                  <button
                    onClick={handleClose}
                    className="h-12 px-6 text-base font-medium border border-[var(--border)] text-[var(--text-primary)] rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Voltar para a página
                  </button>
                </div>
              </div>
            )}

            {/* ERROR: SERVER */}
            {state === "error_server" && (
              <div className="space-y-6 text-center">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-[var(--text-primary)]">Não foi possível enviar agora</h2>
                  <p className="text-sm text-[var(--text-secondary)]">Suas respostas foram preservadas. Tente enviar novamente.</p>
                </div>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleSubmit}
                    className="h-12 px-6 text-base font-medium bg-[var(--brand)] text-white rounded-xl hover:bg-[var(--brand-hover)] transition-colors"
                  >
                    Tentar novamente
                  </button>
                  <button
                    onClick={() => setState("step_3")}
                    className="h-12 px-6 text-base font-medium border border-[var(--border)] text-[var(--text-primary)] rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Voltar e revisar
                  </button>
                </div>
                {failedAttempts >= 1 && (
                  <div className="space-y-3 pt-4 border-t border-[var(--border)]">
                    <p className="text-sm text-[var(--text-secondary)]">
                      Se o problema continuar, você pode me avisar pelo WhatsApp. Suas informações permanecerão preenchidas nesta página.
                    </p>
                    <button
                      onClick={openWhatsappError}
                      className="h-12 px-6 text-base font-medium border border-green-500 text-green-700 rounded-xl hover:bg-green-50 transition-colors"
                    >
                      Avisar pelo WhatsApp
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* PENDING INTEGRATION (Phase 1) */}
            {state === "pending_integration" && (
              <div className="space-y-6 text-center">
                <div className="space-y-2">
                  <span className="text-xs font-medium text-amber-600 uppercase tracking-wider">Integração pendente</span>
                  <h2 className="text-xl font-bold text-[var(--text-primary)]">Servidor ainda não configurado</h2>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    O endpoint de recebimento ainda não foi implementado. Suas respostas foram preservadas nesta tela.
                  </p>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    Quando o servidor estiver ativo, o envio funcionará normalmente.
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="h-12 px-6 text-base font-medium border border-[var(--border)] text-[var(--text-primary)] rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Voltar para a página
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
