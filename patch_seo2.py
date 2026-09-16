import re

with open('src/utils/seo.ts', 'r') as f:
    content = f.read()

# Make sure title for home is "STEAMORA Cleaning | Professional Cleaning Services in Melbourne"
content = content.replace("title: `STEAMORA | Premium Steam Cleaning Melbourne | Carpets, Couches & Mattresses`,", "title: `STEAMORA Cleaning | Professional Cleaning Services in Melbourne`,")
content = content.replace("description: `Melbourne's premier steam cleaning specialists. Carpet cleaning ($30–$35/room), couches ($25–$35/seat), mattresses ($80–$100), blinds & rugs. Rapid dry, eco-safe, 100% bond-back guarantee.`,", "description: `Professional cleaning services in Melbourne from STEAMORA Cleaning. Explore sofa, carpet, upholstery, mattress and blind cleaning services. Request a free quote.`,")

content = content.replace("title: 'Carpet Cleaning Melbourne | STEAMORA Cleaning',", "title: 'Carpet Cleaning Melbourne | STEAMORA Cleaning',")
content = content.replace("title: 'Sofa Cleaning Melbourne | STEAMORA Cleaning',", "title: 'Sofa Cleaning Melbourne | STEAMORA Cleaning',")
content = content.replace("title: 'Mattress Cleaning Melbourne | STEAMORA Cleaning',", "title: 'Mattress Cleaning Melbourne | STEAMORA Cleaning',")
content = content.replace("title: 'Upholstery Cleaning Melbourne | STEAMORA Cleaning',", "title: 'Upholstery Cleaning Melbourne | STEAMORA Cleaning',")
content = content.replace("title: 'Blind Cleaning Melbourne | STEAMORA Cleaning',", "title: 'Blind Cleaning Melbourne | STEAMORA Cleaning',")

content = content.replace("https://steamora.com.au", "https://steamoracleaning.com.au")
content = content.replace("BRAND_SUFFIX = ' | STEAMORA Melbourne'", "BRAND_SUFFIX = ' | STEAMORA Cleaning'")
content = content.replace("@id\": \"https://steamora.com.au\"", "@id\": \"https://steamoracleaning.com.au\"")
content = content.replace("url\": \"https://steamora.com.au\"", "url\": \"https://steamoracleaning.com.au\"")

# Ensure og:site_name is correct
content = content.replace("'STEAMORA'", "'STEAMORA Cleaning'")

# Update og:image in generated schema
content = content.replace("https://steamoracleaning.com.au/images/carpet-cleaning.webp", "https://steamoracleaning.com.au/android-chrome-512x512.png")

with open('src/utils/seo.ts', 'w') as f:
    f.write(content)
