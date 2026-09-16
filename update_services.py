import re
with open('src/data/servicesData.ts', 'r') as f:
    content = f.read()

content = content.replace('/images/carpet-cleaning.png', '/images/carpet-cleaning.webp')
content = content.replace('/images/upholstery-cleaning.png', '/images/upholstery-cleaning.webp')
content = content.replace('/images/mattress-cleaning.png', '/images/mattress-cleaning.webp')
content = content.replace('/images/blind-cleaning.png', '/images/blind-cleaning.webp')
content = content.replace('/images/couch-cleaning.png', '/images/couch-cleaning.webp')

with open('src/data/servicesData.ts', 'w') as f:
    f.write(content)
