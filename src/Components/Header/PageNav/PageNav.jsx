import React from "react";
import { Desktop, Mobile, Tablet } from "../../../responsive/responsive";
import PageNavDesktop from "./PageNavDesktop";
import PageNavTablet from "./PageNavTablet";

export default function PageNav() {
  return (
    <nav className="page">
      <Desktop>
        <PageNavDesktop />
      </Desktop>

      <Tablet>
        <PageNavTablet />
      </Tablet>

      <Mobile>
        <PageNavTablet />
      </Mobile>
    </nav>
  );
}
