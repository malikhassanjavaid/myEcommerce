# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NovaCart is a Next.js 15 e-commerce application built with TypeScript, Tailwind CSS, and Stripe integration. The project uses the App Router with React Server Components and includes shopping cart functionality with persistent state management.

## Development Commands

```bash
# Start development server with Turbopack
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## Architecture

### Core Technologies
- **Next.js 15** with App Router and React Server Components
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **Shadcn/ui** components with New York style
- **Zustand** for cart state management with persistence
- **Stripe** for payment processing

### Project Structure

```
app/
├── layout.tsx          # Root layout with Navbar/Footer
├── page.tsx            # Homepage with hero and product carousel
├── products/
│   ├── page.tsx        # Products listing page
│   └── [id]/page.tsx   # Individual product page
└── checkout/page.tsx   # Checkout page

components/
├── ui/                 # Shadcn/ui components (button, card, input)
├── Navbar.tsx          # Navigation component
├── Footer.tsx          # Footer component
├── Hero.tsx            # Hero section component
├── Carousel.tsx        # Product carousel component
├── ProductCard.tsx     # Individual product card
├── ProductDetails.tsx  # Product details view
└── ProductsList.tsx    # Products grid component

store/
└── cart-store.ts       # Zustand cart state with persistence

lib/
├── stripe.ts           # Stripe client configuration
└── utils.ts            # Utility functions (cn helper)
```

### State Management
- **Cart Store**: Uses Zustand with persistence middleware to maintain cart state across sessions
- **Cart Operations**: addItem, removeItem, clearItem, clearCart with quantity management
- **Data Persistence**: Cart data persists in localStorage

### Stripe Integration
- Products fetched from Stripe API in server components
- Stripe client configured with secret key from environment variables
- Image domains configured for Stripe CDN (`files.stripe.com`)

### UI Components
- Built with Shadcn/ui using the New York style variant
- Tailwind CSS v4 with CSS variables enabled
- Responsive design with dark mode support
- Class variance authority for component variants

### Key Features
- Server-side product fetching from Stripe
- Persistent shopping cart with quantity management
- Responsive design with hero section and product carousel
- Type-safe throughout with TypeScript
- Optimized fonts (Geist Sans/Mono)

### Environment Variables Required
- `STRIPE_SECRET_KEY`: Stripe API secret key for server-side operations