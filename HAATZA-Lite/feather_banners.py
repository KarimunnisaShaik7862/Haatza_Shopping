import math
from PIL import Image, ImageDraw, ImageFilter

def smoothstep(t):
    t = max(0.0, min(1.0, t))
    return t * t * (3.0 - 2.0 * t)

def create_perfect_feathered_banner(input_path, output_path, ellipse_box, blur_radius=70, margin_x=120, margin_y=110):
    img = Image.open(input_path).convert("RGBA")
    w, h = img.size
    
    # 1. Base ellipse mask
    mask = Image.new("L", (w, h), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse(ellipse_box, fill=255)
    feathered_mask = mask.filter(ImageFilter.GaussianBlur(radius=blur_radius))
    
    pixels = img.load()
    mask_pixels = feathered_mask.load()
    
    # Dark green tone matching the banner's #073510 / #05290D
    gr, gg, gb = (6, 40, 14)
    
    for y in range(h):
        # Calculate vertical edge falloff (guarantees 0 at top and bottom)
        dist_y = min(y, h - 1 - y)
        fy = smoothstep(dist_y / float(margin_y))
        
        for x in range(w):
            # Calculate horizontal edge falloff (guarantees 0 at left and right)
            dist_x = min(x, w - 1 - x)
            fx = smoothstep(dist_x / float(margin_x))
            
            boundary_factor = fx * fy
            raw_alpha = mask_pixels[x, y]
            
            # Final alpha strictly drops to 0 at the borders
            final_alpha = int(raw_alpha * boundary_factor)
            
            # Blend color towards dark green as alpha decreases to avoid grayish fringe
            fade = (255 - final_alpha) / 255.0
            color_factor = fade * fade
            
            r, g, b, _ = pixels[x, y]
            nr = int(r * (1.0 - color_factor) + gr * color_factor)
            ng = int(g * (1.0 - color_factor) + gg * color_factor)
            nb = int(b * (1.0 - color_factor) + gb * color_factor)
            
            pixels[x, y] = (nr, ng, nb, final_alpha)
            
    img.save(output_path, "PNG", optimize=True)
    print(f"Generated {output_path}")

create_perfect_feathered_banner(
    'public/images/banners/hero_3d_groceries.jpg',
    'public/images/banners/hero_3d_groceries_feathered.png',
    ellipse_box=[130, 80, 1246, 688],
    blur_radius=60,
    margin_x=130,
    margin_y=110
)

create_perfect_feathered_banner(
    'public/images/banners/hero_3d_farm.jpg',
    'public/images/banners/hero_3d_farm_feathered.png',
    ellipse_box=[160, 60, 1216, 708],
    blur_radius=65,
    margin_x=140,
    margin_y=110
)
