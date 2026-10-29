Put these files in your Next.js project exactly like this:

app/page.tsx
components/icons.tsx
components/ParticleCanvas.tsx
components/MouseMagic.tsx
components/HeartPulse.tsx
components/MemoryLightbox.tsx
components/LockScreen.tsx
components/FeatureCard.tsx
components/StatPill.tsx
components/AppStyles.tsx
types/index.ts
lib/supabase.ts

Important:
1. If you already have lib/supabase.ts, keep your old one and do not overwrite it.
2. Your .env.local must contain:
   NEXT_PUBLIC_SUPABASE_URL=your-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   NEXT_PUBLIC_APP_PASSWORD=your-password
