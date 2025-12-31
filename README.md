# Storybook - Wedding Photography & Videography Website

A modern, responsive wedding photography website template with an embedded pricing calculator and PWA (Progressive Web App) support.

## 📁 Project Structure

```
storybook/
├── index.html              # Main website file
├── manifest.json           # PWA manifest (for app installation)
├── sw.js                   # Service worker (offline support)
├── offline.html            # Offline fallback page
├── Website_Content_Template.xlsx  # Excel template to fill in your content
├── assets/                 # Your media files go here
│   ├── hero-video.mp4
│   ├── hero-poster.jpg
│   ├── about-photo.jpg
│   ├── portfolio-1.jpg
│   └── ...
└── icons/                  # App icons for PWA
    ├── icon-192x192.png
    ├── icon-512x512.png
    ├── favicon-32x32.png
    └── ...
```

## 🚀 Quick Start

### 1. Fill in the Excel Template
Open `Website_Content_Template.xlsx` and update the yellow cells with your content:
- **Site Content** - All text content, titles, descriptions
- **Portfolio Items** - Your wedding films/photos
- **Pricing** - Your service prices
- **Calculator Text** - Descriptions for the pricing calculator
- **Asset Checklist** - Track which media files you've added

### 2. Add Your Media Files
Create an `assets` folder and add:
- Hero video (MP4, preferably under 10MB)
- Portfolio images (recommended 800x600 or larger)
- About section photo
- Testimonial image

### 3. Create App Icons
For the PWA to work properly, create icons in the `icons` folder:
- `icon-192x192.png` - For Android/Chrome
- `icon-512x512.png` - For splash screens
- `favicon-32x32.png` - Browser tab icon
- `apple-touch-icon.png` (180x180) - iOS home screen

### 4. Deploy to GitHub Pages
1. Push all files to your GitHub repository
2. Go to Settings → Pages
3. Select "Deploy from a branch" → main → /(root)
4. Your site will be live at `https://joeltempero.github.io/storybook`

## 📱 PWA Features

The website can be installed as an app on mobile devices:

**Android:**
- Chrome will show an "Add to Home Screen" prompt
- Or tap the menu (⋮) → "Install app"

**iOS:**
- In Safari, tap the Share button
- Select "Add to Home Screen"

## 🎨 Customization

### Colors
Edit the CSS variables in `index.html` to change colors:
```css
:root {
    --color-bg: #FAFAFA;
    --color-accent: #0A0A0A;
    --color-success: #2D5A3D;
    /* etc. */
}
```

### Fonts
The site uses:
- **Inter** - For body text
- **Instrument Serif** - For headings

To change fonts, update the Google Fonts link in the `<head>`.

### Calculator Pricing
Update the `pricing` object in the JavaScript section:
```javascript
const pricing = {
    photography: { half: 2000, full: 2850, second: 550 },
    videography: { half: 2450, full: 3450, second: 550 },
    // etc.
};
```

## 📊 Excel Sheet Overview

| Sheet | Purpose |
|-------|---------|
| Site Content | All text content - titles, descriptions, navigation |
| Portfolio Items | Video/image URLs for gallery items |
| Pricing | All prices (update calculator automatically) |
| Calculator Text | Descriptions shown in the quote calculator |
| Asset Checklist | Track which images/videos you've added |

## 🔧 Technical Notes

- **Responsive Design:** Works on all screen sizes
- **Mobile Bottom Nav:** App-like navigation on mobile
- **Video Modal:** YouTube/Vimeo videos play in a modal
- **Scroll Animations:** Subtle fade-in effects
- **Offline Support:** Basic offline page when no connection
- **GST Calculator:** Automatically calculates 15% GST

## 📝 Placeholder Format

All placeholder text uses double curly braces: `{{PLACEHOLDER_NAME}}`

When you send back the completed Excel, I'll replace all placeholders with your content.

## ❓ Need Help?

Send the completed Excel template back and I'll populate the website with your content!
