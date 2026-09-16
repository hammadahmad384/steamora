import re

with open('src/data/servicesData.ts', 'r') as f:
    content = f.read()

# Replace all beforeImage and afterImage unsplash URLs with the corresponding .jpg or .webp
# We can just leave them if they are not used anywhere. But to be safe, I'll update them.
pass
