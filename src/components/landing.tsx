import React from "react";
import { Link } from "react-router-dom";
import landingImage from "../assets/images/land.jpeg";

/**
 * Landing Component
 *
 * Displays the landing page with a full-screen background image,
 * a welcoming message, and a button linking to the products page.
 *
 * Features:
 * - Full viewport height background image with cover fit
 * - Positioned welcome text and "Shop Now" button overlay on the left center
 * - Uses React Router's Link for client-side navigation
 *
 * @component
 * @returns JSX.Element
 */
const Landing: React.FC = () => {
  return (
    <div className="container-fluid p-0">
      <div className="position-relative">
        <img
          src={landingImage}
          alt="Landing"
          className="img-fluid w-100"
          style={{ height: "100vh", objectFit: "cover" }}
        />
        <div className="position-absolute top-50 start-0 translate-middle-y p-4 text-white">
          <h1>Welcome to Tech Store</h1>
          <Link to="/products" className="btn grad-color text-white">
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
