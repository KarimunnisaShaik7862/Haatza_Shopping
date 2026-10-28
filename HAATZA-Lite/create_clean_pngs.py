from PIL import Image, ImageDraw, ImageFilter

def smoothstep(t):
    t = max(0.0, min(1.0, t))
    return t * t * (3.0 - 2.0 * t)

def create_pure_transparent_asset(input_path, output_path, ellipse_box, blur_radius=75, margin_x=140, margin_y=110):
    img = Image.open(input_path).convert("RGBA")
    w, h = img.size
    
    # Base ellipse mask
    mask = Image.new("L", (w, h), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse(ellipse_box, fill=255)
    feathered_mask = mask.filter(ImageFilter.GaussianBlur(radius=blur_radius))
    
    pixels = img.load()
    mask_pixels = feathered_mask.load()
    
    # Banner brand green RGB: #0B6623 -> (11, 102, 35)
    gr, gg, gb = (11, 102, 35)
    
    for y in range(h):
        dist_y = min(y, h - 1 - y)
        fy = smoothstep(dist_y / float(margin_y))
        for x in range(w):
            dist_x = min(x, w - 1 - x)
            fx = smoothstep(dist_x / float(margin_x))
            
            boundary_factor = fx * fy
            raw_alpha = mask_pixels[x, y]
            final_alpha = int(raw_alpha * boundary_factor)
            
            # Subtle edge harmonizer towards #0B6623 so edges melt invisibly into #0B6623
            fade = (255 - final_alpha) / 255.0
            color_factor = fade * fade
            
            r, g, b, _ = pixels[x, y]
            nr = int(r * (1.0 - color_factor) + gr * color_factor)
            ng = int(g * (1.0 - color_factor) + gg * color_factor)
            nb = int(b * (1.0 - color_factor) + gb * color_factor)
            
            pixels[x, y] = (nr, ng, nb, final_alpha)
            
    img.save(output_path, "PNG", optimize=True)
    print(f"Generated {output_path}")

create_pure_transparent_asset(
    'public/images/banners/hero_3d_groceries.jpg',
    'public/images/banners/groceries_transparent.png',
    ellipse_box=[150, 75, 1226, 693],
    blur_radius=65,
    margin_x=140,
    margin_y=110
)

create_pure_transparent_asset(
    'public/images/banners/hero_3d_farm.jpg',
    'public/images/banners/fruits_transparent.png',
    ellipse_box=[170, 55, 1206, 713],
    blur_radius=70,
    margin_x=140,
    margin_y=110
)
