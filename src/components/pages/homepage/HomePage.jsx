import React from "react";
import HomeView from "../../Home/Home";
import DesignLogo from "../../Home/DesignLogo";
import NewArrival from "../clothes/NewArrival";
import TopSelling from "../clothes/TopSelling";
import DressStyle from "../clothes/DressStyle";
import HappyCustomer from "../reviews/HappyCustomer";

const HomePage = () => {
  return (
    <div>
      <HomeView />
      <DesignLogo />
      <NewArrival limit={4} />   {/* Show only 4 on homepage */}
      <TopSelling limit={4} />   {/* Show only 4 on homepage */}
      <DressStyle />
      <HappyCustomer />
    </div>
  );
};

export default HomePage;
