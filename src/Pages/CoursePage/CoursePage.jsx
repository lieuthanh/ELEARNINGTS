import React, { useEffect, useState } from "react";
import "./CoursePage.scss";
import { useDispatch, useSelector } from "react-redux";
import { https } from "../../service/config";
import { setCourseList } from "../../redux/courseSlice";
import { NavLink, useParams } from "react-router-dom";
import { AiOutlineComment, AiOutlineEye } from "react-icons/ai";
import { scrollToTop } from "../../service/effect";
import ReactPaginate from "react-paginate";
import { BsChevronLeft, BsChevronRight, BsThreeDots } from "react-icons/bs";

export default function CoursePage() {
  const { courseList } = useSelector((state) => state.courseSlice);

  const { categoryList } = useSelector((state) => state.navigateSlice);

  const [currentPage, setCurrentPage] = useState(0);
  const [initialPage, setInitialPage] = useState(0);

  const itemsPerPage = 8;

  const pageCount = Math.ceil(courseList.length / itemsPerPage);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
    scrollToTop();
  };

  const { id } = useParams();

  const apiUrl =
    id === "tat-ca-khoa-hoc"
      ? "/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01"
      : `/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${id}&MaNhom=GP01`;

  const dispatch = useDispatch();

  useEffect(() => {
    https
      .get(apiUrl)
      .then((res) => {
        dispatch(setCourseList(res.data));
      })
      .catch((err) => {
        console.log(err);
      });

    setInitialPage(0);
    setCurrentPage(0);
    scrollToTop();
  }, [id, dispatch]);

  let renderCategoryList = () => {
    return categoryList.map((category) => {
      return (
        <NavLink
          to={`/khoa-hoc/${category.maDanhMuc}`}
          key={category.maDanhMuc}
          className={`courses-category ${
            id == category.maDanhMuc ? "courses-category--active" : ""
          }`}
        >
          {category.tenDanhMuc}
        </NavLink>
      );
    });
  };

  let handleImgError = (event) => {
    event.target.src = `https://source.unsplash.com/random/300x200?sig=${event.target.alt}`;
  };

  let renderCourseList = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const coursesToDisplay = courseList.slice(startIndex, endIndex);

    return coursesToDisplay?.map((course) => {
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
    <section className="section courses">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Danh sách <span className="section-title__highlight">Khóa học</span>
          </h2>
          <p className="section-sub">Khóa học theo danh mục</p>
          <div className="section-devider">
            <div className="section-devider__stroke" />
          </div>
        </div>

        <div className="courses-categories">
          <NavLink
            to={"/khoa-hoc/tat-ca-khoa-hoc"}
            className={`courses-category ${
              id == "tat-ca-khoa-hoc" ? "courses-category--active" : ""
            }`}
          >
            Tất cả khóa học
          </NavLink>
          {renderCategoryList()}
        </div>

        {/* courses list */}
        <div className="course-list">{renderCourseList()}</div>

        {/* pagination here */}
        {pageCount > 1 ? (
          <ReactPaginate
            initialPage={initialPage}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            previousLabel={<BsChevronLeft />}
            nextLabel={<BsChevronRight />}
            breakLabel={<BsThreeDots />}
            containerClassName={"section-action courses-pagination"}
            previousLinkClassName={"btn-one btn-default flex"}
            nextLinkClassName={"btn-one btn-default flex"}
            pageLinkClassName={"btn-one btn-default"}
            breakLinkClassName={"btn-one btn-default flex"}
            activeLinkClassName={"btn-primary"}
          />
        ) : null}
      </div>
    </section>
  );
}
