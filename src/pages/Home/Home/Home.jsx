import React from "react";
import Hero from "../Components/Hero";
import Ouraim from "../Components/Ouraim";
import ActionSection from "../Components/ActionSection";
import EventsSection from "../Components/EventsSection";
import { RegForm } from "../Components/RegForm";
import ReviewsSlider from "../Components/ReviewsSlider";
import HelpingToday from "../Components/HelpingToday";
import ContactUs from "../Components/ContactUs";

const Home = () => {
  return (
    <>
      <Hero></Hero>
      <RegForm></RegForm>
      <Ouraim></Ouraim>
      <ActionSection></ActionSection>
      <EventsSection></EventsSection>
      <HelpingToday></HelpingToday>
      <ReviewsSlider></ReviewsSlider>
      <ContactUs></ContactUs>
    </>
  );
};

export default Home;
