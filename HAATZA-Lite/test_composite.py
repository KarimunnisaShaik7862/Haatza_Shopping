from PIL import Image

# Test compositing over #0B6623 background
bg_color = (11, 102, 35, 255) # #0B6623

# Test 1: groceries
g = Image.open('public/images/banners/groceries_hero_transparent.png').convert('RGBA')
canvas1 = Image.new('RGBA', g.size, bg_color)
canvas1.paste(g, (0, 0), g)
canvas1.save('public/images/banners/test_composite_groceries.jpg', 'JPEG')

# Test 2: fruits
f = Image.open('public/images/banners/fruits_hero_transparent.png').convert('RGBA')
canvas2 = Image.new('RGBA', f.size, bg_color)
canvas2.paste(f, (0, 0), f)
canvas2.save('public/images/banners/test_composite_fruits.jpg', 'JPEG')

print("Composites saved!")
