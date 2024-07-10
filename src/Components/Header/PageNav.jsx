import React from "react";

export default function PageNav() {
  return (
    <nav>
      <ul className="flex items-center space-x-8 font-medium">
        <li>
          <a href="/">Danh mục</a>
        </li>
        <li>
          <a href="/course">Khóa học</a>
        </li>
        <li>
          <a href="/blog">Blog</a>
        </li>
        <li>
          <a href="/event">Sự kiện</a>
        </li>
        <li>
          <a href="/info">Thông tin</a>
        </li>
      </ul>
    </nav>
  );
}
