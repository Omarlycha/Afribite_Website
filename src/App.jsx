import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import CreateMenu from "./pages/CreateMenu";
import Dashboard from "./pages/Dashboard";
import Advert from "./pages/Advert";
import Layout from "./components/Layout";
import SignInForm from "./pages/Sign-in/SignIn";
import SignUpForm from "./pages/Sign-up/SignUp";
import Homepage from "./pages/Homepage";
import MenuForm from "./pages/MenuForm";
import Notifications from "./pages/Notifications";
import Promotions from "./pages/Promotion";
import Review from "./pages/review/Review";
import MainDish from "./pages/MainDish";
import { Rating } from "./pages/rating/Rating";
import LeaveReview from "./pages/leave_a_review/leave_review";
import Appetizer from "./pages/Appetizer";
import Side from "./pages/SIde";
import Soup from "./pages/Soup";
import Salad from "./pages/Salad";
import Special from "./pages/Special";
import Dessert from "./pages/Dessert";
import Beverage from "./pages/Beverage";
import LandingPage from "./pages/LandingPage";
import UserSignUp from "./pages/UserSignUp";
import EditMenu from "./pages/EditMenu";
import Profile from "./pages/Profile";
import { AuthProvider } from "./context/AuthenticationContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfileContextProvider from "./context/ProfileContext";
import CategoryMenuForm from "./pages/CategoryMenuForm";
import MenuContext from "./context/MenuContext";

function App() {
  return (
    <AuthProvider>
      <ProfileContextProvider>
        <MenuContext>
          <BrowserRouter>
            <Routes>
              <Route path="/home" element={<Homepage />}></Route>
              <Route element={<MainLayout />}>
                <Route path="/" element={<LandingPage />} />
                {/* Other routes that needs the navbar can be nested here if needed */}
              </Route>
              <Route path="/user-sign-up" element={<UserSignUp />} />
              <Route path="/review" element={<Review />}></Route>
              <Route path="/rating" element={<Rating />}></Route>
              <Route path="/leave-a-review" element={<LeaveReview />}></Route>
              <Route
                path="/Adminhome/*"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Routes>
                        <Route
                          path="/Dashboard"
                          element={<Dashboard />}
                        ></Route>
                        <Route path="/Profile" element={<Profile />}></Route>
                        <Route path="/Advert" element={<Advert />}></Route>
                        <Route
                          path="/Promotions"
                          element={<Promotions />}
                        ></Route>
                        <Route
                          path="/CreateMenu"
                          element={<CreateMenu />}
                        ></Route>
                        <Route path="/MenuForm" element={<MenuForm />}></Route>
                        <Route
                          path="/Notifications"
                          element={<Notifications />}
                        ></Route>
                        <Route path="/MainDish" element={<MainDish />}></Route>
                        <Route
                          path="/Appetizer"
                          element={<Appetizer />}
                        ></Route>
                        <Route path="/Side" element={<Side />}></Route>
                        <Route path="/Soup" element={<Soup />}></Route>
                        <Route path="/Salad" element={<Salad />}></Route>
                        <Route path="/Special" element={<Special />}></Route>
                        <Route path="/Beverage" element={<Beverage />}></Route>
                        <Route path="/Dessert" element={<Dessert />}></Route>
                        <Route path="/EditMenu" element={<EditMenu />}></Route>
                        <Route
                          path="/CategoryMenuForm"
                          element={<CategoryMenuForm />}
                        ></Route>
                      </Routes>
                    </Layout>
                  </ProtectedRoute>
                }
              ></Route>

              <Route path="/Sign-up/" element={<SignUpForm />}></Route>
              <Route path="/Sign-in/" element={<SignInForm />}></Route>
            </Routes>
          </BrowserRouter>
        </MenuContext>
      </ProfileContextProvider>
    </AuthProvider>
  );
}

export default App;
