import { ShieldCheck, CreditCard, Wallet, Banknote, Building2, Bitcoin } from "lucide-react";
import {
  XIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
  TelegramIcon,
} from "@/components/ui/social-icons";

/**
 * Site footer (design-system/MASTER.md §7 trust layer). Navigation columns,
 * social + payment methods, and the full broker risk warning / regulatory
 * disclaimer. The risk disclosure is legally required — do not remove.
 */

const COLUMNS: { title: string; links: string[] }[] = [
  {
    title: "Services",
    links: [
      "Anti Margin Call",
      "Hedging",
      "Free Signals",
      "Welcome Bonus",
      "Copy Trading",
      "24/7 Support",
    ],
  },
  {
    title: "Platform & Tools",
    links: [
      "MetaTrader 5",
      "Desktop Terminal",
      "Web Trader",
      "Mobile Apps",
      "Economic Calendar",
      "Free VPS",
    ],
  },
  {
    title: "Account Types",
    links: ["Zero Prime", "Standard", "Zero", "Islamic", "Demo Account", "Compare"],
  },
  {
    title: "Company",
    links: ["About Us", "Regulation", "Contact", "Careers", "Partners", "Legal"],
  },
];

const SOCIALS = [
  { Icon: XIcon, label: "X (Twitter)" },
  { Icon: FacebookIcon, label: "Facebook" },
  { Icon: InstagramIcon, label: "Instagram" },
  { Icon: LinkedinIcon, label: "LinkedIn" },
  { Icon: YoutubeIcon, label: "YouTube" },
  { Icon: TelegramIcon, label: "Telegram" },
];

const PAYMENTS = [
  { Icon: CreditCard, label: "Visa" },
  { Icon: CreditCard, label: "Mastercard" },
  { Icon: Wallet, label: "Skrill" },
  { Icon: Wallet, label: "Neteller" },
  { Icon: Building2, label: "Bank Transfer" },
  { Icon: Bitcoin, label: "Crypto" },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-12 border-t border-border bg-[color:var(--bg-deep)]/60">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8">
        {/* Top: brand + link columns */}
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/stp-logo.svg"
              alt="STP Trading"
              width={79}
              height={28}
              className="h-7 w-auto"
            />
            <p className="mt-4 text-sm text-[color:var(--fg-muted)]">
              Simple, straight-forward trading. Institutional-grade execution
              across forex, metals, indices and more.
            </p>
            <div className="mt-5 flex gap-2">
              {SOCIALS.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-lg border border-border text-[color:var(--fg-muted)] outline-none transition-colors hover:border-[color:var(--border-accent)] hover:text-brand focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-[color:var(--fg-subtle)]">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[color:var(--fg-muted)] outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Payment methods + regulation */}
        <div className="mt-12 flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2.5">
            {PAYMENTS.map(({ Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-2 rounded-lg border border-border bg-[color:var(--surface-1)] px-3 py-2"
              >
                <Icon
                  className="size-4 text-[color:var(--fg-subtle)]"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <span className="text-xs font-medium text-[color:var(--fg-muted)]">
                  {label}
                </span>
              </span>
            ))}
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/30 bg-[color:var(--gold-tint)] px-3.5 py-1.5">
            <ShieldCheck
              className="size-4 text-[color:var(--gold-soft)]"
              strokeWidth={1.75}
              aria-hidden
            />
            <span className="text-xs font-medium text-[color:var(--fg)]">
              Founded 2019 · Regulated by Comoros MISA
            </span>
          </div>
        </div>

        {/* RISK WARNING / REGULATORY DISCLAIMER — legally required, do not remove */}
        <div className="mt-10 space-y-4 border-t border-border pt-8 text-xs leading-relaxed text-[color:var(--fg-subtle)]">
          <p>
            <strong className="text-[color:var(--fg-muted)]">Risk Warning:</strong>{" "}
            Trading foreign exchange (forex) and Contracts for Difference (CFDs)
            on margin carries a high level of risk and may not be suitable for
            all investors. The use of leverage can work both for and against you.
            Before deciding to trade, you should carefully consider your
            investment objectives, level of experience and risk appetite. There
            is a possibility that you could sustain a loss of some or all of your
            initial investment, and therefore you should not invest money that
            you cannot afford to lose.{" "}
            <strong className="text-[color:var(--fg-muted)]">
              68% of retail investor accounts lose money when trading CFDs with
              this provider.
            </strong>{" "}
            You should consider whether you understand how CFDs work and whether
            you can afford to take the high risk of losing your money. You should
            be aware of all the risks associated with margin trading and seek
            advice from an independent, suitably licensed financial advisor if you
            have any doubts.
          </p>
          <p>
            The information on this website is not directed at, and is not
            intended for distribution to or use by, any person resident in any
            country or jurisdiction where such distribution or use would be
            contrary to local law or regulation. STP Trading does not provide
            services to residents of the United States, Canada, the European
            Economic Area, the United Kingdom, or any other restricted
            jurisdiction. It is the responsibility of each client to ensure that
            their use of our services complies with the laws and regulations
            applicable in their country of residence. Services are available only
            to persons aged 18 years or older.
          </p>
          <p>
            STP Trading is a trading name of STP Trading Ltd, registered in the
            Comoros Union and authorised and regulated by the Mwali International
            Services Authority (MISA), licence no. T2023XXX. Past performance is
            not a reliable indicator of future results. Nothing on this website
            constitutes investment, financial, legal, tax or other advice, nor a
            solicitation or recommendation to buy, sell or hold any financial
            instrument.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-[color:var(--fg-subtle)] sm:flex-row">
          <p>&copy; {2026} STP Trading. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {["Terms & Conditions", "Privacy Policy", "Cookie Policy", "Risk Disclosure", "AML Policy"].map(
              (l) => (
                <a
                  key={l}
                  href="#"
                  className="outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]"
                >
                  {l}
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
