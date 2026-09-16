import re
with open('src/App.tsx', 'r') as f:
    content = f.read()

replacement = """      case 'service-couch':
        return (
          <ServiceDetailPage
            serviceSlug="couch-cleaning"
            onNavigate={handleNavigate}
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        );
      case 'service-upholstery':
        return (
          <ServiceDetailPage
            serviceSlug="upholstery-cleaning"
            onNavigate={handleNavigate}
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        );"""

content = re.sub(r"      case 'service-couch':\n        return \(\n          <ServiceDetailPage\n            serviceSlug=\"couch-cleaning\"\n            onNavigate={handleNavigate}\n            onOpenQuoteModal={handleOpenQuoteModal}\n          />\n        \);", replacement, content)

with open('src/App.tsx', 'w') as f:
    f.write(content)
