import re
with open('src/types.ts', 'r') as f:
    content = f.read()
content = content.replace("'couch-cleaning'", "'sofa-cleaning'").replace("'service-couch'", "'service-sofa'")
with open('src/types.ts', 'w') as f:
    f.write(content)

with open('src/data/servicesData.ts', 'r') as f:
    content = f.read()
content = content.replace("'couch-cleaning'", "'sofa-cleaning'").replace("id: 'couch-cleaning'", "id: 'sofa-cleaning'")
content = content.replace("slug: 'couch-cleaning'", "slug: 'sofa-cleaning'")
# content = content.replace("title: 'Couch Cleaning'", "title: 'Sofa Cleaning'") # maybe keep title or change to Sofa & Couch Cleaning
with open('src/data/servicesData.ts', 'w') as f:
    f.write(content)
