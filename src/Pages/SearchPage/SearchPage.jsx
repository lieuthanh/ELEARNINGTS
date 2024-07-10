import React, { useEffect, useState } from "react";
import "./SearchPage.scss";
import { useParams } from "react-router-dom";
import { https } from "../../service/config";
import { useDispatch, useSelector } from "react-redux";
import { setCourseSearch } from "../../redux/courseSlice";
import { NavLink } from "react-router-dom";
import { AiOutlineComment, AiOutlineEye } from "react-icons/ai";
import { scrollToTop } from "../../service/effect";
import ReactPaginate from "react-paginate";
import { BsChevronLeft, BsChevronRight, BsThreeDots } from "react-icons/bs";

export default function SearchPage() {
  const { search } = useParams();

  const { courseSearch } = useSelector((state) => state.courseSlice);

  const dispatch = useDispatch();

  const [pageNumber, setPageNumber] = useState(0);

  const itemsPerPage = 8;

  useEffect(() => {
    https
      .get(
        `/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${search}&MaNhom=GP01`
      )
      .then((res) => {
        dispatch(setCourseSearch(res.data));
      })
      .catch((err) => {
        dispatch(setCourseSearch(err.response.data));
      });

    scrollToTop();
  }, [search, dispatch]);

  const pageCount = Math.ceil(courseSearch.length / itemsPerPage);

  const coursesOnPage = courseSearch.slice(
    pageNumber * itemsPerPage,
    (pageNumber + 1) * itemsPerPage
  );

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
    scrollToTop();
  };

  let handleImgError = (event) => {
    event.target.src = `https://source.unsplash.com/random/300x200?sig=${event.target.alt}`;
  };

  let renderCourseSearch = () => {
    return (
      <div className="search-result">
        <p className="search-report">Tìm được {courseSearch.length} khóa học</p>
        <div className="course-list">
          {coursesOnPage.map((course) => {
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
          })}
        </div>
      </div>
    );
  };

  return (
    <section className="section search">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Kết quả <span className="section-title__highlight">Tìm kiếm</span>
          </h2>
          <p className="section-sub">Khóa học theo tên</p>
          <div className="section-devider">
            <div className="section-devider__stroke" />
          </div>
        </div>

        {/* search results */}
        {courseSearch === "Không tìm thấy khóa học!" ? (
          <p className="search-report">{courseSearch}</p>
        ) : (
          renderCourseSearch()
        )}

        {/* pagination */}
        {courseSearch !== "Không tìm thấy khóa học!" && pageCount > 1 && (
          <ReactPaginate
            previousLabel={<BsChevronLeft />}
            nextLabel={<BsChevronRight />}
            breakLabel={<BsThreeDots />}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"section-action courses-pagination"}
            previousLinkClassName={"btn-one btn-default flex"}
            nextLinkClassName={"btn-one btn-default flex"}
            pageLinkClassName={"btn-one btn-default"}
            breakLinkClassName={"btn-one btn-default"}
            activeLinkClassName={"btn-primary"}
          />
        )}
      </div>
    </section>
  );
}
