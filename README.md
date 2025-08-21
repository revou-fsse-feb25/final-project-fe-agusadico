# Ramen President - Restaurant Management System

This is a modern restaurant management system built with Next.js 15.3.4 and React 19. The project provides a complete solution for restaurant operations including menu management, ordering system, and admin dashboard.

## Features

- **Interactive Menu**: Browse and filter menu items by category
- **Product Detail Pages**: View detailed information about each menu item with image gallery
- **Shopping Cart**: Add items to cart with quantity control
- **User Authentication**: Secure login and registration with Next-Auth
- **Admin Dashboard**: Manage products, orders, and customer data
- **Responsive Design**: Optimized for both mobile and desktop experiences
- **PDF Generation**: Create receipts and reports with jsPDF and html2canvas

## Tech Stack

- **Frontend**: Next.js 15.3.4, React 19, TailwindCSS 4
- **Authentication**: Next-Auth, JWT, bcryptjs
- **State Management**: React Context API, SWR for data fetching
- **Form Handling**: React Hook Form
- **PDF Generation**: jsPDF, html2canvas, react-to-print
- **Development**: TypeScript, Turbopack

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/src/app`: Next.js App Router pages and layouts
- `/src/components`: Reusable UI components
- `/src/context`: React Context providers (Cart, Auth)
- `/src/hooks`: Custom React hooks
- `/src/lib`: Utility libraries and authentication
- `/src/types`: TypeScript type definitions
- `/public/images`: Static images and assets

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Next-Auth Documentation](https://next-auth.js.org)

## Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.
