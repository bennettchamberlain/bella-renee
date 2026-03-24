# 🎵 Bella Renee Official Merch Store

Ecommerce website for Bella Renee, EDM artist based in LA.

**Tech Stack:** Next.js 16 + Sanity.io + Stripe + Tailwind CSS

**Design Inspiration:** https://nghtmreshop.com/ (NGHTMRE's official store)

---

## 📂 Project Structure

```
bella-renee/
├── frontend/          # Next.js application
│   ├── app/          # Pages (App Router)
│   ├── components/   # React components
│   ├── context/      # Global state (cart)
│   ├── lib/          # Utilities (Sanity, Stripe)
│   └── public/       # Static assets
│
├── studio/           # Sanity CMS
│   └── schemaTypes/  # Content schemas
│
├── IMPLEMENTATION_PLAN.md  # Full development roadmap
├── QUICK_START.md          # Getting started guide
└── DESIGN_GUIDE.md         # Visual design specs
```

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd /home/bennett/Development/bellarenee/bella-renee
npm install
```

### 2. Set Environment Variables
Create `.env.local` in `frontend/`:
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=<your-project-id>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-03-24

# Add later when ready
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

### 3. Start Development Servers
```bash
# Terminal 1: Next.js frontend
cd frontend
npm run dev
# Open: http://localhost:3000

# Terminal 2: Sanity Studio
cd studio
npm run dev
# Open: http://localhost:3333
```

---

## 📋 Development Plan

See detailed plans in:
- **`IMPLEMENTATION_PLAN.md`** - Complete step-by-step guide
- **`QUICK_START.md`** - Fast-track setup instructions
- **`DESIGN_GUIDE.md`** - Visual design specifications

**Current Phase:** Phase 1 - Sanity Schemas

**Next Steps:**
1. Create product schema with drag-and-drop images/videos
2. Upload sample products from `frontend/public/images/merch-samples/`
3. Build homepage with featured products
4. Implement shopping cart
5. Integrate Stripe checkout

---

## 🎨 Design Philosophy

- **Dark & Minimal** - Black background, bold images
- **Mobile-First** - Optimized for all screen sizes
- **Image-Focused** - Product photos are the hero
- **Clean Navigation** - Simple menu, prominent cart
- **Fast Loading** - Optimized images, lazy loading

---

## 🛠️ Features

### Content Management (Sanity)
- Drag-and-drop product images
- Video uploads for product demos
- Product variants (size, color)
- Category management
- Site settings (logo, footer, etc.)

### Ecommerce (Stripe)
- Shopping cart with localStorage persistence
- Stripe Checkout integration
- Order confirmation pages
- Test mode for development

### Frontend (Next.js)
- Server-side rendering for SEO
- Image optimization (Next.js Image)
- Responsive design (Tailwind CSS)
- Fast page loads (static generation where possible)

---

## 📦 Sample Products

Based on images in `frontend/public/images/merch-samples/`:

1. Jersey ($85-140)
2. Hoodie ($75-85)
3. Crop Top ($35-45)
4. Long Sleeve Tee ($50-60)
5. Pants ($65-75)
6. Sport Skirt ($45-55)

---

## 🔗 Useful Links

- **Sanity Studio:** http://localhost:3333 (when running)
- **Next.js App:** http://localhost:3000 (when running)
- **Stripe Dashboard:** https://dashboard.stripe.com/
- **Design Reference:** https://nghtmreshop.com/

---

## 📝 Notes

- Stripe integration is prepared but needs API keys (add later)
- Sample products ready to be created in Sanity
- Design follows NGHTMRE aesthetic with Bella Renee branding

---

## 🎂 Built with birthday vibes! 🎉

Happy Birthday, BDC! Let's make this store amazing! 🚀
