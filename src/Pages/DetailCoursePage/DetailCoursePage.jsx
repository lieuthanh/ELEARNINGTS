import React, { useEffect } from "react";
import "./DetailCourse.scss";
import { https } from "../../service/config";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setCourseDetail,
  setCourseRefer,
  setCourseRelate,
  setIsBuy,
} from "../../redux/courseSlice";
import { FaCertificate } from "react-icons/fa";
import { BiDevices, BiLogoFacebook } from "react-icons/bi";
import {
  AiFillFileText,
  AiFillCode,
  AiOutlineTwitter,
  AiFillYoutube,
  AiFillInstagram,
  AiOutlineEye,
  AiOutlineComment,
} from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { scrollToTop } from "../../service/effect";
import { localServ } from "../../service/localStorageService";
import { setIsFail, setIsSuccess, setModalText } from "../../redux/modalSlice";
import SuccessModal from "../../Components/Modal/SuccessModal/SuccessModal";
import FailModal from "../../Components/Modal/FailModal/FailModal";

export default function DetailCoursePage() {
  const userLogin = localServ.getUser();

  const accessToken = localServ.getAccessToken();

  const { courseDetail, isBuy, courseRelate, courseRefer } = useSelector(
    (state) => state.courseSlice
  );

  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the course details
        const courseDetailResponse = await https.get(
          `/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${id}`
        );
        dispatch(setCourseDetail(courseDetailResponse.data));

        // Get the course related to the course details
        const relatedCoursesResponse = await https.get(
          `/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${courseDetailResponse.data.danhMucKhoaHoc?.maDanhMucKhoahoc}&MaNhom=GP01`
        );
        dispatch(setCourseRelate(relatedCoursesResponse.data));

        //Get the user bought list and check if user have bought this course
        if (accessToken) {
          const userResponse = await https.post(
            "/api/QuanLyNguoiDung/ThongTinTaiKhoan",
            {},
            { headers: { Authorization: "Bearer " + accessToken } }
          );

          const foundBuy = userResponse.data.chiTietKhoaHocGhiDanh.find(
            (course) => course.maKhoaHoc === courseDetailResponse.data.maKhoaHoc
          );

          if (foundBuy) {
            dispatch(setIsBuy(true));
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    //Get the refer courses
    https
      .get("/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01")
      .then((res) => {
        dispatch(setCourseRefer(res.data));
      })
      .catch((err) => {
        console.error(err);
      });

    scrollToTop();

    return () => {
      //Component unmount
      dispatch(setCourseDetail("")); //Reset course details
      dispatch(setCourseRelate([])); //Reset course related
      dispatch(setIsBuy(false)); //Reset buy status
    };
  }, [id, accessToken, dispatch]);

  let renderRelateCourse = () => {
    let filterCourse = courseRelate.filter(
      (course) => course.maKhoaHoc !== courseDetail.maKhoaHoc
    );

    return filterCourse.length ? (
      <div className="detail-related">
        <div className="container">
          <h3 className="text-stone-600 font-semibold text-lg mb-6">
            Khoá học liên quan
          </h3>
          <div className="course-list">
            {filterCourse.slice(0, 4).map((course) => {
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
      </div>
    ) : null;
  };

  let renderReferCourse = () => {
    let filterCourse = courseRefer.filter(
      (course) => course.maKhoaHoc !== courseDetail.maKhoaHoc
    );

    return filterCourse.length ? (
      <div className="detail-refer">
        <div className="container">
          <h3 className="text-stone-600 font-semibold text-lg mb-6">
            Khoá học tham khảo
          </h3>
          <div className="course-list">
            {filterCourse.slice(40, 44).map((course) => {
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
      </div>
    ) : null;
  };

  let handleImgError = (event) => {
    event.target.src = `https://source.unsplash.com/random/300x200?sig=${event.target.alt}`;
  };

  let handleBuyCourse = () => {
    const info = { maKhoaHoc: id, taiKhoan: userLogin.taiKhoan };
    https
      .post("/api/QuanLyKhoaHoc/DangKyKhoaHoc", info, {
        headers: { Authorization: "Bearer " + accessToken },
      })
      .then((res) => {
        dispatch(setIsSuccess(true));
        dispatch(setModalText(res.data));
        dispatch(setIsBuy(true));
      })
      .catch((err) => {
        dispatch(setIsFail(true));
        dispatch(setModalText(err.response.data));
      });
  };

  return (
    <section className="section detail">
      {courseDetail ? (
        <div className="detail-banner">
          <img
            src={courseDetail.hinhAnh}
            alt={courseDetail.maKhoaHoc}
            onError={handleImgError}
            className="detail-banner__img"
          />
        </div>
      ) : null}

      <div className="container">
        <div className="section-header">
          <h2
            className={`section-title ${
              courseDetail ? "section-title--onbg" : "section-title--onwhite"
            }`}
          >
            <span className="section-title__highlight">Chi tiết</span> khóa học
          </h2>
          <p
            className={`section-sub ${
              courseDetail ? "section-sub--onbg" : "section-sub--onwhite"
            }`}
          >
            Tổng quan về khóa học
          </p>
          <div className="section-devider">
            <div className="section-devider__stroke" />
          </div>
        </div>

        {/* couse detail */}
        {courseDetail ? (
          <div className="detail-content">
            <div className="detail-info">
              <h4 className="detail-category">
                {courseDetail.danhMucKhoaHoc?.tenDanhMucKhoaHoc}
              </h4>

              <h3 className="detail-name">{courseDetail.tenKhoaHoc}</h3>

              <div className="detail-overview">
                <div className="flex space-x-2">
                  <img
                    alt="avatar"
                    className="w-10 h-10 bg-stone-100 object-cover object-center flex-shrink-0 rounded-full"
                    src={`https://robohash.org/${Math.random(
                      courseDetail.maKhoaHoc
                    )}.png`}
                  />
                  <div className="flex-grow">
                    <p className="text-stone-600">Giảng viên</p>
                    <p className="text-stone-800 font-medium">Optimus Prime</p>
                  </div>
                </div>
                <span className="ml-3 pl-3 py-2 border-l-2 border-stone-200">
                  <div className="flex">
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-4 h-4 text-amber-400"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-4 h-4 text-amber-400"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-4 h-4 text-amber-400"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-4 h-4 text-amber-400"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-4 h-4 text-amber-400"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <p className="text-stone-600 mt-1">2 Đánh giá</p>
                </span>
              </div>

              <p className="detail-des">
                {courseDetail.moTa?.length > 200
                  ? courseDetail.moTa
                  : `React.js là thư viện JavaScript phổ biến nhất mà bạn có thể sử dụng và tìm hiểu ngày nay để xây dựng giao diện người dùng hiện đại, phản ứng cho web.Khóa học này dạy bạn về React chuyên sâu, từ cơ bản, từng bước đi sâu vào tất cả các kiến ​​thức cơ bản cốt lõi, khám phá rất nhiều ví dụ và cũng giới thiệu cho bạn các khái niệm nâng cao.Bạn sẽ nhận được tất cả lý thuyết, hàng tấn ví dụ và bản trình diễn, bài tập và bài tập cũng như vô số kiến ​​thức quan trọng bị hầu hết các nguồn khác bỏ qua - sau cùng, có một lý do tại sao khóa học này lại rất lớn! Và trong trường hợp bạn thậm chí không biết tại sao bạn lại muốn học React và bạn chỉ ở đây vì một số quảng cáo hoặc "thuật toán" - đừng lo lắng: ReactJS là một công nghệ quan trọng với tư cách là một nhà phát triển web và trong khóa học này, tôi sẽ cũng giải thích TẠI SAO điều đó lại quan trọng!`}
              </p>

              <div className="detail-review">
                <p className="detail-review__title">Nhận xét</p>

                <div className="detail-review__list">
                  <div className="detail-review__item">
                    <div className="flex items-center space-x-2">
                      <img
                        alt="avatar"
                        className="w-10 h-10 bg-stone-100 object-cover object-center flex-shrink-0 rounded-full"
                        src={`https://robohash.org/${Math.random(
                          courseDetail.maKhoaHoc
                        )}.png`}
                      />
                      <div className="flex-grow">
                        <p className="text-stone-900 font-medium">Autobots</p>
                        <p className="flex">
                          <svg
                            fill="currentColor"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            className="w-4 h-4 text-amber-400"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          <svg
                            fill="currentColor"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            className="w-4 h-4 text-amber-400"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          <svg
                            fill="currentColor"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            className="w-4 h-4 text-amber-400"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          <svg
                            fill="currentColor"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            className="w-4 h-4 text-amber-400"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          <svg
                            fill="currentColor"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            className="w-4 h-4 text-amber-400"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        </p>
                      </div>
                    </div>

                    <p className="text-stone-600 text-justify">
                      Tuyệt vời quá ạ, mới được ra mắt cách đây chưa đầy một năm bởi người
                      đồng sáng lập PBT, HP, tích hợp độc quyền nhiều công
                      nghệ mới...không giống ai
                    </p>
                  </div>

                  <div className="detail-review__item">
                    <div className="flex items-center space-x-2">
                      <img
                        alt="avatar"
                        className="w-10 h-10 bg-stone-100 object-cover object-center flex-shrink-0 rounded-full"
                        src={`https://robohash.org/${Math.random(
                          courseDetail.maKhoaHoc
                        )}.png`}
                      />
                      <div className="flex-grow">
                        <p className="text-stone-800 font-medium">
                          Deceptecons
                        </p>
                        <p className="flex">
                          <svg
                            fill="currentColor"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            className="w-4 h-4 text-amber-400"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            className="w-4 h-4 text-amber-400"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            className="w-4 h-4 text-amber-400"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            className="w-4 h-4 text-amber-400"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            className="w-4 h-4 text-amber-400"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        </p>
                      </div>
                    </div>

                    <p className="text-stone-600 text-justify">
                      Cũng bình thường thôi
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="detail-visual">
              <img
                className="detail-img"
                src={courseDetail.hinhAnh}
                alt={courseDetail.maKhoaHoc}
                onError={handleImgError}
              />

              <div className="detail-payment">
                <p className="detail-price">
                  {Math.floor(
                    Math.random() * (999000 - 499000 + 1) + 499000
                  ).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
                <hr />
                {userLogin ? (
                  isBuy ? (
                    <button disabled className="btn btn-default">
                      Bạn đã ghi danh khóa học này
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleBuyCourse();
                      }}
                      className="btn btn-default btn-primary"
                    >
                      Ghi danh khóa học
                    </button>
                  )
                ) : (
                  <NavLink
                    to={"/dang-nhap"}
                    className="btn btn-default btn-primary"
                  >
                    Đăng nhập để ghi danh khóa học
                  </NavLink>
                )}
                <hr />
                <div className="detail-include">
                  <h5 className="detail-include__caption">
                    Khóa học này bao gồm
                  </h5>
                  <div className="detail-include__col">
                    <p className="detail-include__row">
                      <FaCertificate className="detail-include__icon" />
                      <span>Đảm bảo hoàn tiền sớm</span>
                    </p>
                    <p className="detail-include__row">
                      <BiDevices className="detail-include__icon" />
                      <span>Truy cập trên mọi thiết bị</span>
                    </p>
                    <p className="detail-include__row">
                      <AiFillFileText className="detail-include__icon" />
                      <span>Chứng nhận hoàn thành khóa học</span>
                    </p>
                    <p className="detail-include__row">
                      <AiFillCode className="detail-include__icon" />
                      <span>Có đủ kỹ năng để đi làm</span>
                    </p>
                  </div>
                </div>
                <hr />
                <div className="detail-include">
                  <h5 className="detail-include__caption">Chia sẻ khóa học</h5>
                  <div className="detail-include__col">
                    <p className="detail-include__row">
                      <BiLogoFacebook className="w-6 h-6 text-blue-700" />
                      <AiOutlineTwitter className="w-6 h-6 text-blue-400" />
                      <AiFillYoutube className="w-6 h-6 text-red-600" />
                      <AiFillInstagram className="w-6 h-6 text-orange-500" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-lg text-stone-600 mb-4">
            Khóa học đang bị lỗi! Vui lòng tham khảo khóa học khác.
          </p>
        )}
      </div>

      {/* related courses */}
      {renderRelateCourse()}

      {/* refer courses */}
      {renderReferCourse()}

      <SuccessModal />
      <FailModal />
    </section>
  );
}
