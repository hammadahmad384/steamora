import re
with open('src/data/servicesData.ts', 'r') as f:
    content = f.read()

content = content.replace("bannerAlt: 'Professional carpet cleaning service in Melbourne by STEAMORA'", "bannerAlt: 'Professional carpet steam cleaning service in Melbourne'")
content = content.replace("bannerAlt: 'Professional upholstery cleaning service in Melbourne by STEAMORA'", "bannerAlt: 'Professional upholstery cleaning service in Melbourne'")
content = content.replace("bannerAlt: 'Professional mattress cleaning service in Melbourne by STEAMORA'", "bannerAlt: 'Professional mattress cleaning service in Melbourne'")
content = content.replace("bannerAlt: 'Professional blind cleaning service in Melbourne by STEAMORA'", "bannerAlt: 'Professional blind cleaning service in Melbourne'")
content = content.replace("bannerAlt: 'Professional couch cleaning service in Melbourne by STEAMORA'", "bannerAlt: 'Professional couch cleaning service in Melbourne'")

with open('src/data/servicesData.ts', 'w') as f:
    f.write(content)
