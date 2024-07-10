import React from "react";
import { NavLink } from "react-router-dom";

export default function OurTeam() {
  let renderRandomSize = () => {
    return Math.floor(Math.random() * (120 - 60 + 1)) + 60;
  }

  return (
    <section className="text-stone-600 section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Đội ngũ <span className="section-title__highlight">Giảng viên</span>
          </h2>
          <p className="section-sub section-sub--onwhite">
            Tương tác cùng mentor và giảng viên qua phần thảo luận
          </p>
          <div className="section-devider">
            <div className="section-devider__stroke" />
          </div>
        </div>
        
        <div className="flex flex-wrap -m-2">
          <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
            <div className="h-full flex items-center border-stone-200 border p-4 rounded-lg">
              <img
                alt="team"
                className="w-16 h-16 bg-stone-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                src={`https://i.pravatar.cc/${renderRandomSize()}`}
              />
              <div className="flex-grow">
                <h2 className="text-stone-900 title-font font-medium">
                  Holden Caulfield
                </h2>
                <p className="text-stone-500">UI Designer</p>
              </div>
            </div>
          </div>
          <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
            <div className="h-full flex items-center border-stone-200 border p-4 rounded-lg">
              <img
                alt="team"
                className="w-16 h-16 bg-stone-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                src={`https://i.pravatar.cc/${renderRandomSize()}`}
              />
              <div className="flex-grow">
                <h2 className="text-stone-900 title-font font-medium">
                  Henry Letham
                </h2>
                <p className="text-stone-500">CTO</p>
              </div>
            </div>
          </div>
          <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
            <div className="h-full flex items-center border-stone-200 border p-4 rounded-lg">
              <img
                alt="team"
                className="w-16 h-16 bg-stone-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                src={`https://i.pravatar.cc/${renderRandomSize()}`}
              />
              <div className="flex-grow">
                <h2 className="text-stone-900 title-font font-medium">
                  Oskar Blinde
                </h2>
                <p className="text-stone-500">Founder</p>
              </div>
            </div>
          </div>
          <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
            <div className="h-full flex items-center border-stone-200 border p-4 rounded-lg">
              <img
                alt="team"
                className="w-16 h-16 bg-stone-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                src={`https://i.pravatar.cc/${renderRandomSize()}`}
              />
              <div className="flex-grow">
                <h2 className="text-stone-900 title-font font-medium">
                  John Doe
                </h2>
                <p className="text-stone-500">DevOps</p>
              </div>
            </div>
          </div>
          <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
            <div className="h-full flex items-center border-stone-200 border p-4 rounded-lg">
              <img
                alt="team"
                className="w-16 h-16 bg-stone-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                src={`https://i.pravatar.cc/${renderRandomSize()}`}
              />
              <div className="flex-grow">
                <h2 className="text-stone-900 title-font font-medium">
                  Martin Eden
                </h2>
                <p className="text-stone-500">Software Engineer</p>
              </div>
            </div>
          </div>
          <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
            <div className="h-full flex items-center border-stone-200 border p-4 rounded-lg">
              <img
                alt="team"
                className="w-16 h-16 bg-stone-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                src={`https://i.pravatar.cc/${renderRandomSize()}`}
              />
              <div className="flex-grow">
                <h2 className="text-stone-900 title-font font-medium">
                  Boris Kitua
                </h2>
                <p className="text-stone-500">UX Researcher</p>
              </div>
            </div>
          </div>
          <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
            <div className="h-full flex items-center border-stone-200 border p-4 rounded-lg">
              <img
                alt="team"
                className="w-16 h-16 bg-stone-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                src={`https://i.pravatar.cc/${renderRandomSize()}`}
              />
              <div className="flex-grow">
                <h2 className="text-stone-900 title-font font-medium">
                  Atticus Finch
                </h2>
                <p className="text-stone-500">QA Engineer</p>
              </div>
            </div>
          </div>
          <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
            <div className="h-full flex items-center border-stone-200 border p-4 rounded-lg">
              <img
                alt="team"
                className="w-16 h-16 bg-stone-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                src={`https://i.pravatar.cc/${renderRandomSize()}`}
              />
              <div className="flex-grow">
                <h2 className="text-stone-900 title-font font-medium">
                  Alper Kamu
                </h2>
                <p className="text-stone-500">System</p>
              </div>
            </div>
          </div>
          <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
            <div className="h-full flex items-center border-stone-200 border p-4 rounded-lg">
              <img
                alt="team"
                className="w-16 h-16 bg-stone-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                src={`https://i.pravatar.cc/${renderRandomSize()}`}
              />
              <div className="flex-grow">
                <h2 className="text-stone-900 title-font font-medium">
                  Rodrigo Monchi
                </h2>
                <p className="text-stone-500">Product Manager</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-sky-500 to-sky-600 p-10 rounded-lg mt-14">
          <h2 className="text-white text-3xl text-center">
            Trở thành học viên của PBTC
          </h2>
          <p className="text-white mt-2 text-center">
            Học qua dự án thực tế, học đi đôi với hành, không lý thuyết lan man,
            phân tích cội nguồn của vấn đề, xây dựng từ các ví dụ nhỏ đến thực
            thi một dự án lớn ngoài thực tế để học viên học xong làm được ngay.
          </p>
          <div className="flex justify-center mt-4">
            <NavLink
              to={"/khoa-hoc/tat-ca-khoa-hoc"}
              className="btn btn-pill btn-accent"
            >
              Tham gia ngay
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}
