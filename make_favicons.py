import sys
from PIL import Image
import os

source_path = '/src/assets/images/steamora_icon_raw_1789576566014.jpg'
# use relative path since CWD is root
source_path = 'src/assets/images/steamora_icon_raw_1789576566014.jpg'

if not os.path.exists(source_path):
    print("Source image not found.")
    sys.exit(1)

img = Image.open(source_path)

# Convert to RGB (to be safe)
img = img.convert('RGB')

sizes = {
    'favicon-16x16.png': (16, 16),
    'favicon-32x32.png': (32, 32),
    'apple-touch-icon.png': (180, 180),
    'android-chrome-192x192.png': (192, 192),
    'android-chrome-512x512.png': (512, 512),
}

for filename, size in sizes.items():
    resized = img.resize(size, Image.Resampling.LANCZOS)
    resized.save(f'public/{filename}', format='PNG')

# Create favicon.ico
icon_sizes = [(16, 16), (32, 32), (48, 48)]
imgs = [img.resize(size, Image.Resampling.LANCZOS) for size in icon_sizes]
imgs[0].save('public/favicon.ico', format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])

print("Favicons generated.")
