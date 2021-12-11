import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCourseAction } from '../../Redux/action/CourseAction';

import { INFO_USER } from '../../Redux/types/UserType';

const AttendedCourse = (props) => {
  const dispatch = useDispatch()
  const { renderArrayRegisteredCourse } = useSelector(state => state.InformationUserRD)
  const renderListCourse = () => {
    return renderArrayRegisteredCourse?.map((course, index) => {
      return <div className="container mx-auto flex px-5 py-2 border-2 my-2 md:flex-row flex-col items-center lg:justify-between" key={index}>
        <div className=" md:w-2/5 w-5/6 mb-2 md:mb-0">
          <img className="object-cover object-center rounded xl:w-full xl:h-52 lg:w-56 lg:h-40 md:w-full md:h-48" alt="hero" src={course.hinhAnh}
            onError={(e) => { e.target.onerror = null; e.target.src = "https://picsum.photos/100/176" }}
          />
        </div>
        <div className="lg:flex-grow md:w-full md:pl-10 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="title-font sm:text-xl text-2xl mb-4 font-medium text-gray-900"> {course.tenKhoaHoc}
            <br className="hidden lg:inline-block" />
          </h1>
          <p className=" leading-relaxed">{course.moTa.length < 30 ? 'Khóa học dành cho nhưng bạn yêu thích và đam mê lập trình, được làm việc với các dự án thực tế, được hỗ trợ với đội ngũ mentor và giảng viên đầy kinh nghiệm...' : course.moTa.slice(0, 200) + `...`}</p>
          <div className="text-right w-full">
            <button className="ml-4 inline-flex text-white bg-red-500 border-0 py-1 px-2 focus:outline-none hover:bg-red-700 rounded text-base"
              onClick={async () => {
                await dispatch({
                  type: 'Delete',
                  course: course.maKhoaHoc
                })
                let data = {
                  maKhoaHoc: course.maKhoaHoc,
                  taiKhoan: JSON.parse(localStorage.getItem(INFO_USER)).taiKhoan
                }
                dispatch(deleteCourseAction(data))

              }}
            >
              Xóa</button>
          </div>
        </div>
      </div>
    })
  }
  return (
    <div className="my-4">
      <div className="container  border-2">
        <div className="flex justify-center flex-wrap items-center sm:justify-between  sm:items-baseline  my-4 mx-5">
          <h2 className="lg:text-2xl md:text-sm text-yellow-500">Các khóa học đã tham gia</h2>
          <input type="text" name="TimKiem" placeholder="nhập khóa học cần tìm kiếm" className="py-1 px-2 lg:w-2/4 border-2 rounded-lg md:w-2/6 w-full" />
        </div>
        <section className="text-gray-600 body-font">
          {renderListCourse()}
        </section>
      </div>
    </div>
  )
}

export default memo(AttendedCourse)
