import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsCreateCourse } from "../../../redux/modalSlice";
import { AiOutlinePlus } from "react-icons/ai";
import moment from "moment";
import { https } from "../../../service/config";
import { localServ } from "../../../service/localStorageService";
import { message } from "antd";
import { setCourseList } from "../../../redux/courseSlice";
import { MdOutlineClose } from "react-icons/md";

export default function CreateCourseModal() {
  const { isCreateCourse } = useSelector((state) => state.modalSlice);

  const user = localServ.getUser();

  const [categories, setCategories] = useState("");

  const { courseList } = useSelector((state) => state.courseSlice);

  const groupList = courseList.reduce((groups, course) => {
    if (!groups.includes(course.maNhom)) {
      groups.push(course.maNhom);
    }
    return groups;
  }, []);

  const [selectedImage, setSelectedImage] = useState(
    "https://dummyimage.com/600x400/374151/6b7280"
  );

  const initialCourseInfo = {
    maKhoaHoc: "",
    tenKhoaHoc: "",
    moTa: "",
    luotXem: 0,
    danhGia: 0,
    hinhAnh: {},
    maNhom: "",
    ngayTao: moment().format("DD/MM/YYYY"),
    maDanhMucKhoaHoc: "",
    taiKhoanNguoiTao: user.taiKhoan,
  };

  const [courseInfo, setCourseInfo] = useState(initialCourseInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    https
      .get("/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        message.error(err.response.data);
      });
  }, []);

  let resetCourseInfo = () => {
    setCourseInfo(initialCourseInfo);
    setSelectedImage("https://dummyimage.com/600x400/374151/6b7280");
  };

  let handleCloseModal = () => {
    resetCourseInfo();
    dispatch(setIsCreateCourse(false));
  };

  let handleCreate = (event) => {
    event.preventDefault();

    const formData = new FormData();

    for (let key in courseInfo) {
      if (key !== "hinhAnh") {
        formData.append(key, courseInfo[key]);
      } else {
        formData.append("file", courseInfo.hinhAnh, courseInfo.hinhAnh.name);
      }
    }

    https
      .post("/api/QuanLyKhoaHoc/ThemKhoaHocUploadHinh", formData)
      .then(() => {
        message.success("Thêm khóa học thành công");

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
  };

  return isCreateCourse ? (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-x-hidden overflow-y-auto bg-gray-900 bg-opacity-75">
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        {/* Modal content */}
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          {/* Modal header */}
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Thêm khóa học <br />
              <span className="text-xs sm:text-sm text-gray-400">
                (Tài khoản {user.taiKhoan} - {moment().format("DD/MM/YYYY")})
              </span>
            </h3>
            <button
              onClick={handleCloseModal}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <MdOutlineClose className="w-5 h-5" />
              <span className="sr-only">Đóng</span>
            </button>
          </div>
          {/* Modal body */}
          <form onSubmit={handleCreate}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="maKhoaHoc"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mã
                </label>
                <input
                  type="text"
                  name="maKhoaHoc"
                  id="maKhoaHoc"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
                  placeholder="Nhập mã khóa học"
                  required
                  value={courseInfo.maKhoaHoc}
                  onChange={(e) => {
                    setCourseInfo((prevState) => ({
                      ...prevState,
                      maKhoaHoc: e.target.value
                        .trim()
                        .toLowerCase()
                        .replace(/ /g, ""),
                    }));
                  }}
                />
              </div>
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
                  value={courseInfo.tenKhoaHoc}
                  onChange={(e) => {
                    setCourseInfo((prevState) => ({
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
                    setCourseInfo((prevState) => ({
                      ...prevState,
                      maDanhMucKhoaHoc: e.target.value,
                    }));
                  }}
                >
                  {categories
                    ? categories.map((category) => (
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
                  htmlFor="maNhom"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mã nhóm
                </label>
                <select
                  id="maNhom"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
                  onChange={(e) => {
                    setCourseInfo((prevState) => ({
                      ...prevState,
                      maNhom: e.target.value,
                    }));
                  }}
                >
                  {groupList
                    ? groupList.map((group) => (
                        <option key={group} value={group}>
                          {group}
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
                  value={courseInfo.danhGia}
                  onChange={(e) => {
                    setCourseInfo((prevState) => ({
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
                  value={courseInfo.luotXem}
                  onChange={(e) => {
                    setCourseInfo((prevState) => ({
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
                  required
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (
                      file &&
                      (file.type === "image/png" || file.type === "image/jpeg")
                    ) {
                      const imageUrl = URL.createObjectURL(file);
                      setSelectedImage(imageUrl);
                      setCourseInfo((prevState) => ({
                        ...prevState,
                        hinhAnh: file,
                      }));
                    }
                  }}
                />
                <img
                  src={selectedImage}
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
                  value={courseInfo.moTa}
                  onChange={(e) => {
                    setCourseInfo((prevState) => ({
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
                className="flex-auto sm:flex-initial text-white inline-flex items-center justify-center space-x-1 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                <AiOutlinePlus />
                <span>Thêm</span>
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
        </div>
      </div>
    </div>
  ) : null;
}
