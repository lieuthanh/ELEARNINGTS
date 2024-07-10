import moment from "moment/moment";
import "./Footer.scss";
import React from "react";
import { NavLink } from "react-router-dom";
import { BiLogoFacebook } from "react-icons/bi";
import {
  AiOutlineSend,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { useSelector } from "react-redux";

export default function Footer() {
  const { navigateList, categoryList } = useSelector(
    (state) => state.navigateSlice
  );

  return (
    <footer className="c-footer">
      <div className="container">
        <div className="c-footer__row">
          <div className="c-footer__col">
            <h2 className="c-footer__title">Liên kết trang</h2>
            <ul className="c-footer__nav">
              {navigateList.map((link) => {
                return (
                  <li key={link.id}>
                    <NavLink to={link.href}>{link.title}</NavLink>
                  </li>
                );
              })}
              <li>
                <NavLink to={"/dang-nhap"}>Đăng nhập</NavLink>
              </li>
              <li>
                <NavLink to={"/dang-ky"}>Đăng ký</NavLink>
              </li>
            </ul>
          </div>
          <div className="c-footer__col">
            <h2 className="c-footer__title">Danh mục khóa học</h2>
            <ul className="c-footer__nav">
              {categoryList.map(({ maDanhMuc, tenDanhMuc }) => {
                return (
                  <li key={maDanhMuc}>
                    <NavLink to={`/khoa-hoc/${maDanhMuc}`}>
                      {tenDanhMuc}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="c-footer__col">
            <h2 className="c-footer__title">Đăng ký nhận thông tin</h2>
            <div className="c-footer__subcribe">
              <div className="c-footer__input">
                <input
                  type="text"
                  id="footer-field"
                  name="footer-field"
                  placeholder="Email"
                />
              </div>
              <button className="btn btn-one btn-pill btn-primary">
                <AiOutlineSend />
              </button>
            </div>
            <p className="c-footer__small">
              Không bỏ lỡ các chương trình khuyến mãi hấp dẫn
            </p>
          </div>
        </div>
      </div>
      <div className="c-footer__bottom">
        <div className="container c-footer__branding">
          <div className="c-footer__company">
            <NavLink
              to={"/"}
              className="brand grayscale hover:grayscale-0 transition-all"
            >
              <img
                src="/assets/img/logo.svg"
                alt="brand"
                className="brand-logo"
              />
              <span className="brand-text">PBTC</span>
            </NavLink>

            <p className="c-footer__copyright">
              © {moment().format("yyyy")} — PBT, Inc
            </p>
          </div>
          <span className="c-footer__social">
            <BiLogoFacebook className="w-6 h-6" />
            <AiOutlineTwitter className="w-6 h-6" />
            <AiFillYoutube className="w-6 h-6" />
            <AiFillInstagram className="w-6 h-6" />
          </span>
        </div>
      </div>
    </footer>
  );
}
