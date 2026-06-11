# Rebuild Ginkgo T-Shirts with Next.js, NestJS & SQL Server

The goal of this task is to rebuild the existing fashion retail website, [Ginkgo T-Shirts](https://ginkgotshirts.com/en/). The frontend will be built using **Next.js**, while the backend will be powered by **NestJS** and **SQL Server**. The new application will follow modern web design principles (vibrant colors, smooth animations, glassmorphism) while keeping the core functionality and content structure of the original website.

## User Review Required

> [!IMPORTANT]
> Please confirm if you are ready to begin execution based on this updated plan. We will use Vanilla CSS for styling as per standard guidelines to ensure maximum flexibility and a truly premium feel.

## Proposed Changes

We will scaffold two separate projects: one for the Next.js frontend and one for the NestJS backend.

### Project Structure
- `frontend/`: Next.js web application.
- `backend/`: NestJS API.

### Backend Architecture (NestJS + SQL Server)
- Setup a new NestJS project.
- Integrate **TypeORM** or **Prisma** to connect to the SQL Server database.
- Create modules for:
  - **Products**: To manage clothing items, variants, and categories.
  - **Categories**: Men, Women, Kids, Accessories.
  - **Cart/Orders**: To handle shopping cart and checkout processes.

### Frontend Architecture (Next.js)
- We will implement the App Router in Next.js.
- The routing structure will closely follow the existing navigation:
  - `/` - Home Page
  - `/men` - Men's Clothing
  - `/women` - Women's Clothing
  - `/kids` - Kids' Clothing
  - `/accessories` - Accessories
  - `/the-world-of-ginkgo` - Brand Story and Stores
  - `/cart` - Shopping Cart

### Global State & Internationalization
- Setup React Context or Zustand for managing Cart state and Currency preferences (EUR, USD, JPY, VND).
- Configure Next.js internationalization (i18n) to support both English (`/en`) and French (`/fr`).

### Design System & Components
- **Vanilla CSS** will be used for all styling to create a premium, bespoke aesthetic (smooth gradients, micro-animations, glassmorphism, etc.).
- We will build the following reusable components:
  - `Navbar`: Modern, sticky navbar with dropdown menus for categories, currency, and language selection. It will include a hamburger menu for mobile responsiveness.
  - `Footer`: Links to policies, social media, and newsletter signup.
  - `ProductCard`: High-quality product display with hover effects and "Add to Cart" functionality.
  - `HeroSection`: Dynamic banner with micro-animations.

#### [NEW] `C:\Users\Ginkgo\.gemini\antigravity-ide\scratch\ginkgotshirts\frontend`
The Next.js project will be initialized here.

#### [NEW] `C:\Users\Ginkgo\.gemini\antigravity-ide\scratch\ginkgotshirts\backend`
The NestJS project will be initialized here.

## Verification Plan

### Automated Tests
- Build both the Next.js and NestJS applications to ensure no TypeScript or build errors.

### Manual Verification
- Run the local development servers for both frontend and backend.
- Verify that the frontend can successfully fetch mock/seeded data from the NestJS backend connected to SQL Server.
- Verify routing, responsiveness, and UI state changes.
