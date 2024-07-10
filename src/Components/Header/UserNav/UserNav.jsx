import React from "react";
import { Desktop, Mobile, Tablet } from "../../../responsive/responsive";
import UserNavDesktop from "./UserNavDesktop";
import UserNavTablet from "./UserNavTablet";

export default function UserNav() {
  return (
    <nav className="user">
      <Desktop>
        <UserNavDesktop />
      </Desktop>

      <Tablet>
        <UserNavTablet />
      </Tablet>

      <Mobile>
        <UserNavTablet />
      </Mobile>
    </nav>
  );
}
