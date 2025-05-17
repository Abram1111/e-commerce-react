import React from "react";
import Landing from "../components/landing";
import TopProductsSection from "./productSection";
import ContactUs from "../components/contactUs";

const Home: React.FC = () => {
  return (
    <div>
      <Landing />
      <TopProductsSection />
      <ContactUs />
    </div>
  );
};

export default Home;
