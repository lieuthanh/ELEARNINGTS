import React, { useEffect } from "react";
import { Form, Input, message } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/userSlice";
import { localServ } from "../../service/localStorageService";
import { https } from "../../service/config";
import { scrollToTop } from "../../service/effect";

export default function LoginPage() {
  if (localServ.getUser()) {
    window.location.href = "/";
  }

  useEffect(() => {
    scrollToTop();
  }, []);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onFinish = (values) => {
    https
      .post("/api/QuanLyNguoiDung/DangNhap", values)
      .then((res) => {
        message.success("Đăng nhập thành công!");

        dispatch(setUserInfo(res.data));

        localServ.setUser(res.data);
        localServ.setAccessToken(res.data.accessToken);

        setTimeout(() => {
          if (res.data.maLoaiNguoiDung === "GV") {
            navigate("/admin/quan-ly-khoa-hoc");
          } else {
            navigate(-1);
          }
        }, 500);
      })
      .catch((err) => {
        message.error(err.response.data);
      });
  };

  return (
    <section className="section p-member">
      <div className="container p-member__row">
        {/* left picture */}
        <div className="p-member__col p-member__pic">
          <div className="p-member__welcome">
            <p>Chào mừng trở lại</p>
          </div>

          <img
            src="https://source.unsplash.com/random/600x500?sig=code"
            alt="p-member-random"
            className="p-member__img"
          />
        </div>

        {/* the form */}
        <div className="p-member__col p-member__form">
          <h2 className="p-member__title">Đăng nhập</h2>

          <Form onFinish={onFinish} layout="vertical">
            <Form.Item
              label="Tài khoản"
              name="taiKhoan"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập Tài khoản",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              // style={{ color: "white" }}
              name="matKhau"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập Mật khẩu",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <div className="p-member__action">
              <button
                className="btn btn-pill btn-primary p-member__btn"
                type="submit"
              >
                Đăng nhập
              </button>
            </div>
          </Form>

          <div className="p-member__external">
            <p>
              Bạn chưa có tài khoản? &ndash;{" "}
              <NavLink to={"/dang-ky"} className="p-member__link">
                Đăng ký
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
