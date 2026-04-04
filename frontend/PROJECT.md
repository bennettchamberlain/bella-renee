# PROJECT.md - Bella Renee Official Merch

> E-commerce site for EDM/Drum & Bass artist Bella Renee's official merchandise

## Project Information

**Name**: Bella Renee Official Merch  
**Description**: Next.js 16 storefront with Sanity CMS for EDM artist Bella Renee's merchandise and brand presence  
**Status**: Active  
**Started**: March 2026

## Client/Stakeholder Information

**Client Name**: Bella Renee (EDM/Drum & Bass Artist)  
**Primary Contact**: [Artist management contact]  
**Collaboration Style**: Creative collaboration, artist-driven design decisions  
**Client Vibe**: Rising EDM artist, energetic brand ("a lot of emotion & a lil bit of bass"), Kannibalen Records artist

## Technical Details

**Tech Stack**:
- Frontend: Next.js 16 (App Router) + React
- CMS: Sanity.io (headless CMS)
- Backend: Sanity Studio for content management
- Database: Sanity backend
- Hosting/Deployment: [Vercel?]
- Other: Stripe (prepared), Tailwind CSS 4

**Development Environment**:
- Frontend URL: http://localhost:3005
- Sanity Studio URL: http://localhost:3333
- Production URL: [https://bellarenee.com - placeholder]
- Frontend log: `/tmp/bellarenee-frontend.log`

**Repository**:
- Git: https://github.com/bennettchamberlain/bella-renee.git
- Branch: main

## Project Structure

**Key Directories**:
- `frontend/`: Next.js application
- `frontend/app/`: App router pages
- `frontend/components/`: React components
- `frontend/lib/`: Utilities (Sanity client, etc.)
- `studio/`: Sanity Studio configuration

**Important Files**:
- `frontend/app/layout.tsx`: Root layout with SEO meta tags
- `frontend/components/ProductCard.tsx`: Large product display cards
- `frontend/components/Footer.tsx`: Social links, music CTAs
- `frontend/components/StructuredData.tsx`: JSON-LD schemas
- `SEO_PLAN.md`: Future SEO enhancement roadmap
- `SEO_COMPLETE.md`: Summary of completed SEO work

## Goals & Vision

**Primary Goal**: Establish strong online presence for Bella Renee merch with excellent SEO and user experience

**Success Metrics**:
- Google Search Console ranking for "Bella Renee merch"
- Social media click-through from footer links
- Product page engagement (time on page, add to cart)
- Lighthouse SEO score 90+

**Long-term Vision**: 
- Become the primary destination for Bella Renee fans
- Integrate tour dates and music releases
- Build email list for drops and announcements
- Create About page with artist bio and press

## Current Focus

**Active Work**:
- ✅ SEO foundation complete (meta tags, OG, Twitter, structured data, sitemap, robots.txt)
- ✅ UI improvements (bigger product cards, redesigned header)
- Ready for production deployment

**Blockers**: None

**Next Milestones** (from SEO_PLAN.md - HIGH PRIORITY):
1. Create About page with artist bio, press mentions, music embeds
2. Add product-level structured data (Product, Offer schemas)
3. Optimize all product images with descriptive alt text
4. Submit sitemap to Google Search Console
5. Add breadcrumb navigation with BreadcrumbList schema

## Notes

**Things to Remember**:
- Tagline: "a lot of emotion & a lil bit of bass"
- Artist is on Kannibalen Records
- Latest release: GOOD GR!EF EP
- Featured: EDMTrain Artist of the Week, EDM Identity
- Current products: Sport Skirt ($50), Track Pants ($70), Crop Top ($40), Signature Hoodie ($95), Brain Freeze Hockey Jersey ($140)
- All SEO work completed April 1, 2026 (6 commits: e543853, 54625e8, 604ed8b, 537d52a, e9af97d, 742adb7)
- Before deployment: Update baseUrl in sitemap.ts to actual domain

**Artist Social Media**:
- Instagram: https://instagram.com/bellareneemusic
- TikTok: https://tiktok.com/@bellareneemusic
- YouTube: https://youtube.com/c/BellaReneeMusic
- Twitter/X: https://x.com/bellareneemusic
- Facebook: https://facebook.com/BellaReneeMusic
- Bandsintown: https://www.bandsintown.com/a/11339806-bella-renee

**Related Projects**: None

---

*Last Updated: 2026-04-02*
