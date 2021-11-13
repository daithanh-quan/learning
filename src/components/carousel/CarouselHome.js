import React from 'react'
import { Carousel } from 'antd';


const CarouselHome = () => {
  return (
    <Carousel autoplay >
      <div className="bg-gradient-to-r from-sky-400 to-blue-500 h-80 rounded-md " >
        <div className="container px-3">
          <div className="flex justify-between ">
            <div className="text-white w-2/5 my-10">
              <p className="text-4xl font-bold">Học lập trình là tương lai</p>
              <p className="text-xl font-semibold">Bài giảng chi tiết cụ thể</p>
              <p className="text-xl font-semibold">Mentor và giảng viên hỗ trợ nhiệt tình</p>
              <button className="px-5 py-3 border-2 border-white hover:bg-white hover:text-sky-500 rounded-2xl mt-5 font-bold">Xem chi tiết</button>
            </div>
            <img src="../img/banner1.png" alt="" className="w-2/5  object-cover opacity-70" />
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-bl from-sky-400 to-blue-500 h-80 rounded-md ">
        <div className="container px-3">
          <div className="flex justify-between ">
            <div className="text-white w-2/5  my-10">
              <p className="text-4xl font-bold">Học lập trình lương 1000$</p>
              <p className="text-xl font-semibold">Công nghệ ngày càng phát triển</p>
              <p className="text-xl font-semibold">Thiếu hụt rất lớn nhân lực</p>
              <button className="px-5 py-3 border-2 border-white hover:bg-white hover:text-sky-500 rounded-2xl mt-5 font-bold">Xem chi tiết</button>
            </div>
            <img src="../img/banner4.png" alt="" className="w-2/5   object-cover opacity-70" />
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-sky-400 to-blue-500 h-80 rounded-md">
        <div className="container px-3">
          <div className="flex justify-between  ">
            <div className="text-white w-2/5 my-10">
              <p className="text-4xl font-bold">Hỗ trợ việc làm sau khi học</p>
              <p className="text-xl font-semibold">Được trải nghiệm những dự án thực tế</p>
              <p className="text-xl font-semibold">Tìm hiểu những công nghệ mới nhất</p>
              <button className="px-5 py-3 border-2 border-white hover:bg-white hover:text-sky-500 rounded-2xl mt-5 font-bold">Xem chi tiết</button>
            </div>
            <img src="../img/banner5.png" alt="" className="w-2/5  object-cover opacity-70" />
          </div>
        </div>
      </div>
    </Carousel>
  )
}
export default CarouselHome
