import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

new_logic = """  const handleOpenQuoteModal = (service?: string) => {
    let resolvedService = service;
    if (!resolvedService && currentRoute.startsWith('service-')) {
      resolvedService = currentRoute.replace('service-', '') + '-cleaning';
    } else if (!resolvedService && typeof window !== 'undefined') {
      const dynamicService = new URLSearchParams(window.location.search).get('service');
      if (dynamicService) resolvedService = dynamicService;
    }
    setQuoteServiceTarget(resolvedService);
    setIsQuoteModalOpen(true);
  };"""

content = re.sub(r"  const handleOpenQuoteModal = \(service\?: string\) => \{\n    setQuoteServiceTarget\(service\);\n    setIsQuoteModalOpen\(true\);\n  \};", new_logic, content)

with open('src/App.tsx', 'w') as f:
    f.write(content)
