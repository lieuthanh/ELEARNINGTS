import React from "react";
import "./Statistic.scss";
import { FiUsers } from "react-icons/fi";
import { SiCoursera } from "react-icons/si";
import { GiSandsOfTime } from "react-icons/gi";
import { FaGraduationCap } from "react-icons/fa";

export default function Statistic() {
  return (
    <section id="thong-ke" className="section statistic">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            <span className="section-title__highlight">Thành Công</span> Của
            Chúng Tôi
          </h2>
          <p className="section-sub section-sub--onwhite">Thể hiện thông qua Số Liệu Thống Kê</p>
          <div className="section-devider">
            <div className="section-devider__stroke" />
          </div>
        </div>
        <div className="statistic-list">
          <div className="statistic-item">
            <div className="statistic-content">
              <FiUsers className="statistic-icon" />
              <h3 className="statistic-number">8.3K</h3>
              <p className="statistic-caption">Học viên</p>
            </div>
          </div>

          <div className="statistic-item">
            <div className="statistic-content">
              <SiCoursera className="statistic-icon" />
              <h3 className="statistic-number">2.7K</h3>
              <p className="statistic-caption">Khóa học</p>
            </div>
          </div>

          <div className="statistic-item">
            <div className="statistic-content">
              <GiSandsOfTime className="statistic-icon" />
              <h3 className="statistic-number">17.4K</h3>
              <p className="statistic-caption">Giờ học</p>
            </div>
          </div>

          <div className="statistic-item">
            <div className="statistic-content">
              <FaGraduationCap className="statistic-icon" />
              <h3 className="statistic-number">6.6K</h3>
              <p className="statistic-caption">Hoàn thành</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
