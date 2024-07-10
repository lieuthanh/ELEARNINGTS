import React from "react";
import "./Header.scss";
import { Desktop, Mobile, Tablet } from "../../responsive/responsive";
import HeaderDesktop from "./HeaderDesktop";
import HeaderTablet from "./HeaderTablet";

export default function Header() {
  return (
    <>
      <Desktop>
        <HeaderDesktop />
      </Desktop>
      <Tablet>
        <HeaderTablet />
      </Tablet>
      <Mobile>
        <HeaderTablet />
      </Mobile>
    </>
  );
}
