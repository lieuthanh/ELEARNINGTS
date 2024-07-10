import React, { useEffect } from "react";
import "./NewCourse.scss"
import { useDispatch, useSelector } from "react-redux";
import { https } from "../../../service/config";
import { setCourseList } from "../../../redux/courseSlice";
import { NavLink } from "react-router-dom";
import { AiOutlineEye, AiOutlineComment } from "react-icons/ai";

export default function NewCourse() {
  const { courseList } = useSelector((state) => state.courseSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    https
      .get("/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01")
      .then((res) => {
        dispatch(setCourseList(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  let handleImgError = (event) => {
    event.target.src = `https://source.unsplash.com/random/300x200?sig=${event.target.alt}`;
  };

  let renderCourseList = () => {
    return courseList.slice(0, 8).map((course) => {
      return (
        <NavLink
          key={course.maKhoaHoc}
          to={`/chi-tiet-khoa-hoc/${course.maKhoaHoc}/${course.biDanh}`}
        >
          <div className="course-item">
            <img
              className="course-img"
              src={course.hinhAnh}
              onError={handleImgError}
              alt={course.maKhoaHoc}
            />
            <div className="course-content">
              <div className="course-info">
                <p className="course-sub">
                  {course.danhMucKhoaHoc.tenDanhMucKhoaHoc}
                </p>
                <h3 className="course-title">
                  {course.tenKhoaHoc.length > 40
                    ? course.tenKhoaHoc.substring(0, 40) + "..."
                    : course.tenKhoaHoc}
                </h3>
              </div>
              <div className="course-detail">
                <span className="course-price">
                  {Math.floor(
                    Math.random() * (999000 - 499000 + 1) + 499000
                  ).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>

                <span className="course-view">
                  <AiOutlineEye className="course-icon" />
                  {course.luotXem}
                </span>

                <span className="course-comment">
                  <AiOutlineComment className="course-icon" />
                  {Math.floor(Math.random() * 100) + 1}
                </span>
              </div>
            </div>
          </div>
        </NavLink>
      );
    });
  };

  return (
    <section id="moi-nhat" className="section c-newest">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Khóa học <span className="section-title__highlight">Mới nhất</span>
          </h2>
          <p className="section-sub section-sub--onwhite">
            Hãy chọn khóa học phù hợp
          </p>
          <div className="section-devider">
            <div className="section-devider__stroke" />
          </div>
        </div>

        {/* courses list */}
        <div className="course-list">{renderCourseList()}</div>

        <div className="section-action">
          <NavLink
            to={"/khoa-hoc/tat-ca-khoa-hoc"}
            className="btn btn-pill btn-accent"
          >
            Khám phá thêm
          </NavLink>
        </div>
      </div>
    </section>
  );
}
