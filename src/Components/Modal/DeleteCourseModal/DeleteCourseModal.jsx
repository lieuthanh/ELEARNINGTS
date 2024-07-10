import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCourseId, setIsDeleteCourse } from "../../../redux/modalSlice";
import { localServ } from "../../../service/localStorageService";
import { https } from "../../../service/config";
import { message } from "antd";
import { setCourseList } from "../../../redux/courseSlice";
import { MdOutlineClose } from "react-icons/md";
import { TbTrashXFilled } from "react-icons/tb";

export default function DeleteCourseModal() {
  const { isDeleteCourse, courseId } = useSelector((state) => state.modalSlice);

  const accessToken = localServ.getAccessToken();

  const dispatch = useDispatch();

  let handleCloseModal = () => {
    dispatch(setIsDeleteCourse(false));
    dispatch(setCourseId(""));
  };

  let handleDelete = () => {
    https
      .delete(`/api/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${courseId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        message.success(res.data);

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

  return isDeleteCourse ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto bg-gray-900 bg-opacity-75">
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
          <button
            onClick={handleCloseModal}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <MdOutlineClose className="w-5 h-5" />
            <span className="sr-only">Đóng</span>
          </button>
          <div className="p-6 text-center">
            <TbTrashXFilled className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />

            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Bạn có chắc chắn muốn xóa khóa học {courseId}?
            </h3>

            <button
              onClick={handleDelete}
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              Có
            </button>
            
            <button
              onClick={handleCloseModal}
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Không
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
