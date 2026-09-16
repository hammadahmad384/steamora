import re

with open('src/pages/HomePage.tsx', 'r') as f:
    content = f.read()

content = content.replace("interface HomePageProps {\n  onNavigate: (route: PageRoute, params?: any) => void;\n  onOpenQuoteModal: (service?: string) => void;\n}", "interface HomePageProps {\n  onNavigate: (route: PageRoute, params?: any) => void;\n  onOpenQuoteModal: (service?: string) => void;\n  dynamicServiceId?: string | null;\n}")
content = content.replace("export default function HomePage({ onNavigate, onOpenQuoteModal }: HomePageProps) {", "export default function HomePage({ onNavigate, onOpenQuoteModal, dynamicServiceId }: HomePageProps) {")

# Identify dynamic service
injection = """
  // Determine if a valid dynamic service is requested via query param
  let heroService = null;
  if (dynamicServiceId) {
    // try to match e.g. "sofa" to "sofa-cleaning"
    heroService = SERVICES.find(s => s.id === dynamicServiceId || s.id.startsWith(dynamicServiceId) || s.slug.includes(dynamicServiceId));
  }
"""

content = content.replace("  const [openFaq, setOpenFaq] = useState<string | null>('faq-1');", "  const [openFaq, setOpenFaq] = useState<string | null>('faq-1');\n" + injection)

# Update Hero section text if heroService exists
content = content.replace("""              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.15]">
                Premium Steam Cleaning in <span className="text-teal-600 inline-block">Melbourne</span>
              </h1>""", """              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.15]">
                {heroService ? (
                  <>Professional <span className="text-teal-600 inline-block">{heroService.shortTitle}</span> in Melbourne</>
                ) : (
                  <>Premium Steam Cleaning in <span className="text-teal-600 inline-block">Melbourne</span></>
                )}
              </h1>""")

content = content.replace("""              <p className="text-slate-600 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Melbourne's trusted experts in carpet, couch, and mattress sanitisation. Advanced thermal extraction for a genuinely fresher home.
              </p>""", """              <p className="text-slate-600 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {heroService 
                  ? heroService.heroDescription
                  : "Melbourne's trusted experts in carpet, couch, and mattress sanitisation. Advanced thermal extraction for a genuinely fresher home."}
              </p>""")

content = content.replace("""                <button
                  onClick={() => onOpenQuoteModal()}
                  className="w-full sm:w-auto px-8 py-4 bg-teal-500 hover:bg-teal-400 active:bg-teal-600 text-slate-950 font-extrabold text-base rounded-2xl shadow-xl shadow-teal-500/25 transition-all uppercase tracking-wide flex items-center justify-center gap-2 group"
                >""", """                <button
                  onClick={() => onOpenQuoteModal(heroService?.id)}
                  className="w-full sm:w-auto px-8 py-4 bg-teal-500 hover:bg-teal-400 active:bg-teal-600 text-slate-950 font-extrabold text-base rounded-2xl shadow-xl shadow-teal-500/25 transition-all uppercase tracking-wide flex items-center justify-center gap-2 group"
                >""")

# Replace the hero image if dynamic service has one
content = content.replace("""                  <img
                    src="/images/carpet-cleaning.webp"
                    alt="Professional steam cleaning Melbourne"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    loading="lazy"
                  />""", """                  <img
                    src={heroService ? heroService.bannerImage : "/images/carpet-cleaning.webp"}
                    alt={heroService ? heroService.bannerAlt : "Professional steam cleaning Melbourne"}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    loading="lazy"
                  />""")

with open('src/pages/HomePage.tsx', 'w') as f:
    f.write(content)
