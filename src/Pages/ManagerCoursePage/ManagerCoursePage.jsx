import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { https } from "../../service/config";
import { setCourseList } from "../../redux/courseSlice";
import { AiOutlineEye, AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import DeleteCourseModal from "../../Components/Modal/DeleteCourseModal/DeleteCourseModal";
import CreateCourseModal from "../../Components/Modal/CreateCourseModal/CreateCourseModal";
import {
  setCourseId,
  setIsCreateCourse,
  setIsDeleteCourse,
  setIsRegisterCourse,
  setIsUpdateCourse,
} from "../../redux/modalSlice";
import UpdateCourseModal from "../../Components/Modal/UpdateCourseModal/UpdateCourseModal";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import RegisterCourseModal from "../../Components/Modal/RegisterCourseModal/RegisterCourseModal";

export default function ManagerCoursePage() {
  const { courseList } = useSelector((state) => state.courseSlice);

  const [searchKeyword, setSearchKeyword] = useState("");

  const filteredCourses = courseList.filter((course) =>
    course.tenKhoaHoc.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalFilteredItems = filteredCourses.length;
  const totalFilteredPages = Math.ceil(totalFilteredItems / itemsPerPage);

  const calculatePagination = () => {
    const pagesToShow = 3; // Số lượng trang cần hiển thị ở giữa
    let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    let endPage = Math.min(totalFilteredPages, startPage + pagesToShow - 1);

    // Đảm bảo luôn hiển thị pagesToShow trang
    if (endPage - startPage + 1 < pagesToShow) {
      startPage = Math.max(1, endPage - pagesToShow + 1);
    }

    return { startPage, endPage };
  };

  const { startPage, endPage } = calculatePagination();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentDisplayedCourses = filteredCourses.slice(startIndex, endIndex);

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
    event.target.src = "https://dummyimage.com/600x400/374151/6b7280";
  };

  let handleCreateCourse = () => {
    dispatch(setIsCreateCourse(true));
  };

  let handleRegisterCourse = (courseId) => {
    dispatch(setIsRegisterCourse(true));
    dispatch(setCourseId(courseId));
  };

  let handleUpdateCourse = (courseId) => {
    dispatch(setIsUpdateCourse(true));
    dispatch(setCourseId(courseId));
  };

  let handleDeleteCourse = (courseId) => {
    dispatch(setIsDeleteCourse(true));
    dispatch(setCourseId(courseId));
  };

  let handleSearchCourse = (event) => {
    let keyword = event.target.value;
    setSearchKeyword(keyword);
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-14">
        {/* head action */}
        <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800">
          {/* open create modal */}
          <div>
            <button
              onClick={handleCreateCourse}
              className="inline-flex items-center space-x-1 text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              <span className="sr-only">Thêm khóa học</span>
              <AiOutlinePlus />
              <span>Thêm khóa học</span>
            </button>
          </div>

          {/* search */}
          <label htmlFor="table-search-course" className="sr-only">
            Tìm kiếm
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <AiOutlineSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              onChange={handleSearchCourse}
              type="text"
              id="table-search-course"
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
              placeholder="Tìm kiếm khóa học..."
            />
          </div>
        </div>

        {/* course table list */}
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                STT
              </th>
              <th scope="col" className="px-6 py-3">
                Mã khóa học
              </th>
              <th scope="col" className="px-6 py-3">
                Tên khóa học
              </th>
              <th scope="col" className="px-6 py-3">
                Danh mục
              </th>
              <th scope="col" className="px-6 py-3">
                Người tạo
              </th>
              <th scope="col" className="px-6 py-3">
                Tùy chỉnh
              </th>
            </tr>
          </thead>
          <tbody>
            {currentDisplayedCourses.length > 0 ? (
              currentDisplayedCourses.map((course, index) => {
                const absoluteIndex = startIndex + index + 1;
                return (
                  <tr
                    key={course.maKhoaHoc}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    {/* index */}
                    <td className="w-4 p-4">{absoluteIndex}</td>

                    {/* course id */}
                    <td className="px-6 py-4">
                      <div className="font-semibold">{course.maKhoaHoc}</div>
                    </td>

                    {/* course name / image / view */}
                    <th
                      scope="row"
                      className="flex items-start px-6 py-4 text-gray-900 dark:text-white"
                    >
                      <img
                        className="w-10 h-10 object-cover rounded-lg"
                        src={course.hinhAnh}
                        onError={handleImgError}
                        alt={course.maKhoaHoc}
                      />
                      <div className="pl-3">
                        <div className="font-semibold">{course.tenKhoaHoc}</div>
                        <div className="font-normal text-gray-400 flex items-center space-x-1">
                          <AiOutlineEye />
                          <span>{course.luotXem}</span>
                        </div>
                      </div>
                    </th>

                    {/* course category */}
                    <td className="px-6 py-4">
                      {course.danhMucKhoaHoc.tenDanhMucKhoaHoc}
                    </td>

                    {/* course creator */}
                    <td className="px-6 py-4">{course.nguoiTao.taiKhoan}</td>

                    {/* options */}
                    <td className="px-6 py-4">
                      <div className="inline-flex items-center space-x-2">
                        {/* open register modal */}
                        <button
                          onClick={() => handleRegisterCourse(course.maKhoaHoc)}
                          className="font-medium text-amber-600 dark:text-amber-500 hover:underline"
                        >
                          Ghi danh
                        </button>

                        <span>|</span>

                        {/* open update Modal */}
                        <button
                          onClick={() => handleUpdateCourse(course.maKhoaHoc)}
                          className="font-medium text-sky-600 dark:text-sky-500 hover:underline"
                        >
                          Sửa
                        </button>

                        <span>|</span>

                        {/* open delete modal */}
                        <button
                          onClick={() => handleDeleteCourse(course.maKhoaHoc)}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4 text-center" colSpan={6}>
                  Không tìm thấy khóa học
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* table pagination */}
        {totalFilteredPages > 1 ? (
          <nav
            className="w-full flex items-center justify-between pt-4"
            aria-label="Table navigation"
          >
            <span className="hidden lg:inline-block text-sm text-gray-500 dark:text-gray-400">
              Hiển thị{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {startIndex + 1}-{Math.min(endIndex, totalFilteredItems)}
              </span>{" "}
              trên{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {totalFilteredItems}
              </span>
            </span>

            <ul className="inline-flex -space-x-px text-sm h-8">
              <li>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 ${
                    currentPage === 1
                      ? "cursor-not-allowed"
                      : "hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
                  disabled={currentPage === 1}
                >
                  <BsChevronLeft />
                </button>
              </li>
              {startPage > 1 && (
                <>
                  <li>
                    <button
                      onClick={() => handlePageChange(1)}
                      className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 dark:border-gray-700 dark:text-gray-400 ${
                        currentPage === 1
                          ? "dark:bg-gray-700 dark:text-white"
                          : "dark:bg-gray-800 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
                      }`}
                    >
                      1
                    </button>
                  </li>
                  {startPage > 2 && (
                    <li>
                      <span className="flex items-center justify-center px-3 h-8 text-gray-500 dark:text-gray-400">
                        ...
                      </span>
                    </li>
                  )}
                </>
              )}
              {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                <li key={index}>
                  <button
                    onClick={() => handlePageChange(startPage + index)}
                    className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 dark:border-gray-700 dark:text-gray-400 ${
                      currentPage === startPage + index
                        ? "dark:bg-gray-700 dark:text-white"
                        : "dark:bg-gray-800 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
                    }`}
                  >
                    {startPage + index}
                  </button>
                </li>
              ))}
              {endPage < totalFilteredPages && (
                <>
                  {endPage < totalFilteredPages - 1 && (
                    <li>
                      <span className="flex items-center justify-center px-3 h-8 text-gray-500 dark:text-gray-400">
                        ...
                      </span>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={() => handlePageChange(totalFilteredPages)}
                      className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 dark:border-gray-700 dark:text-gray-400 ${
                        currentPage === totalFilteredPages
                          ? "dark:bg-gray-700 dark:text-white"
                          : "dark:bg-gray-800 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
                      }`}
                    >
                      {totalFilteredPages}
                    </button>
                  </li>
                </>
              )}
              <li>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 ${
                    currentPage === totalFilteredPages
                      ? "cursor-not-allowed"
                      : "hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
                  disabled={currentPage === totalFilteredPages}
                >
                  <BsChevronRight />
                </button>
              </li>
            </ul>
          </nav>
        ) : null}
      </div>

      {/* Create course modal */}
      {<CreateCourseModal />}

      {/* Register course modal */}
      <RegisterCourseModal />

      {/* Update course modal */}
      <UpdateCourseModal />

      {/* Delete course modal */}
      <DeleteCourseModal />
    </>
  );
}
