import re

with open('src/types.ts', 'r') as f:
    content = f.read()
if "'not-found'" not in content:
    content = content.replace("export type PageRoute = \n  | 'home'", "export type PageRoute = \n  | 'home'\n  | 'not-found'")
    with open('src/types.ts', 'w') as f:
        f.write(content)

with open('src/App.tsx', 'r') as f:
    content = f.read()

content = content.replace("return { route: 'home', param: '' }; // fallback", "return { route: 'not-found', param: '' }; // fallback")

not_found_case = """      case 'not-found':
        return (
          <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-950 tracking-tight mb-4">404 - Page Not Found</h1>
            <p className="text-lg text-slate-600 mb-8 max-w-md">We couldn't find the page you were looking for. Explore our professional cleaning services below.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => handleNavigate('home')} className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl transition-colors">Go Home</button>
              <button onClick={() => handleNavigate('services')} className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-colors">View All Services</button>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-4 text-left max-w-lg w-full">
              <button onClick={() => handleNavigate('service-carpet')} className="text-teal-600 hover:underline font-semibold">Carpet Cleaning →</button>
              <button onClick={() => handleNavigate('service-sofa')} className="text-teal-600 hover:underline font-semibold">Sofa Cleaning →</button>
              <button onClick={() => handleNavigate('service-upholstery')} className="text-teal-600 hover:underline font-semibold">Upholstery Cleaning →</button>
              <button onClick={() => handleNavigate('service-mattress')} className="text-teal-600 hover:underline font-semibold">Mattress Cleaning →</button>
              <button onClick={() => handleNavigate('service-blind')} className="text-teal-600 hover:underline font-semibold">Blind Cleaning →</button>
            </div>
          </div>
        );
"""

if "case 'not-found':" not in content:
    content = content.replace("      default:\n        return (", not_found_case + "      default:\n        return (")

with open('src/App.tsx', 'w') as f:
    f.write(content)
