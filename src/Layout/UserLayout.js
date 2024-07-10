import React from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import Spinner from "../Components/Spinner/Spinner";
import ScrollTopBtn from "../Components/ScrollTopBtn/ScrollTopBtn";

export default function Layout({ contentPage }) {
  return (
    <>
      <Spinner />
      <Header />
      {contentPage}
      <Footer />
      <ScrollTopBtn />
    </>
  );
}
