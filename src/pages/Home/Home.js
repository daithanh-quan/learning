import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CarouselHome from '../../components/carousel/CarouselHome'
import ListCourse from '../../components/listCourse/ListCourse'
import { getListCourse } from '../../Redux/action/CourseAction'

const Home = (props) => {
  const { listCourse } = useSelector(state => state.ListCourseReducer) // lấy danh sách khóa học từ ListCourseReducer
  const listCourseMemo = useMemo(() => listCourse, [listCourse]) // khi state thay đổi sẽ tránh render lại giao diện của component con nhận props
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getListCourse()) // dispatch action lên reducer để lấy danh sách các khóa học về
  }, [dispatch])
  const renderOtherListCourse = () => { // hàm tạo các khóa học khác
    return listCourseMemo?.slice(8, 16).map((course, index) => {
      return <div key={index} className="my-2" >
        <div className="max-w-xs rounded-md shadow-md mx-3 relative">
          <img src={course.hinhAnh} alt='' className="object-cover object-center w-full relative rounded-t-md h-36 top-0 "
            onError={(e) => { e.target.onerror = null; e.target.src = "https://picsum.photos/75/75" }}
          />
          <div className="glassesMorphin absolute w-full h-36 top-0 rounded-t-md object-cover object-center"></div>
          <div className="flex flex-col justify-between p-6 space-y-8">
            <div className="space-y-2">
              <h2 className="text-base font-semibold tracking-wide">{course.danhMucKhoaHoc.tenDanhMucKhoaHoc}</h2>
              <p className="text-coolGray-800">{course.tenKhoaHoc.slice(0, 20)}</p>
            </div>
            <button type="button" className="flex items-center justify-center px-2 py-2  font-semibold tracking-wide rounded-md bg-sky-500 text-white hover:opacity-70">Đăng ký</button>
          </div>
        </div>
      </div>
    })
  }
  return (
    <div className="">
      <CarouselHome />
      <ListCourse listCourse={listCourseMemo} />
      <p className="text-gray-600 w-5/6 mb-5  font-extrabold  lg:text-left  mx-auto text-xl pl-3">Các khóa học khác</p>
      <div className="grid grid-cols-4 w-5/6 mx-auto my-8 ">
        {renderOtherListCourse()}
      </div>
    </div>
  )
}

export default Home