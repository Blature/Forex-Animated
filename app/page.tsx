import { Hero } from "@/components/sections/hero";
import { StatsBand } from "@/components/sections/stats-band";
import { Products } from "@/components/sections/products";
import { AccountTypes } from "@/components/sections/account-types";
import { PlatformMT5 } from "@/components/sections/platform-mt5";
import { SpecialServices } from "@/components/sections/special-services";
import { TrustAuthority } from "@/components/sections/trust-authority";
import { FinalCTA } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBand />
      <Products />
      <AccountTypes />
      <PlatformMT5 />
      <SpecialServices />
      <TrustAuthority />
      <FinalCTA />
    </>
  );
}
