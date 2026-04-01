# Boilerplate — Initial Project Scaffold
**Date:** 03/04/2026 (before Sprint 1)

Project foundation with everything needed to build and run:

**Config & Infrastructure:**
- Vite + React + TypeScript + Tailwind setup
- Dockerfile & run.bat
- package.json with all dependencies

**Server API Routes (Express):**
- `server/routes/auth.ts` — Xác thực
- `server/routes/beneficiaries.ts` — Hồ sơ thụ hưởng
- `server/routes/donations.ts` — Quyên góp
- `server/routes/inventory.ts` — Kho vật tư
- `server/routes/programs.ts` — Chương trình
- `server/db.ts`, `server/types.ts`, `server/middleware/auth.ts`

**Public Landing Page Components:**
- Hero, ImpactStats, CorePrograms, FeaturedSections, BlogAndContact, Footer
- Public Navbar

**Entry Points:**
- `src/main.tsx`, `src/index.css`
