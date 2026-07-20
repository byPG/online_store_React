# Beauty Shop

Beauty Shop is a React e-commerce portfolio project for a cosmetics store.  
The application allows users to browse products, add them to favourites, manage a shopping cart and place orders as either guests or logged-in users.

The project was created to practise React fundamentals, routing, shared state management, form handling, Firebase Authentication and Firestore database operations.

## Live demo

The application is available here:
https://online-store-react-rho.vercel.app/

## Project overview

Beauty Shop simulates a small online store with a complete basic shopping flow:

1. The user can browse products.
2. The user can filter products by category.
3. The user can open a product details page.
4. The user can add products to the cart.
5. The user can add products to favourites.
6. The user can place an order as a guest.
7. The user can register or log in.
8. A logged-in user can place an order connected to their account.
9. A logged-in user can view their order history in the profile page.

## Features

### Home page

The home page contains:

- hero section,
- call-to-action buttons,
- category cards,
- benefits section,
- promotional section.

Category links on the home page redirect users to the product listing page with the selected category already applied.

### Product listing

The product listing page displays products fetched from Firebase Firestore.

Users can:

- browse all products,
- filter products by category,
- add a product directly to the cart,
- add or remove a product from favourites,
- open the product details page.

Product category filtering is also connected with URL search parameters, so links such as `/products?category=Skincare` open the product list with the correct filter selected.

### Product details page

Each product has a dedicated details page with:

- product image gallery,
- product name,
- brand,
- category,
- price,
- size,
- description,
- ingredients,
- usage instructions,
- quantity selector,
- add to cart button,
- favourite button.

The product details page uses a dynamic route based on the product ID.

### Shopping cart

The cart allows users to:

- view products added to the cart,
- increase product quantity,
- decrease product quantity,
- remove products from the cart,
- see the total order value,
- proceed to checkout.

Cart data is stored in `localStorage`, so the cart is preserved after refreshing the page.

### Favourites

Users can save products to favourites and remove them later.

Favourite products are also stored in `localStorage`, so they remain available after page refresh.

### Checkout

The application supports two checkout flows.

#### Guest checkout

Users who are not logged in can place an order as guests.

Guest orders are saved in Firestore, but they are not connected to any user account and do not appear in the profile order history.

#### User checkout

Logged-in users can place orders connected to their Firebase Auth account.

User orders are saved with the user's ID and can later be displayed in the profile page.

### Authentication

The application uses Firebase Authentication.

Users can:

- create an account,
- log in,
- log out.

The registration form includes password validation, including:

- minimum password length,
- uppercase letter requirement,
- number requirement,
- special character requirement,
- password confirmation.

### User profile

Logged-in users can access a profile page.

The profile page displays:

- the currently logged-in email address,
- the user's order history.

Only orders connected with the currently logged-in user are displayed in the profile.

### Order history

Orders are saved in Firestore.

Each user order contains:

- user ID,
- user email,
- customer data,
- ordered products,
- product quantities,
- total number of items,
- total price,
- order status,
- creation date.

Guest orders are saved separately as guest checkout orders.

### Floating scroll button

The project includes a floating scroll button.  
The button appears on scrollable pages and allows users to quickly scroll to the bottom or back to the top of the page.

## Technologies used

- React
- Vite
- JavaScript
- React Router
- Context API
- Firebase Authentication
- Cloud Firestore
- CSS
- localStorage

## Firebase structure

The project uses Firebase for authentication and database storage.

### Firebase Authentication

Firebase Authentication is used for:

- user registration,
- user login,
- user logout,
- tracking the current authenticated user.

### Cloud Firestore

Firestore is used to store:

- product data,
- order data.

Current Firestore collections:

```txt
products
orders
```

### Products collection

The `products` collection stores product information such as:

```txt
id
name
brand
category
price
size
image
images
description
ingredients
howToUse
```

### Orders collection

The `orders` collection stores both guest and user orders.

User order example:

```js
{
  checkoutType: "user",
  userId: "firebase-user-id",
  userEmail: "user@example.com",
  customer: {
    name: "Anna Kowalska",
    email: "user@example.com",
    address: "Example Street 1",
    city: "Kraków",
    postalCode: "30-001"
  },
  items: [],
  totalItems: 2,
  totalPrice: 129.98,
  status: "new",
  createdAt: "server timestamp"
}
```

Guest order example:

```js
{
  checkoutType: "guest",
  userId: null,
  userEmail: "guest@example.com",
  customer: {
    name: "Anna Kowalska",
    email: "guest@example.com",
    address: "Example Street 1",
    city: "Kraków",
    postalCode: "30-001"
  },
  items: [],
  totalItems: 2,
  totalPrice: 129.98,
  status: "new",
  createdAt: "server timestamp"
}
```

## State management

The project uses React Context API for shared application state.

### CartContext

`CartContext` manages:

- cart items,
- adding products to cart,
- removing products from cart,
- increasing quantity,
- decreasing quantity,
- clearing the cart,
- total number of items,
- total price.

Cart data is saved in `localStorage`.

### FavouritesContext

`FavouritesContext` manages:

- favourite products,
- adding products to favourites,
- removing products from favourites,
- total number of favourite items.

Favourite products are saved in `localStorage`.

### AuthContext

`AuthContext` manages:

- current authenticated user,
- authentication loading state,
- user registration,
- user login,
- user logout.

## Routing

The project uses React Router.

Main routes:

```txt
/                 Home page
/products         Product listing page
/products/:id     Product details page
/favourites       Favourites page
/cart             Cart and checkout page
/login            Login page
/register         Register page
/profile          User profile and order history
/thank-you        Order confirmation page
*                 Not found page
```

## Environment variables

Firebase configuration is stored in environment variables.

Create a `.env.local` file in the root directory and add your Firebase config:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

The `.env.local` file should not be committed to GitHub.

The project includes `.env.example` as a template for required environment variables.

## Installation and setup

After cloning the repository, install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

## Project status

The main application logic is implemented.

Completed functionality:

- product listing,
- category filtering,
- product details page,
- cart,
- favourites,
- guest checkout,
- user checkout,
- Firebase Authentication,
- Firestore order saving,
- profile order history,
- floating scroll button.

Current final stage:

- responsive layout improvements,
- CSS cleanup,
- final testing,
- screenshots for portfolio.


## Future improvements

Possible future improvements:

- Google sign-in,
- saved delivery details in user profile,
- admin panel for managing products and orders,
- product search,
- sorting products by price,
- improved image hosting,
- more advanced form validation,
- product carousel on the product details page with recommended or related products,
- order status management.

## Author

Created by Paulina as a React portfolio project.
