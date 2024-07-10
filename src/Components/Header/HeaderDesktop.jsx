import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import PageNav from "./PageNav/PageNav";
import UserNav from "./UserNav/UserNav";
import "./Header.scss";
import SearchNav from "./SearchNav/SearchNav";

export default function HeaderDesktop() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);

    window.removeEventListener("scroll", onScroll);

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header ${offset > 0 ? "header-scroll" : ""}`}>
      <div className="container header-content">
        <NavLink to={"/"} className="brand">
          <img src="/assets/img/logo.svg" alt="PBTC" className="brand-logo" />
          <span className="brand-text">PBTC</span>
        </NavLink>

        <PageNav />

        <div className="header-hyper">
          <SearchNav />

          <UserNav />
        </div>
      </div>
    </header>
  );
}
