import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="border-t border-white/[0.06] py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-2xl  font-bold text-white/80">{t('nav.wathba')}</h2>
          <p className="text-[#5C5A56] text-sm  mt-2">{t('footer.tagline')}</p>
        </div>
        <nav className="flex gap-8 text-[#A09D96] text-sm">
          <a href="#packages" className="hover:text-[#C9A84C] transition">{t('nav.packages')}</a>
          <a href="#why" className="hover:text-[#C9A84C] transition">{t('nav.why')}</a>
          <a href="#contact" className="hover:text-[#C9A84C] transition">{t('nav.contact')}</a>
        </nav>
        <p className="text-[#5C5A56] text-xs">
          {t('footer.copyright')} {new Date().getFullYear()}. {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
}
