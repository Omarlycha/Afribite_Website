# Afribite

Afribite is an innovative food delivery platform that focuses on promoting African cuisine by connecting local restaurants to customers. The platform offers users a seamless experience for ordering food online, tracking deliveries, and accessing special offers from restaurants.

## Table of Contents

- [Afribite](#afribite)
  - [Table of Contents](#table-of-contents)
    - [Technologies Used](#technologies-used)
    - [Features](#features)
    - [Contributions](#contributions)
    - [Contributors](#contributors)
    - [Links](#links)

## Technologies Used

- Frontend: React.js, Tailwind CSS
- Authentication: Firebase
- Database: Firebase Firestore
- Deployment: Vercel (Frontend)

## Features

- User Registration and Login (Food lovers and Restaurant owners)
- Search for Restaurants by Location
- Search for Restaurants by dishes
- Menu Management
- Notifications
- Place Food Orders Online
- Payment integration for orders
- Leave a Restaurant Review
- View Restaurant Reviews
- Restaurant promotions
- Advertise restaurant on Afribite
- Featured restaurant listings

## Contributions

## Team 1 Contribution

### Rhoda Ojetola

- Created a responsive NavBar component
- Created Landing Page
- Created a responsive Hero component
- created the layouts folder
- added the hero component to the Landing Page
- created main layout file
- added the mainlayout and the landing page to App.jsx

## Team 2 Contribution

### Omowunmi Balikis Kamiludeen

- Changed the browser tab icon to the Afribite logo (to give the browser a unique).
- Created a dynamic button.
- Added a mobile first Create Menu page for restaurant owners to add new/available dishes to their menu (On click on the Create Menu button, it will take user to a page where Restaurant owner can upload available dishes by category).
- Created a mobile first menu form for creating restaurant menu items.
- Created Menu component to display the menu items.
- Created a mobile first Main Course page for restaurant owners to display the menu items that will be saved in the firestore database.
- Added a mobile first Appetizer page for restaurant owners to display the appetizer menu items that will be saved in the firestore database.
- Added a mobile first Dessert page for restaurant owners to display the dessert menu items that will be saved in the firestore database.
- Added a mobile first Side menu page for restaurant owners to display the side menu items that will be saved in the firestore database.
- Added a mobile first Soup menu page for restaurant owners to display the Soup menu items that will be saved in the firestore database.
- Added a mobile first Salad menu page for restaurant owners to display the Salad menu items that will be saved in the firestore database.
- Added a mobile first Beverage menu page for restaurant owners to display the Beverage menu items that will be saved in the firestore database.
- Added a mobile first Special menu page for restaurant owners to display the Special menu items that will be saved in the firestore database.
- Implemented menu data and image upload to Firebase storage.
- Re-added the custom tailwind css rules to index.css.
- Added structure to store menu items under user-specific categories. This improves the overall user experience and ensures data integrity.
- Added a mobile first edit page to encourage users to edit the menu items whenever they want to make changes to the menu.
- Fetched Menu items from fireStore and added them to their category pages.
- Added loading to save button and menu pages.
- installed and used toastify to display success and error messages.
- Update menu navigation to handle menu navigation state (This way existing users will be directed to the main dish page while new users will be directed to the create menu page).
- Created menu edit page to enable users make changes or edit to their menu items and save updated menu to firestore.
- Added delete popup diagram to edit menu page, to enable users to delete menu items
- connect landing Page to admin page (if user exist they are directed to the admin dashboard, else they are directed to the signup page)
- handle admin logout (to log out admin user from admin dashboard)
- Created menu context to get all menu data created by a authenticated user.
- Added menu context to dashboard to generate admin total available dish.

### Magali Lapu

- Built orders notifications system for Afribite.
- Created tab filtering for order notifications
- Created order notification tile components
- Created order details popup component
- Created order search component
- Integrated firebase data

## Team 5 Contribution

### Ndukuba Nneoma Chidinma

- Created the Admin side bar and added the routes to the pages on it
- Intstalled React icons and added icons to the admin side bar
- Created Layout component
- Created banner component to be used on the dashboard, advert and promotion pages
- Created the Advert page
- Created Dashboard page
- Changed the alt text for the image tag in the banner component
- Created nav Context
- made side bar respnosive
- made dasboard and advert page responsive
- Created a profile page which included a display of resturant owners details and a form to edit details
- created a profiledisplay component that displays user details on the dashboard and on profile page
- Created a admin nav bar which displayed the hamburger menu on smaller screens and profile icon on every screen
- Added Rechart to the project to display data graphically on the dashboard
- Added react toastify for alert popups on advert page and changed the color of the success alert to the webpages primary color
- created ProtectedRoute component which restricts some pages unless a user is logged in
- Added an onclick function to the logout button to implement logout function
- Corrected the path on the signup and sign in page to direct users to the dashboard
- Added function to submit ad to firebase and also display previous created ads
- Created profile Context which makes user profile accessible throughout the app
- Added function to fetch and edit user Profile on profile page from firebase
- Created CustomerChart, PointChart and ViewerChart component to display data graphically
- Added date range to the choicedate component for choosing date
- Created progress bar for adss and promotion on dashboard

### Ogwo Ijeoma Precious Chidinma

- Created the sign in , sign up pages for the restaurant owners
- Installed React icons and added icons to the Form
- Created the Promotion page
- added firebase authentification logic
- added storage for promotion page
  -added the profile structure and displayed it on the dashboard

## Contributors

- [Omowunmi Balikis Kamiludeen] - Frontend Developer
- [Ndukuba Nneoma Chidinma] - Frontend Developer
- [Ogwo Ijeoma Precious Chidinma] - Frontend Developer
- [Magali Lapu] - Frontend Developer
- [Rhoda Ojetola] - Frontend Developer
- Chioma Chiekwe - Frontend Developer

## Links

- [Link to hosted page:](https://afribite.vercel.app/)
