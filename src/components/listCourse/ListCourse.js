import React, { memo } from 'react'
import Slider from "react-slick";
import { SampleNextArrow } from './SampleNextArrow';
import { SamplePrevArrow } from './SamplePrevArrow';

var settings = { // setting để custom của thư viện slick
  className: 'w-5/6',
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};
const ListCourse = (props) => {
  const renderListCourses = () => {
    return props.listCourse?.slice(0, 8).map((course, index) => {
      return <div key={index} >
        <div className="max-w-xs rounded-md shadow-md mx-3 my-5 relative">
          <img src={course.hinhAnh} alt='' className="object-cover object-center w-full relative rounded-t-md h-36 top-0 "
            onError={(e) => { e.target.onerror = null; e.target.src = "https://picsum.photos/75/75" }}
          />
          <div className="glassesMorphin absolute w-full h-36 top-0 rounded-t-md object-cover object-center"></div>
          <div className="flex flex-col justify-between p-6 space-y-8">
            <div className="space-y-2">
              <h2 className="text-base font-semibold tracking-wide">{course.danhMucKhoaHoc.tenDanhMucKhoaHoc}</h2>
              <p className="text-coolGray-800">{course.tenKhoaHoc}</p>
            </div>
            <button type="button" className="flex items-center justify-center px-2 py-2  font-semibold tracking-wide rounded-md bg-sky-500 text-white hover:opacity-70">Đăng ký</button>
          </div>
        </div>
      </div>
    })
  }
  return (
    <div className="container react__slick my-14">
      <p className="text-gray-600 w-5/6  font-extrabold  lg:text-left  mx-auto text-xl pl-3">Các khóa học mới nhất</p>
      <div className="flex justify-center">
        <Slider {...settings}>
          {renderListCourses()}
        </Slider>
      </div>
    </div>
  )
}

export default memo(ListCourse)
