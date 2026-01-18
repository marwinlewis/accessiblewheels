# Car Modifiers Locator

An open-source, full-stack web application for discovering and locating car modification shops. Built with modern technologies including [Next.js](https://nextjs.org), TypeScript, Tailwind CSS, and Google Maps integration.

## Overview

Car Modifiers Locator is a community-driven project designed to help car enthusiasts find reputable modification shops in their area. The application features:

- 🗺️ **Interactive Map Integration** - Real-time shop locations powered by Google Maps
- 📱 **Fully Responsive Design** - Seamless experience on mobile, tablet, and desktop
- 🎨 **Atomic Component Architecture** - Maintainable and scalable UI components
- 🔍 **Smart Search Functionality** - Find shops by location and services
- ⭐ **Shop Ratings & Reviews** - Community-driven ratings and feedback
- 📊 **TypeScript** - 100% type-safe codebase for reliability

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 🚀 Quick Start

New to the project? Check out [START_HERE.md](./START_HERE.md) for a 5-minute setup guide.

For comprehensive documentation, see:

- [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - Full project overview
- [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) - Integration guide
- [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) - Quick answers

## 🏗️ Project Structure

This project follows **Atomic Design** principles:

```
src/components/
├── atoms/        - Basic UI elements (Button, Badge, SearchInput, MapMarker)
├── molecules/    - Combined atoms (SearchBar, ShopCard, LocationInfo)
├── organisms/    - Complex components (ShopList, MapView)
└── templates/    - Layout templates (ResultsLayout)
```

## 📋 Contributing

We welcome contributions from the community! Whether you're fixing bugs, adding features, or improving documentation, your help makes this project better.

**Before contributing:**

1. Check existing issues to avoid duplicates
2. Fork the repository
3. Create a feature branch (`git checkout -b feature/your-feature`)
4. Commit your changes (`git commit -am 'Add your feature'`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Submit a Pull Request

## 📄 License

This project is open source and available under the appropriate license. See the LICENSE file for details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
