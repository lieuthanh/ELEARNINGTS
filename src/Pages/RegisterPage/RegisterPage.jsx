import { Form, Input, message } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { https } from "../../service/config";
import { NavLink } from "react-router-dom";
import { localServ } from "../../service/localStorageService";
import { scrollToTop } from "../../service/effect";

export default function RegisterPage() {
  if (localServ.getUser()) {
    window.location.href = "/";
  }

  useEffect(() => {
    scrollToTop();
  }, []);

  const [form] = Form.useForm();

  const navigate = useNavigate();

  const onFinish = (values) => {
    https
      .post("/api/QuanLyNguoiDung/DangKy", { ...values, maNhom: "GP01" })
      .then(() => {
        message.success("Đăng ký thành công");

        setTimeout(() => {
          navigate("/dang-nhap");
        }, 1000);
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
            <p>Chào mừng đến với PBTC</p>
          </div>

          <img
            src="https://source.unsplash.com/random/600x500?sig=code"
            alt="p-member-random"
            className="p-member__img"
          />
        </div>

        {/* the form */}
        <div className="p-member__col p-member__form">
          <h2 className="p-member__title">Đăng ký</h2>

          <Form
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="taiKhoan"
              label="Tài khoản"
              rules={[
                {
                  required: true,
                  message: "Tài khoản không được để trống",
                },
              ]}
            >
              <Input id="taiKhoan" />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="matKhau"
              rules={[
                {
                  required: true,
                  message: "Mật khẩu không được để trống",
                },
              ]}
            >
              <Input.Password id="matKhau" />
            </Form.Item>
            <Form.Item
              name="hoTen"
              label="Họ Tên"
              rules={[
                {
                  required: true,
                  message: "Họ Tên không được để trống",
                },
              ]}
            >
              <Input id="hoTen" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Email không được để trống",
                },
              ]}
            >
              <Input id="email" />
            </Form.Item>
            <Form.Item
              name="soDt"
              label="Số điện thoại"
              rules={[
                {
                  required: true,
                  message: "Số điện thoại không được để trống",
                },
              ]}
            >
              <Input id="soDt" />
            </Form.Item>

            <div className="p-member__action">
              <button
                className="btn btn-pill btn-primary p-member__btn"
                type="submit"
              >
                Đăng ký
              </button>
            </div>
          </Form>

          <div className="p-member__external">
            <p>
              Đã có tài khoản? &ndash;{" "}
              <NavLink to={"/dang-nhap"} className="p-member__link">
                Đăng nhập
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
