Bidhaasphia
Bidhaasphia is a full-stack e-commerce platform that allows users to browse, purchase, and manage products, while providing an admin interface for managing orders, users, and products. The application is built using a modern stack of technologies that ensures fast, secure, and scalable operations.

Features
User Dashboard: Allows users to browse products, add to cart, place orders, view order history, and manage their profiles.
Admin Dashboard: Provides admins with a suite of tools to manage users, products, orders, and categories.
Authentication: Secure login, registration, and role-based authentication for both users and admins.
Optimized Images: Fast-loading images via image optimization and CDN integration.
Responsive Design: The frontend is designed with a mobile-first approach, using TailwindCSS for styling.
Technologies
Backend
Node.js: Server-side JavaScript runtime for building scalable applications.
Express: Minimal and flexible Node.js web application framework for creating RESTful APIs.
MongoDB: NoSQL database for storing user data, product information, and orders.
Redis: In-memory data store used for session management and caching.
Joi: Data validation library used for input validation on the backend.
Multer: Middleware for handling multipart/form-data used for uploading images.
jsonwebtoken: Used for secure authentication via JWT tokens.
bcryptjs: Library used to hash passwords securely.
Frontend
React: JavaScript library for building user interfaces.
Next.js: Framework for React, enabling server-side rendering and static site generation.
TailwindCSS: Utility-first CSS framework for creating responsive designs.
Axios: Promise-based HTTP client for making API requests.
NextAuth.js: Authentication library for handling secure login and session management.
NextImage: Optimized image rendering for faster loading.
lucide-react: Icon library used for the frontend UI.
Folder Structure
Backend (bidhaasphia-backend)
api: Contains all the routes and controllers for handling different functionalities such as products, orders, and users.
config: Configuration files for database, Redis, and other environment setups.
controllers: Handles business logic for each API endpoint.
models: Defines the Mongoose models for MongoDB collections such as Users, Orders, Products, etc.
middlewares: Contains middleware for validation, authentication, and error handling.
routes: Defines all the routes for the backend API.
services: Contains business logic and helper functions.
uploads: A directory for storing uploaded files (e.g., product images).
utils: Helper utilities such as image optimization scripts and logging mechanisms.
logs: Directory for storing server logs.
Frontend (bidhaasphia-frontend)
public: Public assets like images, fonts, and icons.
src/app: Contains all pages and routing logic for the application.
components: Reusable UI components like buttons, forms, and modals.
lib: Contains utilities and configurations related to the frontend, such as authentication services.
utils: Utility functions used across the frontend (e.g., API requests and form validation).
pages: Each page of the frontend, including admin pages, user profile, product listings, etc.
styles: Contains CSS files and Tailwind configuration.
Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/your-username/bidhaasphia.git
cd bidhaasphia
Install Backend Dependencies: Navigate to the bidhaasphia-backend directory and run:

bash
Copy
Edit
cd bidhaasphia-backend
npm install
Install Frontend Dependencies: Navigate to the bidhaasphia-frontend directory and run:

bash
Copy
Edit
cd bidhaasphia-frontend
npm install
Environment Variables: Create a .env file in both the frontend and backend directories with the following required variables:

Backend:
MONGODB_URI
REDIS_URI
JWT_SECRET
PORT
Frontend:
NEXTAUTH_URL
NEXTAUTH_SECRET
Start the Development Server:

For the backend:

bash
Copy
Edit
npm run start-dev
For the frontend:

bash
Copy
Edit
npm run dev
Both servers should now be running locally.

API Documentation
All API routes are built as RESTful endpoints, and the backend is designed to be flexible and scalable.

POST /api/auth/login - Login endpoint for users and admins.
POST /api/auth/register - Registration endpoint for users.
GET /api/products - Fetch all products.
GET /api/products/:id - Fetch a single product by ID.
POST /api/products - Admin-only endpoint for creating new products.
GET /api/orders - View all orders (admin only).
POST /api/orders - Create a new order (user only).
Testing
Unit tests and integration tests are written using Jest for both frontend and backend.

Backend Tests:

Located in the tests directory under bidhaasphia-backend.
Run tests with:
bash
Copy
Edit
npm run test
Frontend Tests:

Located in the tests directory under bidhaasphia-frontend.
Run tests with:
bash
Copy
Edit
npm run test
Contributions
Feel free to fork the repository, submit issues, and send pull requests. We welcome contributions to make the platform better.

Fork the repository
Create your branch (git checkout -b feature-branch)
Commit your changes (git commit -m 'Add new feature')
Push to the branch (git push origin feature-branch)
Open a pull request
License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgements
TailwindCSS for fast and responsive design.
MongoDB for NoSQL database management.
Redis for in-memory caching.
Next.js and React for building the frontend.