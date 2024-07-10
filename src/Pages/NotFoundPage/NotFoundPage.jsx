import React from "react";
import { NavLink } from "react-router-dom";
import "./NotFoundPage.css";

export default function NotFoundPage() {
  return (
    <section className="page_404">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1  text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center text-stone-900">404</h1>
              </div>
              <div className="contant_box_404">
                <h3 className="h2 text-slate-900">
                  Có vẻ bạn đang bị lạc đường.
                </h3>
                <p className="text-slate-900">
                  Trang bạn đang tìm hiện không có!
                </p>
                <NavLink to="/" className="btn btn-pill btn-primary inline-block mt-4">
                  Quay về trang chủ
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
