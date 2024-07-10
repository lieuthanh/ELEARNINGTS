import React from "react";
import { Desktop, Mobile, Tablet } from "../../../responsive/responsive";
import SearchNavDesktop from "./SearchNavDesktop";
import SearchNavTablet from "./SearchNavTablet";

export default function SearchNav() {
  return (
    <>
      <Desktop>
        <SearchNavDesktop />
      </Desktop>

      <Tablet>
        <SearchNavTablet />
      </Tablet>
      
      <Mobile>
        <SearchNavTablet />
      </Mobile>
    </>
  );
}
