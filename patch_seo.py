import re

with open('src/utils/seo.ts', 'r') as f:
    content = f.read()

# Replace the generic `route.startsWith('service-')` handler if it exists, or insert our specific ones
# Wait, let's see how `route.startsWith('service-')` is handled.
