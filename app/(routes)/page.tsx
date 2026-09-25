import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { ModelsStrip } from "@/components/landing/models-strip";
import { ProductPreview } from "@/components/landing/product-preview";
import { WhyEcho } from "@/components/landing/why-echo";
import { Pricing } from "@/components/landing/pricing";
import { FAQ } from "@/components/landing/faq";
import { Testimonials } from "@/components/landing/testimonials";
import { ClosingCTA } from "@/components/landing/closing-cta";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ModelsStrip />
        <Features />
        <ProductPreview />
        <WhyEcho />
        <Testimonials />
        <Pricing />
        <FAQ />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}