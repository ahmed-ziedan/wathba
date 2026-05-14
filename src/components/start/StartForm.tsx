"use client";

import { useForm, ValidationError } from "@formspree/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

const FORMSPREE_FORM_ID =
  process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID ?? "maqvzewz";

const PKG_KEYS = ["starter", "business", "pro"] as const;
type PkgKey = (typeof PKG_KEYS)[number];

function isPkgKey(v: string | null): v is PkgKey {
  return v === "starter" || v === "business" || v === "pro";
}

const inputClass =
  "w-full rounded-xl border border-white/[0.08] bg-[#13131F] px-4 py-3.5 text-[#F0EDE6] placeholder:text-[#5C5A56] shadow-inner focus:border-[#C9A84C]/45 focus:outline-none focus:ring-1 focus:ring-[#C9A84C]/25";

const labelClass = "mb-2 block text-sm font-medium text-[#A09D96]";

export function StartForm() {
  const t = useTranslations("start");
  const tPkg = useTranslations("packages");
  const searchParams = useSearchParams();
  const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID);

  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [description, setDescription] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [packageId, setPackageId] = useState<PkgKey | "">("");

  useEffect(() => {
    const raw = searchParams.get("package")?.toLowerCase() ?? null;
    if (isPkgKey(raw)) setPackageId(raw);
  }, [searchParams]);

  const packageLabel =
    packageId !== "" ? tPkg(`${packageId}.name`) : t("package_placeholder");
  const subjectLine = t("mail_subject", { package: packageLabel });

  if (state.succeeded) {
    return (
      <div className="mx-auto max-w-xl">
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="h-px w-6 shrink-0 bg-[#C9A84C]" />
          <span className="text-center text-xs font-medium tracking-widest text-[#C9A84C] uppercase">
            {t("label")}
          </span>
          <div className="h-px w-6 shrink-0 bg-[#C9A84C]" />
        </div>

        <h1 className="font-display text-center text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight text-[#F0EDE6]">
          {t("headline")}
        </h1>

        <p
          role="status"
          className="mt-10 rounded-2xl border border-[#C9A84C]/25 bg-[#C9A84C]/10 px-6 py-8 text-center text-lg leading-relaxed text-[#F0EDE6] md:text-xl"
        >
          {t("success_message")}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-8 flex items-center justify-center gap-3">
        <div className="h-px w-6 shrink-0 bg-[#C9A84C]" />
        <span className="text-center text-xs font-medium tracking-widest text-[#C9A84C] uppercase">
          {t("label")}
        </span>
        <div className="h-px w-6 shrink-0 bg-[#C9A84C]" />
      </div>

      <h1 className="font-display text-center text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight text-[#F0EDE6]">
        {t("headline")}
      </h1>
      <p className="mx-auto mt-4 max-w-md text-center text-base leading-relaxed text-[#A09D96] md:text-lg">
        {t("sub")}
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-12 flex flex-col gap-6 text-start"
      >
        <input type="hidden" name="_subject" value={subjectLine} readOnly />

        <div>
          <label htmlFor="business-name" className={labelClass}>
            {t("field_business_name")}
          </label>
          <input
            id="business-name"
            name="businessName"
            type="text"
            autoComplete="organization"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="industry" className={labelClass}>
            {t("field_industry")}
          </label>
          <input
            id="industry"
            name="industry"
            type="text"
            autoComplete="off"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="description" className={labelClass}>
            {t("field_description")}
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`${inputClass} min-h-[8rem] resize-y`}
          />
        </div>

        <div>
          <label htmlFor="whatsapp" className={labelClass}>
            {t("field_whatsapp")}
          </label>
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            {t("field_email")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
          <ValidationError
            errors={state.errors}
            field="email"
            className="mt-1.5 text-sm text-red-400/90"
          />
        </div>

        <div>
          <label htmlFor="package" className={labelClass}>
            {t("field_package")}
          </label>
          <div className="relative">
            <select
              id="package"
              name="package"
              value={packageId}
              onChange={(e) => {
                const v = e.target.value;
                setPackageId(isPkgKey(v) ? v : "");
              }}
              className={`${inputClass} appearance-none pe-10`}
            >
              <option value="" disabled>
                {t("package_placeholder")}
              </option>
              {PKG_KEYS.map((key) => (
                <option key={key} value={key}>
                  {tPkg(`${key}.name`)}
                </option>
              ))}
            </select>
            <span
              className="pointer-events-none absolute end-3 top-1/2 size-0 -translate-y-1/2 border-x-[5px] border-t-[6px] border-x-transparent border-t-[#C9A84C]/80"
              aria-hidden
            />
          </div>
        </div>

        <p className="text-center text-sm leading-relaxed text-[#5C5A56]">
          {t("note")}
        </p>

        <button
          type="submit"
          disabled={state.submitting}
          className="w-full rounded-full bg-[#C9A84C] py-4 text-base font-bold text-black transition hover:bg-[#E2C06A] disabled:cursor-not-allowed disabled:opacity-55 md:py-[1.125rem] md:text-lg"
        >
          {state.submitting ? t("submitting") : t("submit")}
        </button>
      </form>
    </div>
  );
}
