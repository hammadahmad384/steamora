import re

with open('src/pages/ServiceDetailPage.tsx', 'r') as f:
    content = f.read()

internal_links = """
      {/* 5. INTERNAL LINKING */}
      <section className="bg-slate-50 py-16 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Explore Our Cleaning Services</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => onNavigate('service-sofa')} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:text-teal-600 hover:border-teal-200 transition-colors shadow-sm font-medium">Sofa Cleaning</button>
            <button onClick={() => onNavigate('service-carpet')} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:text-teal-600 hover:border-teal-200 transition-colors shadow-sm font-medium">Carpet Cleaning</button>
            <button onClick={() => onNavigate('service-upholstery')} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:text-teal-600 hover:border-teal-200 transition-colors shadow-sm font-medium">Upholstery Cleaning</button>
            <button onClick={() => onNavigate('service-mattress')} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:text-teal-600 hover:border-teal-200 transition-colors shadow-sm font-medium">Mattress Cleaning</button>
            <button onClick={() => onNavigate('service-blind')} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:text-teal-600 hover:border-teal-200 transition-colors shadow-sm font-medium">Blind Cleaning</button>
          </div>
          <div className="mt-8">
            <button onClick={() => onNavigate('home')} className="text-teal-600 hover:text-teal-700 font-bold uppercase tracking-wide text-sm flex items-center justify-center gap-2 mx-auto">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </button>
          </div>
        </div>
      </section>
"""

content = content.replace("    </div>\n  );\n}", internal_links + "    </div>\n  );\n}")

with open('src/pages/ServiceDetailPage.tsx', 'w') as f:
    f.write(content)
