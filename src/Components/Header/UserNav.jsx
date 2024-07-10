import React from 'react'

export default function UserNav() {
  return (
    <nav>
        <ul className="flex items-center space-x-8 font-medium">
            <li>
              <a href="/login">Đăng nhập</a>
            </li>
            <li>
              <a href="/register">Đăng ký</a>
            </li>
          </ul>
    </nav>
  )
}
