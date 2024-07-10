import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCourseId, setIsUpdateCourse } from "../../../redux/modalSlice";
import { https } from "../../../service/config";
import { message } from "antd";
import { setCourseList } from "../../../redux/courseSlice";
import { RxUpdate } from "react-icons/rx";
import { MdOutlineClose } from "react-icons/md";

export default function UpdateCourseModal() {
  const { isUpdateCourse, courseId } = useSelector((state) => state.modalSlice);

  const initialData = {
    maKhoaHoc: "",
    tenKhoaHoc: "",
    moTa: "",
    luotXem: 0,
    danhGia: 0,
    hinhAnh: null,
    maNhom: "",
    ngayTao: "",
    maDanhMucKhoaHoc: "",
    taiKhoanNguoiTao: "",
  }
  const [data, setData] = useState(initialData);

  const [categories, setCategories] = useState("");

  const [selectedImage, setSelectedImage] = useState(
    "https://dummyimage.com/600x400/374151/6b7280"
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (courseId) {
      https
        .get(`/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${courseId}`)
        .then((res) => {
          setSelectedImage(res.data.hinhAnh);

          setData({
            maKhoaHoc: res.data.maKhoaHoc,
            tenKhoaHoc: res.data.tenKhoaHoc,
            moTa: res.data.moTa,
            luotXem: res.data.luotXem,
            danhGia: 0,
            hinhAnh: res.data.hinhAnh,
            maNhom: res.data.maNhom,
            ngayTao: res.data.ngayTao,
            maDanhMucKhoaHoc: res.data.danhMucKhoaHoc.maDanhMucKhoahoc,
            taiKhoanNguoiTao: res.data.nguoiTao.taiKhoan,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    https
      .get("/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        message.error(err.response.data);
      });
  }, [courseId]);

  let handleCloseModal = () => {
    dispatch(setIsUpdateCourse(false));
    dispatch(setCourseId(""));
    setData(initialData)
  };

  let handleImgError = (event) => {
    event.target.src = "https://dummyimage.com/600x400/374151/6b7280";
  };

  let handleSubmit = (event) => {
    event.preventDefault();

    if (typeof data.hinhAnh == "string") {
      https
        .put("/api/QuanLyKhoaHoc/CapNhatKhoaHoc", data)
        .then(() => {
          message.success("Cập nhật khóa học thành công");

          handleCloseModal();

          https
            .get("/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01")
            .then((res) => {
              dispatch(setCourseList(res.data));
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          message.error(err.response.data);
        });
    } else {
      const formData = new FormData();

      for (let key in data) {
        if (key !== "hinhAnh") {
          formData.append(key, data[key]);
        } else {
          formData.append("file", data.hinhAnh, data.hinhAnh.name);
        }
      }

      https
        .post("/api/QuanLyKhoaHoc/CapNhatKhoaHocUpload", formData)
        .then(() => {
          message.success("Cập nhật khóa học thành công");

          handleCloseModal();

          https
            .get("/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01")
            .then((res) => {
              dispatch(setCourseList(res.data));
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          message.error(err.response.data);
        });
    }
  };

  return isUpdateCourse ? (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-x-hidden overflow-y-auto bg-gray-900 bg-opacity-75">
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        {/* Modal content */}
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          {/* Modal header */}
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Cập nhật khóa học
              {data.maKhoaHoc ? (
                <div>
                  <span className="text-xs sm:text-sm text-gray-300">
                    {data.maKhoaHoc}
                  </span>{" "}
                  <br className="block sm:hidden" />
                  <span className="text-xs sm:text-sm text-gray-400">
                    (
                    <span className="hidden sm:inline-block">
                      Thêm bởi&nbsp;
                    </span>
                    {data.taiKhoanNguoiTao} - {data.ngayTao})
                  </span>
                </div>
              ) : null}
            </h3>
            <button
              onClick={handleCloseModal}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <MdOutlineClose className="w-5 h-5" />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          {data.maKhoaHoc ? (
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="tenKhoaHoc"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tên
                  </label>
                  <input
                    type="text"
                    name="tenKhoaHoc"
                    id="tenKhoaHoc"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
                    placeholder="Nhập tên khóa học"
                    required
                    value={data.tenKhoaHoc}
                    onChange={(e) => {
                      setData((prevState) => ({
                        ...prevState,
                        tenKhoaHoc: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="danhMucKhoaHoc"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Danh mục
                  </label>
                  <select
                    id="danhMucKhoaHoc"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
                    onChange={(e) => {
                      setData((prevState) => ({
                        ...prevState,
                        maDanhMucKhoaHoc: e.target.value,
                      }));
                    }}
                  >
                    {data.maDanhMucKhoaHoc && (
                      <option value={data.maDanhMucKhoaHoc}>
                        {categories?.find(
                          (category) =>
                            category.maDanhMuc === data.maDanhMucKhoaHoc
                        )?.tenDanhMuc || ""}
                      </option>
                    )}
                    {categories
                      ? categories
                          .filter(
                            (category) =>
                              category.maDanhMuc !== data.maDanhMucKhoaHoc
                          )
                          .map((category) => (
                            <option
                              key={category.maDanhMuc}
                              value={category.maDanhMuc}
                            >
                              {category.tenDanhMuc}
                            </option>
                          ))
                      : null}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="danhGia"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Đánh giá
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={5}
                    name="danhGia"
                    id="danhGia"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
                    required
                    value={data.danhGia}
                    onChange={(e) => {
                      setData((prevState) => ({
                        ...prevState,
                        danhGia: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="luotXem"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Lượt xem
                  </label>
                  <input
                    type="number"
                    min={0}
                    name="luotXem"
                    id="luotXem"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
                    required
                    value={data.luotXem}
                    onChange={(e) => {
                      setData((prevState) => ({
                        ...prevState,
                        luotXem: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="hinhAnh"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Hình ảnh
                  </label>
                  <input
                    className="block w-full mb-4 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="hinhAnh"
                    type="file"
                    accept="image/png,image/jpeg"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (
                        file &&
                        (file.type === "image/png" ||
                          file.type === "image/jpeg")
                      ) {
                        const imageUrl = URL.createObjectURL(file);
                        setSelectedImage(imageUrl);
                        setData((prevState) => ({
                          ...prevState,
                          hinhAnh: file,
                        }));
                      }
                    }}
                  />
                  <img
                    src={selectedImage}
                    onError={handleImgError}
                    alt="selectedImage"
                    className="w-full h-44 object-cover rounded-lg"
                  />
                </div>
                <div>
                  <label
                    htmlFor="moTa"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Mô tả
                  </label>
                  <textarea
                    id="moTa"
                    rows={10}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
                    placeholder="Nhập mô tả khóa học"
                    value={data.moTa}
                    onChange={(e) => {
                      setData((prevState) => ({
                        ...prevState,
                        moTa: e.target.value,
                      }));
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="submit"
                  className="flex-auto sm:flex-initial text-white inline-flex items-center justify-center space-x-1 bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
                >
                  <RxUpdate />
                  <span>Cập nhật</span>
                </button>
                <button
                  onClick={handleCloseModal}
                  type="button"
                  className="flex-auto sm:flex-initial text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Hủy
                </button>
              </div>
            </form>
          ) : <p className="text-xs sm:text-sm text-gray-300">Khóa học bị lỗi!</p>}
        </div>
      </div>
    </div>
  ) : null;
}
