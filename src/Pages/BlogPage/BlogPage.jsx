import React, { useEffect } from "react";
import { scrollToTop } from "../../service/effect";

export default function BlogPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            <span className="section-title__highlight">Blog</span> Công nghệ
          </h2>
          <p className="section-sub section-sub--onwhite">
            Chia sẻ kiến thức đón đầu xu hướng
          </p>
          <div className="section-devider">
            <div className="section-devider__stroke" />
          </div>
        </div>

        {/* featured section */}
        <div className="flex flex-wrap md:flex-no-wrap mb-16">
          {/* main post */}
          <div className="mb-4 lg:mb-0  p-4 lg:p-0 w-full md:w-1/2 relative rounded block">
            <img
              src="https://images.unsplash.com/photo-1427751840561-9852520f8ce8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
              className="rounded-md object-cover w-full h-64"
              alt="BlogPage"
            />
            <span className="text-sky-500 text-sm hidden md:block mt-4">
              {" "}
              Công nghệ{" "}
            </span>
            <h1 className="text-stone-800 text-4xl font-bold mt-2 mb-2 leading-tight">
              Data Analyst là gì? Chuyện nghề của một Data Analyst
            </h1>
            <p className="text-stone-600 mb-4">
              Đối với bất kỳ lĩnh vực nào, việc phân tích dữ liệu luôn là yếu tố
              then chốt để đưa ra các đường lối, chiến lược phát triển hợp lí
              cho việc kinh doanh. Trên thị trường hiện nay, các công việc liên
              quan đến phân tích số liệu như Data Analysis, Data Science,… luôn
              là những vị trí “khát” nhân lực nhất. Cơ hội làm việc rộng mở cùng
              mức thu nhập hấp dẫn là điều khiến nhiều người quan tâm đến công
              việc này. Vậy Data Analyst là gì? Câu chuyện nghề nghiệp của một
              Data Analyst ra sao? Hãy cùng tìm hiểu với bài viết dưới đây.
            </p>
            <button className="inline-block px-6 py-3 mt-2 rounded-md bg-sky-500 text-stone-100">
              Đọc thêm
            </button>
          </div>
          {/* sub-main posts */}
          <div className="w-full md:w-1/2 pl-0 md:pl-6">
            {/* post 1 */}
            <div className="rounded w-full flex flex-col md:flex-row mb-10">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
                className="block md:hidden lg:block rounded-md h-64 md:h-32 m-4 md:m-0"
                alt="BlogPage"
              />
              <div className="bg-white rounded px-4">
                <span className="text-sky-500 text-sm hidden md:block">
                  {" "}
                  Ngôn ngữ lập trình{" "}
                </span>
                <div className="md:mt-0 text-stone-800 font-semibold text-xl mb-2">
                  Material UI custom theme với TypeScript
                </div>
                <p className="block md:hidden p-2 pl-0 pt-1 text-sm text-stone-600">
                  Như các bạn đã biết chúng ta sẽ sử dụng target="_blank" cho
                  thẻ a để khi người dùng click vô sẽ mở liên kết trên một tab
                  mới...
                </p>
              </div>
            </div>
            {/* post 2 */}
            <div className="rounded w-full flex flex-col md:flex-row mb-10">
              <img
                src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
                className="block md:hidden lg:block rounded-md h-64 md:h-32 m-4 md:m-0"
                alt="BlogPage"
              />
              <div className="bg-white rounded px-4">
                <span className="text-sky-500 text-sm hidden md:block">
                  {" "}
                  Ngôn ngữ lập trình{" "}
                </span>
                <div className="md:mt-0 text-stone-800 font-semibold text-xl mb-2">
                  Cấu trúc cơ bản trong HTML
                </div>
                <p className="block md:hidden p-2 pl-0 pt-1 text-sm text-stone-600">
                  Custom theme Material UI với TypeScript đơn giản, hiệu quả...
                </p>
              </div>
            </div>
            {/* post 3 */}
            <div className="rounded w-full flex flex-col md:flex-row mb-10">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
                className="block md:hidden lg:block rounded-md h-64 md:h-32 m-4 md:m-0"
                alt="BlogPage"
              />
              <div className="bg-white rounded px-4">
                <span className="text-sky-500 text-sm hidden md:block">
                  {" "}
                  Ngôn ngữ lập trình{" "}
                </span>
                <div className="md:mt-0 text-stone-800 font-semibold text-xl mb-2">
                  Xử Lý Bất Đồng Bộ Trong Javascript
                </div>
                <p className="block md:hidden p-2 pl-0 pt-1 text-sm text-stone-600">
                  Chắc chắn khi lập trình, bạn sẽ có các công việc cần thời gian
                  delay (gọi API, lấy dữ liệu từ Database, đọc/ghi file,...). Và
                  đây...
                </p>
              </div>
            </div>
            {/* post 4 */}
            <div className="rounded w-full flex flex-col md:flex-row mb-10">
              <img
                src="https://images.unsplash.com/photo-1489844097929-c8d5b91c456e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
                className="block md:hidden lg:block rounded-md h-64 md:h-32 m-4 md:m-0"
                alt="BlogPage"
              />
              <div className="bg-white rounded px-4">
                <span className="text-sky-500 text-sm hidden md:block">
                  {" "}
                  Thư viện css{" "}
                </span>
                <div className="md:mt-0 text-stone-800 font-semibold text-xl mb-2">
                  Tailwind css và cách cài đặt cơ bản
                </div>
                <p className="block md:hidden p-2 pl-0 pt-1 text-sm text-stone-600">
                  Có lẽ cũng rất lâu rồi mà tôi chưa đụng đến thứ được gọi là
                  "timetable". Hay dân dã hơn thì người ta hay gọi là "Lịch
                  thường nhật",...
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* end featured section */}
        {/* recent posts */}
        <div className="flex mt-16 mb-4 px-4 lg:px-0 items-center justify-between">
          <h2 className="font-bold text-3xl">Tin mới nhất</h2>
          <button className="bg-stone-200 hover:bg-sky-200 text-stone-800 px-3 py-1 rounded cursor-pointer">
            Xem tất cả
          </button>
        </div>

        <div className="block space-x-0 lg:flex lg:space-x-6">
          <div className="rounded w-full md:w-1/2 lg:w-1/3 p-4 lg:p-0">
            <img
              src={`https://source.unsplash.com/random/300x200?sig=${
                Math.floor(Math.random() * 100) + 1
              }`}
              className="w-full rounded"
              alt="Công nghệ"
            />
            <div className="p-4 pl-0">
              <h2 className="font-bold text-2xl text-stone-800">
                So sánh AWS, Google Cloud và Azure năm 2023
              </h2>
              <p className="text-stone-700 mt-2">
                Giải pháp cloud (cloud solutions) là cơ hội để các doanh nghiệp
                chuyển đổi số cho doanh nghiệp của mình. Tạo ra các cơ hội kinh
                doanh mới, các giải pháp đột phá.
              </p>
              <button className="inline-block py-2 rounded text-sky-900 mt-2 ml-auto">
                {" "}
                Đọc thêm{" "}
              </button>
            </div>
          </div>
          <div className="rounded w-full md:w-1/2 lg:w-1/3 p-4 lg:p-0">
            <img
              src={`https://source.unsplash.com/random/300x200?sig=${
                Math.floor(Math.random() * 100) + 1
              }`}
              className="w-full rounded"
              alt="Công nghệ"
            />
            <div className="p-4 pl-0">
              <h2 className="font-bold text-2xl text-stone-800">
                Công nghệ nào đứng sau AI tạo ra MC ảo đang hot rần rần?{" "}
              </h2>
              <p className="text-stone-700 mt-2">
                Đầu tiên, dạo qua một vòng các báo, tin tức rần rần về MC ảo,
                ứng dụng của MC Ảo là gì? Đứng sau AI ảo là công nghệ nào. Bài
                viết này chia sẻ chút kiến thức tới anh em về Synthetic.
              </p>
              <button className="inline-block py-2 rounded text-sky-900 mt-2 ml-auto">
                {" "}
                Đọc thêm{" "}
              </button>
            </div>
          </div>
          <div className="rounded w-full md:w-1/2 lg:w-1/3 p-4 lg:p-0">
            <img
              src={`https://source.unsplash.com/random/300x200?sig=${
                Math.floor(Math.random() * 100) + 1
              }`}
              className="w-full rounded"
              alt="Công nghệ"
            />
            <div className="p-4 pl-0">
              <h2 className="font-bold text-2xl text-stone-800">
                Dân IT có thể được ChatGPT hỗ trợ code tự động hóa như thế nào?
              </h2>
              <p className="text-stone-700 mt-2">
                ChatGPT đang là một trong những chủ đề được nhiều người quan tâm
                nhất hiện nay bao gồm cả anh em IT, lập trình viên. Có thể xem
                ChatGPT là một chatbot tích hợp trí tuệ nhân tạo với khả năng
                trả lời lại những câu hỏi của người dùng; và đáng chú ý là những
                câu hỏi không hề giới hạn một lĩnh vực nào kể cả lập trình.
              </p>
              <button className="inline-block py-2 rounded text-sky-900 mt-2 ml-auto">
                {" "}
                Đọc thêm{" "}
              </button>
            </div>
          </div>
        </div>
        {/* end recent posts */}
        {/* subscribe */}
        <div className="rounded flex md:shadow mt-12">
          <img
            src="https://images.unsplash.com/photo-1579275542618-a1dfed5f54ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
            className="w-0 md:w-1/4 object-cover rounded-l"
            alt="BlogPage"
          />
          <div className="px-4 py-2">
            <h3 className="text-3xl text-stone-800 font-bold">
              Đăng ký nhận thông tin
            </h3>
            <p className="text-xl text-stone-700">
              Chúng tôi gửi tin tức và bài đăng mới nhất mỗi tuần một lần.
            </p>
            <div className="mt-4 mb-10">
              <input
                type="email"
                className="rounded bg-stone-100 px-4 py-2 border focus:border-sky-400"
                placeholder="pbt@pbtinc.com"
              />
              <button className="px-4 py-2 rounded bg-sky-500 text-stone-100">
                Đăng ký
                <i className="bx bx-right-arrow-alt" />
              </button>
              <p className="text-sky-900 opacity-50 text-sm mt-1">
                Uy tín không spam
              </p>
            </div>
          </div>
        </div>
        {/* ens subscribe section */}
        {/* popular posts */}
        <div className="flex mt-16 mb-4 px-4 lg:px-0 items-center justify-between">
          <h2 className="font-bold text-3xl">Tin nổi bật</h2>
          <button className="bg-stone-200 hover:bg-sky-200 text-stone-800 px-3 py-1 rounded cursor-pointer">
            Xem tất cả
          </button>
        </div>

        <div className="block space-x-0 lg:flex lg:space-x-6">
          <div className="rounded w-full md:w-1/2 lg:w-1/3 p-4 lg:p-0">
            <img
              src="https://images.unsplash.com/photo-1526666923127-b2970f64b422?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
              className="rounded"
              alt="Công nghệ"
            />
            <div className="p-4 pl-0">
              <h2 className="font-bold text-2xl text-stone-800">
                Xử lý bất đồng bộ trong Javascript (phần 2)
              </h2>
              <p className="text-stone-700 mt-2">
                Async/await là cơ chế giúp bạn thực thi các thao tác bất đồng bộ
                một cách tuần tự hơn , giúp đoạn code nhìn qua tưởng như đồng...
              </p>
              <button className="inline-block py-2 rounded text-sky-900 mt-2 ml-auto">
                {" "}
                Đọc thêm{" "}
              </button>
            </div>
          </div>
          <div className="rounded w-full md:w-1/2 lg:w-1/3 p-4 lg:p-0">
            <img
              src="https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
              className="rounded"
              alt="Công nghệ"
            />
            <div className="p-4 pl-0">
              <h2 className="font-bold text-2xl text-stone-800">
                TyperScrip là gì, Vì sao nên dùng TyperScript{" "}
              </h2>
              <p className="text-stone-700 mt-2">
                Link khóa học cho anh em nào tò mò ( Đừng lo vì tất cả đều miễn
                phí )......
              </p>
              <button className="inline-block py-2 rounded text-sky-900 mt-2 ml-auto">
                {" "}
                Đọc thêm{" "}
              </button>
            </div>
          </div>
          <div className="rounded w-full md:w-1/2 lg:w-1/3 p-4 lg:p-0">
            <img
              src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
              className="rounded"
              alt="Công nghệ"
            />
            <div className="p-4 pl-0">
              <h2 className="font-bold text-2xl text-stone-800">
                Lập trình hướng đối tượng oop
              </h2>
              <p className="text-stone-700 mt-2">
                Chúng ta sẽ cùng nhau tìm hiểu cách oop trong reactjs...
              </p>
              <button className="inline-block py-2 rounded text-sky-900 mt-2 ml-auto">
                {" "}
                Đọc thêm{" "}
              </button>
            </div>
          </div>
        </div>
        {/* end popular posts */}
      </div>
    </section>
  );
}
