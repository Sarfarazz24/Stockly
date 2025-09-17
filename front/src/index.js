import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./landing_page/home/HomePage";
import SignupForm from "./landing_page/signup/SignupForm";
import AboutPage from "./landing_page/about/AboutPage";
import Hero from "./landing_page/products/Hero";
import PricingPage from "./landing_page/pricing/PricingPage";
import SupportTicket from "./landing_page/support/SupportTicket";
import Navbar from "./Navbar";
import LoginForm from "./landing_page/signup/LoginForm";
import Footer from "./Footer";
import NotFound from "./landing_page/NotFound";
import ProductPage from "./landing_page/products/ProductPage";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Navbar /> {/* nav is common in all so I  kept here! */}
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/signup" element={<SignupForm />}></Route>
      <Route path="/about" element={<AboutPage />}></Route>
      <Route path="/product" element={<ProductPage />}></Route>
      <Route path="/pricing" element={<PricingPage />}></Route>
      <Route path="/support" element={<SupportTicket />}></Route>
      <Route path="/login" element={<LoginForm />}></Route>
      <Route path="*" element={<NotFound />}></Route>{" "}
      {/*  i have give star because if the search that does not match with any other search then it displays the not found section*/}
    </Routes>
    <Footer /> {/* Footer is common in all so I  kept here! */}
  </BrowserRouter>
);
