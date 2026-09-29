"use client";

import { ArrowUpRightIcon, ChevronDownIcon } from "@/components/icons";
import { FormEvent, useRef, useState } from "react";

type Field = "name" | "email" | "type" | "location" | "scope" | "message";
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;

const projectTypes = ["Residential", "Hospitality", "Interiors", "Commercial"];

export function ContactForm({ initialType = "", initialProject = "" }: { initialType?: string; initialProject?: string }) {
  const [values, setValues] = useState<Values>({ name: "", email: "", type: projectTypes.includes(initialType) ? initialType : "", location: "", scope: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const refs = useRef<Partial<Record<Field, HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null>>>({});

  function update(field: Field, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitted(false);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.email.trim()) next.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = "Enter a valid email address.";
    if (!values.type) next.type = "Choose a project type.";
    if (!values.message.trim()) next.message = "Tell us a little about your project.";
    setErrors(next);
    const first = (Object.keys(next) as Field[])[0];
    if (first) {
      refs.current[first]?.focus();
      return;
    }
    setSubmitted(true);
  }

  function fieldId(field: Field) { return `enquiry-${field}`; }
  function errorId(field: Field) { return `${fieldId(field)}-error`; }
  function fieldProps(field: Field) {
    return { id: fieldId(field), name: field, value: values[field], "aria-required": ["name", "email", "type", "message"].includes(field), "aria-invalid": !!errors[field], "aria-describedby": errors[field] ? errorId(field) : undefined };
  }

  return <form className="enquiry-form" onSubmit={submit} noValidate>
    {initialProject && <p className="enquiry-context"><span className="mono">Regarding</span><strong>{initialProject}</strong></p>}
    <p className="demo-notice">Concept Project demonstration. This form validates your entry locally; it does not send or save personal information.</p>
    <div className="form-grid">
      <div className="field"><label htmlFor={fieldId("name")}>Name <span>*</span></label><input {...fieldProps("name")} ref={(element) => { refs.current.name = element; }} autoComplete="name" placeholder="Your name" onChange={(event) => update("name", event.target.value)} />{errors.name && <p id={errorId("name")} className="field-error">{errors.name}</p>}</div>
      <div className="field"><label htmlFor={fieldId("email")}>Email <span>*</span></label><input {...fieldProps("email")} ref={(element) => { refs.current.email = element; }} type="email" autoComplete="email" placeholder="you@example.com" onChange={(event) => update("email", event.target.value)} />{errors.email && <p id={errorId("email")} className="field-error">{errors.email}</p>}</div>
      <div className="field"><label htmlFor={fieldId("type")}>Project type <span>*</span></label><div className="select-control"><select {...fieldProps("type")} ref={(element) => { refs.current.type = element; }} onChange={(event) => update("type", event.target.value)}><option value="">Select a discipline</option>{projectTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select><ChevronDownIcon /></div>{errors.type && <p id={errorId("type")} className="field-error">{errors.type}</p>}</div>
      <div className="field"><label htmlFor={fieldId("location")}>Location</label><input {...fieldProps("location")} ref={(element) => { refs.current.location = element; }} autoComplete="address-level2" placeholder="City, region or site" onChange={(event) => update("location", event.target.value)} /></div>
      <div className="field field-wide"><label htmlFor={fieldId("scope")}>Estimated project scope</label><input {...fieldProps("scope")} ref={(element) => { refs.current.scope = element; }} placeholder="Approximate area, number of spaces or extent of refurbishment" onChange={(event) => update("scope", event.target.value)} /></div>
      <div className="field field-wide"><label htmlFor={fieldId("message")}>Message <span>*</span></label><textarea {...fieldProps("message")} ref={(element) => { refs.current.message = element; }} rows={5} placeholder="Tell us about the place you have in mind…" onChange={(event) => update("message", event.target.value)} />{errors.message && <p id={errorId("message")} className="field-error">{errors.message}</p>}</div>
    </div>
    <div className="form-bottom"><p>* Required fields</p><button type="submit" className="submit-button">Complete demo enquiry <span aria-hidden="true"><ArrowUpRightIcon /></span></button></div>
    {submitted && <p className="form-success" role="status">Demo enquiry complete. No information has been sent or saved.</p>}
  </form>;
}
