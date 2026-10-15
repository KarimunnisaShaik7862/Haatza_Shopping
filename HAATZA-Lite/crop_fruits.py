from PIL import Image
import os

os.makedirs('public/images/products', exist_ok=True)
im = Image.open('public/images/categories/3d_fruits.jpg')
w, h = im.size

# In 1024x1024:
# Apple: left ~ 50 to 350, y ~ 450 to 800
# Orange: x ~ 320 to 600, y ~ 450 to 750
# Broccoli: x ~ 200 to 620, y ~ 180 to 580
# Banana: x ~ 380 to 730, y ~ 290 to 800
# Avocado: x ~ 680 to 950, y ~ 440 to 800

def make_square_padded(crop_box, out_name):
    cropped = im.crop(crop_box)
    cw, ch = cropped.size
    max_dim = max(cw, ch) + 80
    new_im = Image.new('RGB', (max_dim, max_dim), (255, 255, 255))
    offset = ((max_dim - cw) // 2, (max_dim - ch) // 2)
    new_im.paste(cropped, offset)
    new_im.save(f'public/images/products/{out_name}.jpg', 'JPEG', quality=95)
    print(f'Saved {out_name}')

make_square_padded((50, 440, 350, 780), '3d_apple')
make_square_padded((320, 440, 595, 740), '3d_orange')
make_square_padded((190, 180, 620, 580), '3d_broccoli')
make_square_padded((670, 430, 960, 790), '3d_avocado')
make_square_padded((320, 420, 600, 750), '3d_mango') # We will also generate dedicated mango!
