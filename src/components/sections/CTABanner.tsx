import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CTABannerProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonHref: string;
}

export function CTABanner({ title, subtitle, buttonText, buttonHref }: CTABannerProps) {
  return (
    <section className="relative overflow-hidden bg-surface-dark py-16 md:py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-surface-dark via-black to-surface-dark">
        <div className="absolute left-20 top-10 size-64 rounded-full bg-brand opacity-20 blur-[100px]" />
        <div className="absolute bottom-10 right-20 size-96 rounded-full bg-brand opacity-20 blur-[120px]" />
      </div>

      <div className="container relative mx-auto px-4 text-center">
        <h2 className="mb-4 text-3xl text-white md:text-5xl">{title}</h2>
        <p className="mx-auto mb-8 max-w-2xl font-sans text-lg text-brand-cream">{subtitle}</p>
        <Link
          href={buttonHref}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-action px-8 text-base font-bold text-white transition-colors hover:bg-action-hover"
        >
          {buttonText}
          <ArrowRight aria-hidden="true" className="size-5" />
        </Link>
      </div>
    </section>
  );
}
