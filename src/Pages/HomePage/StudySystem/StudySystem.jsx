import React from "react";
import "./StudySystem.scss";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoAnalyticsOutline } from "react-icons/io5";
import { BsClipboardCheck } from "react-icons/bs";

export default function StudySystem() {
  return (
    <section className="section studysystem">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Hệ Thống <span className="section-title__highlight">Học Tập</span></h2>
          <p className="section-sub section-sub--onwhite">Áp dụng công nghệ tự động hóa</p>
          <div className="section-devider">
            <div className="section-devider__stroke" />
          </div>
        </div>
        <div className="studysystem-list">
          <div className="studysystem-item">
            <div className="studysystem-content">
              <div className="studysystem-label bg-violet-500">
                <GiArtificialIntelligence className="studysystem-icon" />
              </div>
              <div className="studysystem-text">
                <h2 className="studysystem-caption">
                  Trí tuệ nhân tạo
                </h2>
                <p className="studysystem-desc">
                  Tự động chấm điểm trắc nghiệm và đưa câu hỏi tùy theo mức độ nắm bắt kiến thức của
                  học viên
                </p>
              </div>
            </div>
          </div>
          <div className="studysystem-item">
            <div className="studysystem-content">
              <div className="studysystem-label bg-rose-500">
                <IoAnalyticsOutline className="studysystem-icon" />
              </div>
              <div className="studysystem-text">
                <h2 className="studysystem-caption">
                  Phân tích số liệu
                </h2>
                <p className="studysystem-desc">
                  Thống kê lượt xem video, làm bài, điểm số theo chu kỳ, xếp hạng thành viên trong mỗi lớp học
                </p>
              </div>
            </div>
          </div>
          <div className="studysystem-item">
            <div className="studysystem-content">
              <div className="studysystem-label bg-green-500">
                <BsClipboardCheck className="studysystem-icon" />
              </div>
              <div className="studysystem-text">
                <h2 className="studysystem-caption">
                  Hỗ trợ học tập
                </h2>
                <p className="studysystem-desc">
                  Nhắc nhở lịch học, so sánh khả năng học của các học viên cùng level để
                  đưa ra mục tiêu học tập phù hợp
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
