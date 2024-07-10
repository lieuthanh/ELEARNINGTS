import React, { useEffect } from "react";
import { scrollToTop } from "../../service/effect";

export default function InfoPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <section className="text-gray-600 section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="section-title__highlight">Thông tin</span> về
              PBTC
            </h2>
            <p className="section-sub section-sub--onwhite">
              Cùng nhau khám phá nhưng điều mới mẻ
            </p>
            <div className="section-devider">
              <div className="section-devider__stroke" />
            </div>
          </div>

          <div className="flex items-center border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
            <div className="lg:w-96 lg:h-96 md:w-80 md:h-80 sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 flex-shrink-0">
              <img
                src="assets/img/4-SCENE.svg"
                alt="vetor"
                className="w-full"
              />
            </div>
            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
              <h3 className="text-sky-800 text-xl font-medium mb-2 uppercase">
                PBTC Là gì?
              </h3>
              <h4 className="text-gray-900 text-lg font-medium mb-2">
                Nơi hội tụ kiến thức
              </h4>
              <p className="leading-relaxed text-base">
                Đây là nền tảng giảng dạy và học tập trực tuyến được xây dựng để
                hỗ trợ phát triển giáo dục trong thời đại công nghiệp 4.0, được
                xây dựng dựa trên cơ sở quan sát toàn bộ các nhu cầu cần thiết
                của một lớp học offline. Từ đó đáp ứng và đảm bảo cung cấp các
                công cụ toàn diện, dễ sử dụng cho giáo viên và học sinh, giúp
                tạo nên một lớp học trực tuyến thú vị và hấp dẫn.
              </p>
            </div>
          </div>

          <div className="flex items-center border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
              <h3 className="text-sky-800 text-xl font-medium mb-2 uppercase">
                Chương trình học tại PBTC
              </h3>
              <h4 className="text-gray-900 text-lg font-medium mb-2">
                Hệ thống học hàng đầu
              </h4>
              <p className="leading-relaxed text-base">
                Giảng viên đều là các chuyên viên thiết kế đồ họa và giảng viên
                của các trường đại học danh tiếng trong thành phố: Đại học CNTT,
                KHTN, Bách Khoa,…Trang thiết bị phục vụ học tập đầy đủ, phòng
                học máy lạnh, màn hình LCD, máy cấu hình mạnh, mỗi học viên thực
                hành trên một máy riêng.100% các buổi học đều là thực hành trên
                máy tính. Đào tạo với tiêu chí: “học để làm được việc”, mang lại
                cho học viên những kiến thức hữu ích nhất, sát với thực tế nhất.
              </p>
            </div>
            <div className="lg:w-96 lg:h-96 md:w-80 md:h-80 sm:w-32 sm:h-32 h-20 w-20 sm:order-none order-first sm:ml-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 flex-shrink-0">
              <img
                src="assets/img/9-SCENE.svg"
                alt="vector"
                className="w-full"
              />
            </div>
          </div>

          <div className="flex items-center sm:flex-row flex-col border-b pb-10 mb-10 border-gray-200">
            <div className="lg:w-96 lg:h-96 md:w-80 md:h-80 sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 flex-shrink-0">
              <img
                src="assets/img/6-SCENE.svg"
                alt="vector"
                className="w-full"
              />
            </div>
            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
              <h3 className="text-sky-800 text-xl font-medium mb-2 uppercase">
                Tầm nhìn của PBTC
              </h3>
              <h4 className="text-gray-900 text-lg font-medium mb-2">
                Đào tạo lập trình chuyên sâu
              </h4>
              <p className="leading-relaxed text-base">
                Trở thành hệ thống đào tạo lập trình chuyên sâu theo nghề hàng
                đầu khu vực, cung cấp nhân lực có tay nghề cao, chuyên môn sâu
                cho sự phát triển công nghiệp phần mềm trong thời đại công nghệ
                số hiện nay, góp phần giúp sự phát triển của xã hội, đưa Việt
                Nam thành cường quốc về phát triển phần mềm.giúp người học phát
                triển cả tư duy, phân tích, chuyên sâu nghề nghiệp, học tập suốt
                đời, sẵn sàng đáp ứng mọi nhu cầu của doanh nghiệp.
              </p>
            </div>
          </div>

          <div className="flex items-center sm:flex-row flex-col">
            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
              <h3 className="text-sky-800 text-xl font-medium mb-2 uppercase">
                Sứ mệnh của PBTC
              </h3>
              <h4 className="text-gray-900 text-lg font-medium mb-2">
                Phương pháp đào tạo hiện đại
              </h4>
              <p className="leading-relaxed text-base">
                Sử dụng các phương pháp đào tạo tiên tiến và hiện đại trên nền
                tảng công nghệ giáo dục, kết hợp phương pháp truyền thống,
                phương pháp trực tuyến, lớp học đảo ngược và học tập dựa trên dự
                án thực tế, phối hợp giữa đội ngũ training nhiều kinh nghiệm và
                yêu cầu từ các công ty, doanh nghiệp. Qua đó, PBTC giúp
                người học phát triển cả tư duy, phân tích, chuyên sâu nghề
                nghiệp, học tập suốt đời, sẵn sàng đáp ứng mọi nhu cầu của doanh
                nghiệp.
              </p>
            </div>
            <div className="lg:w-96 lg:h-96 md:w-80 md:h-80 sm:w-32 sm:h-32 h-20 w-20 sm:order-none order-first sm:ml-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 flex-shrink-0">
              <img
                src="assets/img/2-SCENE.svg"
                alt="vector"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="text-stone-600 section">
        <div className="container flex flex-wrap">
          <div className="flex w-full mb-20 flex-wrap">
            <h2 className="text-2xl font-medium uppercase text-sky-800 lg:w-1/3 lg:mb-0 mb-4">
              Thư viện Học tập Trực Quan
            </h2>
            <p className="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-base">
              Khám phá thế giới kiến thức với bộ sưu tập hình ảnh và video đa
              dạng của chúng tôi. Từ hình ảnh minh họa hấp dẫn đến video hướng
              dẫn, thư viện Học tập Trực Quan giúp bạn trải nghiệm học tập tương
              tác một cách chân thực như chưa bao giờ. Tìm hiểu thêm về các khóa
              học, sự kiện và thành tựu của học viên thông qua những hình ảnh
              đáng nhớ và video truyền cảm hứng.
            </p>
          </div>
          <div className="flex flex-wrap md:-m-2 -m-1">
            <div className="flex flex-wrap w-1/2">
              <div className="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block"
                  src={`https://source.unsplash.com/random/300x200?sig=${
                    Math.floor(Math.random() * 100) + 1
                  }`}
                />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block"
                  src={`https://source.unsplash.com/random/300x200?sig=${
                    Math.floor(Math.random() * 100) + 1
                  }`}
                />
              </div>
              <div className="md:p-2 p-1 w-full">
                <img
                  alt="gallery"
                  className="w-full h-full object-cover object-center block"
                  src={`https://source.unsplash.com/random/600x400?sig=${
                    Math.floor(Math.random() * 100) + 1
                  }`}
                />
              </div>
            </div>
            <div className="flex flex-wrap w-1/2">
              <div className="md:p-2 p-1 w-full">
                <img
                  alt="gallery"
                  className="w-full h-full object-cover object-center block"
                  src={`https://source.unsplash.com/random/600x400?sig=${
                    Math.floor(Math.random() * 100) + 1
                  }`}
                />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block"
                  src={`https://source.unsplash.com/random/300x200?sig=${
                    Math.floor(Math.random() * 100) + 1
                  }`}
                />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block"
                  src={`https://source.unsplash.com/random/300x200?sig=${
                    Math.floor(Math.random() * 100) + 1
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
