import React, { useEffect } from "react";
import HeroSection from "./HeroSection/HeroSection";
import Statistic from "./Statistic/Statistic";
import StudySystem from "./StudySystem/StudySystem";
import NewCourse from "./NewCourse/NewCourse";
import { scrollToTop } from "../../service/effect";
import OurTeam from "./OurTeam/OurTeam";

export default function HomePage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <HeroSection />
      <Statistic />
      <NewCourse />
      <StudySystem />
      <OurTeam />
    </>
  );
}
