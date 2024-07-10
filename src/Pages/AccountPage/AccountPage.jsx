import { message } from "antd";
import React, { useEffect, useState } from "react";
import "./AccountPage.scss";
import { https } from "../../service/config";
import { FiArrowUpRight } from "react-icons/fi";
import { BsReverseBackspaceReverse } from "react-icons/bs";
import { localServ } from "../../service/localStorageService";
import { NavLink } from "react-router-dom";
import { scrollToTop } from "../../service/effect";
import SuccessModal from "../../Components/Modal/SuccessModal/SuccessModal";
import { useDispatch } from "react-redux";
import { setIsSuccess, setModalText } from "../../redux/modalSlice";
import { AiOutlineSearch } from "react-icons/ai";

export default function AccountPage() {
  if (!localServ.getUser()) {
    window.location.href = "/dang-nhap";
  }

  const [accountInfo, setAccountInfo] = useState({
    email: "",
    hoTen: "",
    maLoaiNguoiDung: "",
    maNhom: "",
    matKhau: "",
    soDT: "",
    taiKhoan: "",
    chiTietKhoaHocGhiDanh: "",
  });

  const accessToken = localServ.getAccessToken();

  const [searchText, setSearchText] = useState("");

  const [sortedCourse, setSortedCourse] = useState([
    ...accountInfo.chiTietKhoaHocGhiDanh,
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    https
      .post(
        "/api/QuanLyNguoiDung/ThongTinTaiKhoan",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        setAccountInfo((preAccountInfo) => {
          return Object.assign({}, preAccountInfo, res.data);
        });

        setSortedCourse(res.data.chiTietKhoaHocGhiDanh);
      })
      .catch((err) => {
        console.log(err);
      });

    scrollToTop();
  }, []);

  let handleSubmit = (event) => {
    event.preventDefault();

    https
      .put("/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung", accountInfo, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        message.success("Cập nhật thành công");

        localServ.setUser(res.data);

        window.location.reload();
      })
      .catch((err) => {
        message.err("Chưa cập nhật thành công");
        console.log(err);
      });
  };

  let handleImgError = (event) => {
    event.target.src = `https://source.unsplash.com/random/300x200?sig=${event.target.alt}`;
  };

  let handleCancelCourse = (courseId) => {
    const info = {
      maKhoaHoc: courseId,
      taiKhoan: accountInfo.taiKhoan,
    };

    https
      .post("/api/QuanLyKhoaHoc/HuyGhiDanh", info, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        dispatch(setIsSuccess(true));

        dispatch(setModalText(res.data));

        https
          .post(
            "/api/QuanLyNguoiDung/ThongTinTaiKhoan",
            {},
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((res) => {
            setAccountInfo((preAccountInfo) => {
              return Object.assign({}, preAccountInfo, res.data);
            });

            setSortedCourse(res.data.chiTietKhoaHocGhiDanh);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let renderCourseList = () => {
    return sortedCourse.map((course) => {
      return (
        <div key={course.maKhoaHoc} className="p-account__course">
          <div className="p-account__wrapper">
            <div className="p-account__img">
              <img
                src={course.hinhAnh}
                alt={course.maKhoaHoc}
                onError={handleImgError}
              />
            </div>
            <div className="p-account__detail">
              <h3 className="p-account__title">{course.tenKhoaHoc}</h3>
              <div className="p-account__action">
                <NavLink
                  to={`/chi-tiet-khoa-hoc/${course.maKhoaHoc}/${course.biDanh}`}
                  className="p-account__btn"
                >
                  <span>Xem chi tiết</span>
                  <FiArrowUpRight />
                </NavLink>

                <button
                  onClick={() => handleCancelCourse(course.maKhoaHoc)}
                  className="p-account__btn p-account__btn--cancel"
                >
                  <span>Hủy ghi danh</span>
                  <BsReverseBackspaceReverse />
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchText(value);

    const filteredCourse = accountInfo.chiTietKhoaHocGhiDanh.filter((product) =>
      product.tenKhoaHoc.toLowerCase().includes(value.toLowerCase())
    );
    setSortedCourse(filteredCourse);
  };

  return (
    <section className="section p-account">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Thông tin{" "}
            <span className="section-title__highlight">Tài khoản</span>
          </h2>
          <p className="section-sub">Quản lý khóa học đã ghi danh</p>
          <div className="section-devider">
            <div className="section-devider__stroke" />
          </div>
        </div>

        <div className="p-account__row">
          <div className="p-account__col">
            <div className="p-member__form p-account__form">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center">
                  <img
                    src={`https://ui-avatars.com/api/?background=random&name=${accountInfo.hoTen}`}
                    alt={accountInfo.hoTen}
                    className="p-member__avatar"
                  />
                  <h3 className="text-lg font-medium text-stone-800 mt-2">
                    {accountInfo.taiKhoan}
                  </h3>
                </div>
                <div className="p-account__form--row hidden">
                  <label htmlFor="taiKhoan" className="p-member__label">
                    Tài khoản
                  </label>
                  <input
                    value={accountInfo.taiKhoan}
                    type="text"
                    id="taiKhoan"
                    className="p-member__input cursor-not-allowed"
                    required
                    disabled
                  />
                </div>
                <div className="p-account__form--row">
                  <label htmlFor="matKhau" className="p-member__label">
                    Mật khẩu
                  </label>
                  <input
                    value={accountInfo.matKhau}
                    onChange={(e) =>
                      setAccountInfo((prevState) => ({
                        ...prevState,
                        matKhau: e.target.value,
                      }))
                    }
                    type="password"
                    id="matKhau"
                    className="p-member__input"
                    required
                  />
                </div>
                <div className="p-account__form--row">
                  <label htmlFor="hoTen" className="p-member__label">
                    Họ tên
                  </label>
                  <input
                    value={accountInfo.hoTen}
                    onChange={(e) =>
                      setAccountInfo((prevState) => ({
                        ...prevState,
                        hoTen: e.target.value,
                      }))
                    }
                    type="text"
                    id="hoTen"
                    className="p-member__input"
                    placeholder="Vd: PBT Course"
                    required
                  />
                </div>
                <div className="p-account__form--row">
                  <label htmlFor="email" className="p-member__label">
                    Email
                  </label>
                  <input
                    value={accountInfo.email}
                    onChange={(e) =>
                      setAccountInfo((prevState) => ({
                        ...prevState,
                        email: e.target.value,
                      }))
                    }
                    type="email"
                    id="email"
                    className="p-member__input"
                    placeholder="Vd: email@pbtc.com"
                    required
                  />
                </div>
                <div className="p-account__form--row">
                  <label htmlFor="soDT" className="p-member__label">
                    Số điện thoại
                  </label>
                  <input
                    value={accountInfo.soDT}
                    onChange={(e) =>
                      setAccountInfo((prevState) => ({
                        ...prevState,
                        soDT: e.target.value,
                      }))
                    }
                    type="text"
                    id="soDT"
                    className="p-member__input"
                    placeholder="Ví dụ: 01234567"
                    required
                  />
                </div>
                <div className="p-member__action">
                  <button
                    type="submit"
                    className="btn btn-pill btn-primary p-member__btn"
                  >
                    Cập nhật
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="p-account__col">
            <div className="p-account__buy">
              <div className="p-account__head">
                <h3 className="p-account__subject">Khóa học đã tham gia</h3>
                <div className="p-account__search">
                  <AiOutlineSearch className="p-account__icon" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm khóa học"
                    value={searchText}
                    onChange={handleSearch}
                    className="p-account__input"
                  />
                </div>
              </div>
              <div className="p-account__courses">
                {sortedCourse.length ? (
                  renderCourseList()
                ) : (
                  <p className="p-account__alert">Không tìm thấy khóa học</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <SuccessModal />
    </section>
  );
}
