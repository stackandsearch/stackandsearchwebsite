"use client";

import Link from "next/link";
import { useActionState, useEffect, useId, useRef, type InputHTMLAttributes } from "react";
import { ServiceIcon } from "@/components/ui/duotone-icons";
import { footerGroups } from "@/content/footer";
import { submitLead } from "@/lib/leads/actions";
import { INITIAL_LEAD_STATE, LEAD_SERVICES, LEAD_SUBMITTED_EVENT, LEAD_SUBMITTED_KEY } from "@/lib/leads/schema";
import styles from "./LeadForm.module.scss";

const privacyHref =
  footerGroups.flatMap((group) => group.links).find((link) => /privacy/i.test(link.label))?.href ??
  "/privacy-policy/";

type TextName = "name" | "email" | "phone" | "website";

interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "id" | "defaultValue" | "className"> {
  formId: string;
  name: TextName;
  label: string;
  value: string;
  error?: string;
  optional?: boolean;
}

function TextField({ formId, name, label, value, error, optional = false, ...input }: TextFieldProps) {
  const inputId = `${formId}-${name}`;
  const errorId = `${inputId}-error`;
  return (
    <div className={styles.field}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
        {optional ? <span className={styles.optional}> (optional)</span> : null}
      </label>
      <input
        {...input}
        id={inputId}
        name={name}
        defaultValue={value}
        className={styles.input}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
      />
      {error ? (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

interface LeadFormProps {
  source: "footer" | "popup" | "contact";
  compact?: boolean;
}

// One lead form for the whole site (footer card and popup). Works without
// JavaScript (server action), keeps typed values after an error, moves
// focus to the first problem, and remembers a submission on this device.
export function LeadForm({ source, compact = false }: LeadFormProps) {
  const [state, formAction, pending] = useActionState(submitLead, INITIAL_LEAD_STATE);
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      try {
        window.localStorage.setItem(LEAD_SUBMITTED_KEY, "1");
      } catch {
        // Storage unavailable.
      }
      window.dispatchEvent(new Event(LEAD_SUBMITTED_EVENT));
    } else if (state.status === "error") {
      formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <div className={styles.success} role="status" data-lead-form={source}>
        <span className={styles.successIcon} aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className={styles.successTitle}>Thanks, your request is in.</p>
        <p className={styles.successText}>{state.message}</p>
      </div>
    );
  }

  const { values, errors } = state;
  const id = (name: string) => `${formId}-${name}`;

  return (
    <form
      ref={formRef}
      action={formAction}
      noValidate
      className={styles.form}
      data-lead-form={source}
      data-compact={compact ? "" : undefined}
    >
      <input type="hidden" name="source" value={source} />
      <div className={styles.hp} aria-hidden="true">
        <label htmlFor={id("fax")}>Leave this field empty</label>
        <input id={id("fax")} type="text" name="fax" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" ? (
        <p className={styles.alert} role="alert">
          {state.message}
        </p>
      ) : null}

      <fieldset className={styles.services}>
        <legend className={styles.legend}>What do you need help with?</legend>
        <div className={styles.chips}>
          {LEAD_SERVICES.map((service) => (
            <label key={service.label} className={styles.chip}>
              <input
                type="checkbox"
                name="services"
                value={service.label}
                defaultChecked={values.services.includes(service.label)}
                className={styles.chipInput}
              />
              <span className={styles.chipIcon} aria-hidden="true">
                <ServiceIcon href={service.href} />
              </span>
              {service.label}
              <svg className={styles.chipTick} viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </label>
          ))}
        </div>
      </fieldset>

      <div className={styles.grid}>
        <TextField formId={formId} name="name" label="Your name" value={values.name} error={errors.name} autoComplete="name" required />
        <TextField
          formId={formId}
          name="email"
          label="Email"
          type="email"
          inputMode="email"
          value={values.email}
          error={errors.email}
          autoComplete="email"
          required
        />
        <TextField
          formId={formId}
          name="phone"
          label="Phone or WhatsApp"
          type="tel"
          inputMode="tel"
          value={values.phone}
          error={errors.phone}
          autoComplete="tel"
          optional
        />
        <TextField
          formId={formId}
          name="website"
          label="Current website"
          inputMode="url"
          placeholder="yourbusiness.com"
          value={values.website}
          error={errors.website}
          autoComplete="url"
          optional
        />
      </div>

      <div className={styles.field}>
        <label htmlFor={id("message")} className={styles.label}>
          Anything else we should know? <span className={styles.optional}>(optional)</span>
        </label>
        <textarea
          id={id("message")}
          name="message"
          rows={compact ? 2 : 4}
          maxLength={1500}
          defaultValue={values.message}
          className={styles.input}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? `${id("message")}-error` : undefined}
        />
        {errors.message ? (
          <p id={`${id("message")}-error`} className={styles.error}>
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className={styles.field}>
        <div className={styles.consent}>
          <input
            id={id("consent")}
            type="checkbox"
            name="consent"
            value="yes"
            defaultChecked={values.consent}
            className={styles.checkbox}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `${id("consent")}-error` : undefined}
          />
          <label htmlFor={id("consent")}>
            I agree to be contacted about this request. See our <Link href={privacyHref}>privacy policy</Link>.
          </label>
        </div>
        {errors.consent ? (
          <p id={`${id("consent")}-error`} className={styles.error}>
            {errors.consent}
          </p>
        ) : null}
      </div>

      <button type="submit" className={styles.submit} disabled={pending}>
        {pending ? <span className={styles.spinner} aria-hidden="true" /> : null}
        {pending ? "Sending…" : "Get my free audit"}
      </button>
    </form>
  );
}
