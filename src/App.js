import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./Layout/UserLayout";
import HomePage from "./Pages/HomePage/HomePage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import CoursePage from "./Pages/CoursePage/CoursePage";
import BlogPage from "./Pages/BlogPage/BlogPage";
import InfoPage from "./Pages/InfoPage/InfoPage";
import DetailCoursePage from "./Pages/DetailCoursePage/DetailCoursePage";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import SearchPage from "./Pages/SearchPage/SearchPage";
import AccountPage from "./Pages/AccountPage/AccountPage";
import AdminLayout from "./Layout/AdminLayout";
import ManagerCoursePage from "./Pages/ManagerCoursePage/ManagerCoursePage";
import ManagerUserPage from "./Pages/ManagerUserPage/ManagerUserPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLayout contentPage={<HomePage />} />} />
          <Route path="/tim-kiem/:search" element={<UserLayout contentPage={<SearchPage />} />} />
          <Route path="/khoa-hoc/:id" element={<UserLayout contentPage={<CoursePage />} />} />
          <Route path="/chi-tiet-khoa-hoc/:id/:alias" element={<UserLayout contentPage={<DetailCoursePage />} />} />
          
          <Route path="/dang-nhap" element={<UserLayout contentPage={<LoginPage />} />} />
          <Route path="/dang-ky" element={<UserLayout contentPage={<RegisterPage />} />} />
          <Route path="/tai-khoan" element={<UserLayout contentPage={<AccountPage />} />} />
          
          <Route path="/blog" element={<UserLayout contentPage={<BlogPage />} />} />
          <Route path="/thong-tin" element={<UserLayout contentPage={<InfoPage />} />} />

          <Route path="/admin/quan-ly-khoa-hoc" element={<AdminLayout contentPage={<ManagerCoursePage />} />} />
          <Route path="/admin/quan-ly-nguoi-dung" element={<AdminLayout contentPage={<ManagerUserPage />} />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
