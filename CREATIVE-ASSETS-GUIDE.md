# Storybook Weddings - Creative Sections Asset Guide

## Overview
The homepage now features 4 stunning creative sections that require specific images and videos. This guide tells you exactly what's needed for each section.

---

## 📍 SECTION 1: "Taking Your Wedding to New Heights"
**Effect:** Parallax groom being thrown up as you scroll

### Required Assets:

| File | Dimensions | Description |
|------|------------|-------------|
| `assets/images/heights-background.jpg` | 1200x800px (min) | **Background image** - The bridal party from chest-up, arms raised, looking up. The groom is NOT in this image (he's been cut out). |
| `assets/images/heights-groom.png` | 600x900px approx | **PNG with transparency** - Just the groom cut out, being thrown in the air. This moves independently for the parallax effect. |

### Tips for this image:
- Take/find a photo of groomsmen throwing the groom
- Use Photoshop/remove.bg to cut out the groom onto transparent background
- The background should show the party from below, arms up, without the groom
- Dramatic, joyful expressions work best

---

## 📍 SECTION 2: "Every Frame Tells a Story"
**Effect:** Film strip that scrolls horizontally as you scroll vertically

### Required Assets:

| File | Dimensions | Description |
|------|------------|-------------|
| `assets/images/film-01.jpg` | 600x400px | Getting ready moment |
| `assets/images/film-02.jpg` | 600x400px | The dress / details |
| `assets/images/film-03.jpg` | 600x400px | First look reaction |
| `assets/images/film-04.jpg` | 600x400px | Ceremony moment |
| `assets/images/film-05.jpg` | 600x400px | The kiss |
| `assets/images/film-06.jpg` | 600x400px | Celebration / confetti |
| `assets/images/film-07.jpg` | 600x400px | First dance |
| `assets/images/film-08.jpg` | 600x400px | Party / fun moment |

### Tips:
- Images will appear with slight sepia/vintage tint (like old film)
- Choose images that tell the story of a wedding day chronologically
- Horizontal/landscape orientation works best
- Can add more frames by duplicating `<div class="film-frame">` in HTML

---

## 📍 SECTION 3: "Two Become One"
**Effect:** Split screen of bride & groom that slides apart to reveal them together

### Required Assets:

| File | Dimensions | Description |
|------|------------|-------------|
| `assets/images/merge-bride.jpg` | 1200x1600px | **Left panel** - Bride getting ready (soft, warm lighting preferred). Portrait orientation, she should be roughly centered. |
| `assets/images/merge-groom.jpg` | 1200x1600px | **Right panel** - Groom getting ready (cooler tones work well). Portrait orientation, roughly centered. |
| `assets/images/merge-together.jpg` | 2400x1600px | **Center reveal** - The couple together (first look, ceremony, or portrait). This is revealed as the panels slide apart. |

### Tips:
- The bride/groom images will have color overlays (warm gold for her, cool blue for him)
- The center "together" image should be powerful and emotional
- Landscape or square works best for the center image
- Match the "mood" - getting ready photos have intimate, anticipatory energy

---

## 📍 SECTION 4: "Captured in Time"
**Effect:** Video that scrubs forward/backward based on scroll position

### Required Assets:

| File | Duration | Description |
|------|----------|-------------|
| `assets/videos/confetti-moment.mp4` | 5-15 seconds | A beautiful moment with movement - confetti throw, first dance spin, kiss, etc. |
| `assets/videos/confetti-moment.webm` | Same as above | WebM version for better browser support |

### Tips for this video:
- **Slow motion works AMAZINGLY** - 60fps or 120fps source looks incredible when scrubbed
- Confetti throw, sparkler exit, or first dance are perfect
- Keep it 5-15 seconds - longer videos mean slower scrub response
- Export at 1080p or 4K for quality
- Video should look good at ANY frame (since user can stop anywhere)

### How to create the WebM version:
```bash
ffmpeg -i confetti-moment.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 confetti-moment.webm
```

---

## 🎨 Quick Summary

| Section | Assets Needed |
|---------|---------------|
| Heights | 2 images (1 PNG cutout) |
| Film Strip | 8 images |
| Two Become One | 3 images |
| Video Scrub | 1 video (2 formats) |

**Total: 13 images + 1 video**

---

## 💡 Pro Tips

1. **Image Quality**: Use high-resolution images. They'll be displayed large and need to look crisp.

2. **Consistent Style**: Try to use images from the same wedding or with similar editing style for cohesion.

3. **Test on Mobile**: The sections are responsive, but test your specific images to ensure they look good cropped.

4. **Video Optimization**: Compress videos well - a 10MB video that loads slowly ruins the experience.

5. **Placeholder Testing**: Before adding real assets, you can test with placeholder images to see the effects working.

---

## Need Help?

If you need assistance with:
- Cutting out the groom for the PNG
- Converting video formats
- Optimizing images for web

Just let me know!
