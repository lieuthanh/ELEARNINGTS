import React from "react";
import AdminHeader from "../Components/AdminHeader/AdminHeader";
import AdminSideBar from "../Components/AdminSideBar/AdminSideBar";
import { localServ } from "../service/localStorageService";

export default function AdminLayout({ contentPage }) {
  if (!localServ.getUser() || localServ.getUser().maLoaiNguoiDung !== "GV") {
    window.location.href = "/dang-nhap";
  }
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* side bar */}
      <AdminSideBar />
      {/* admin header */}
      <AdminHeader />
      <div className="p-4 lg:ml-64">{contentPage}</div>
    </div>
  );
}
