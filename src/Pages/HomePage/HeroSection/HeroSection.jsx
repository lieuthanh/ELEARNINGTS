import React from "react";
import "./HeroSection.scss";
import { AiOutlineBarChart } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { IoIosNotifications } from "react-icons/io";
import { HashLink } from "react-router-hash-link";
import { NavLink } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="container hero-wrapper">
        <div className="hero-content">
          <h1 className="hero-content__headline">
            Chinh phục thế giới mã nguồn mở <br />
            với các{" "}
            <span className="hero-content__headline--highlight">
              Khóa học lập trình
            </span>{" "}
            <br />
            chất lượng cao
          </h1>

          <p className="hero-content__desc">
            PBTC là nền tảng học lập trình trực tuyến hàng đầu, <br />
            cung cấp những khóa học thú vị và cập nhật <br />
            với xu hướng công nghệ mới nhất
          </p>

          <div className="hero-content__action">
            <NavLink to={"/khoa-hoc/tat-ca-khoa-hoc"} className="btn btn-pill btn-primary">Tham gia ngay</NavLink>
            <HashLink smooth to={"/#thong-ke"} className="btn btn-pill btn-secondary">Tìm hiểu thêm</HashLink>
          </div>
        </div>
        <div className="hero-decor">
          <div className="hero-decor__item">
            <span className="hero-decor__label bg-rose-500">
              <AiOutlineBarChart className="hero-decor__icon" />
            </span>
            <div className="hero-decor__text hero-decor__text--hidden">
              <p>Tiến độ học tập tuần này</p>
              <p>Tăng 20% so với tuần trước</p>
            </div>
          </div>

          <div className="hero-decor__item">
            <span className="hero-decor__label bg-green-500">
              <HiOutlineEnvelope className="hero-decor__icon" />
            </span>
            <div className="hero-decor__text">
              <p>Xin chúc mừng!</p>
              <p>Bạn đã đạt Hạng 1</p>
            </div>
          </div>

          <div className="hero-decor__item">
            <span className="hero-decor__label bg-violet-500">
              <BiCalendar className="hero-decor__icon" />
            </span>
            <div className="hero-decor__text">
              <p>Lớp học Lập Trình Front-end</p>
              <p>Hôm nay lúc 14:00 giờ chiều</p>
            </div>
          </div>

          <div className="hero-decor__item">
            <span className="hero-decor__label bg-yellow-500">
              <IoIosNotifications className="hero-decor__icon" />
            </span>
            <div className="hero-decor__text">
              <p>Thông báo</p>
              <p>Video xem lại của buổi 1 đã sẵn sàng</p>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-bg"></div>
    </section>
  );
}
