# Bidhaasphia - Full-Stack E-Commerce Platform

Bidhaasphia is a full-stack e-commerce platform that allows users to browse, purchase, and manage products, while providing an admin interface for managing orders, users, and products. The application is built using a modern stack of technologies that ensures fast, secure, and scalable operations.

## Features

### User Dashboard
- Browse products, add to cart, place orders, view order history, and manage profiles.

### Admin Dashboard
- Manage users, products, orders, and categories.

### Authentication
- Secure login, registration, and role-based authentication for both users and admins.

### Optimized Images
- Fast-loading images via image optimization and CDN integration.

### Responsive Design
- Frontend designed with a mobile-first approach using TailwindCSS.

## Technologies

### Backend
- **Node.js**: Server-side JavaScript runtime for building scalable applications.
- **Express**: Minimal and flexible Node.js web application framework for creating RESTful APIs.
- **MongoDB**: NoSQL database for storing user data, product information, and orders.
- **Redis**: In-memory data store used for session management and caching.
- **Joi**: Data validation library for input validation on the backend.
- **Multer**: Middleware for handling multipart/form-data used for uploading images.
- **jsonwebtoken**: Used for secure authentication via JWT tokens.
- **bcryptjs**: Library used to hash passwords securely.

### Frontend
- **React**: JavaScript library for building user interfaces.
- **Next.js**: Framework for React, enabling server-side rendering and static site generation.
- **TailwindCSS**: Utility-first CSS framework for creating responsive designs.
- **Axios**: Promise-based HTTP client for making API requests.
- **NextAuth.js**: Authentication library for handling secure login and session management.
- **NextImage**: Optimized image rendering for faster loading.
- **lucide-react**: Icon library used for the frontend UI.

## Folder Structure
bidhaasphia-backend
├── api/          # Routes and controllers for different functionalities (products, orders, users)
├── config/       # Environment setup files (database, Redis, etc.)
├── controllers/  # Handles business logic for each API endpoint
├── models/       # Mongoose models (Users, Orders, Products, etc.)
├── middlewares/  # Validation, authentication, and error-handling middleware
├── routes/       # All API route definitions
├── services/     # Helper functions and business logic
├── uploads/      # Directory for storing uploaded files (images, etc.)
├── utils/        # Helper utilities (image optimization, logging)
├── logs/         # Server logs directory

bidhaasphia-frontend
├── public/       # Static assets like images, fonts, and icons
├── src/app/      # Pages and routing logic
├── components/   # Reusable UI components (buttons, forms, modals)
├── lib/          # Frontend utilities and configurations (authentication services)
├── utils/        # Utility functions (API requests, form validation)
├── pages/        # All pages including admin, user profile, product listings
├── styles/       # TailwindCSS configuration and styling

### Backend (`bidhaasphia-backend`)
api/ # Contains all the routes and controllers for handling different functionalities config/ # Configuration files for database, Redis, etc. controllers/ # Business logic for each API endpoint models/ # Mongoose models for MongoDB collections (Users, Orders, Products, etc.) middlewares/ # Validation, authentication, and error handling routes/ # Routes for the backend API services/ # Business logic and helper functions uploads/ # Directory for storing uploaded files (e.g., product images) utils/ # Helper utilities such as image optimization scripts and logging mechanisms logs/ # Directory for storing server logs


### Frontend (`bidhaasphia-frontend`)
public/ # Public assets like images, fonts, and icons src/app/ # Contains all pages and routing logic components/ # Reusable UI components like buttons, forms, and modals lib/ # Utilities and configurations related to frontend, such as authentication services utils/ # Utility functions used across the frontend pages/ # Pages for the frontend, including admin pages, user profiles, product listings styles/ # CSS files and Tailwind configuration


## Installation

1. Clone the repository:
   git clone https://github.com/your-username/bidhaasphia.git
   cd bidhaasphia
