import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { getListFlSearch } from '../../Redux/action/CourseAction';
import { history } from '../../App';
const memoPage = 4
const PaginationSearch = (props) => {
  const { CourseFlSearch, error } = useSelector(state => state.ListFollowSearchRD)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getListFlSearch(props.id))
  }, [dispatch, props])
  const [minIndex, setMinIndex] = useState(0)
  const [maxIndex, setMaxIndex] = useState(4)
  const [current, setCurrent] = useState(1)
  const onChange = page => {
    setCurrent(page)
    setMinIndex((page - 1) * memoPage)
    setMaxIndex(page * memoPage)
  }
  const renderListCourseSearch = () => {
    return CourseFlSearch?.map((course, index) => {
      return (index >= minIndex && index < maxIndex &&
        <div className=" flex flex-wrap md:flex-nowrap justify-center md:justify-start border-2  mt-5 rounded-xl bg-opacity-5 bg-black" key={index}>
          <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col relative">
            <img src={course.hinhAnh} alt="" className="w-52 h-44 object-cover rounded-lg"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://picsum.photos/75/176" }}
            />

          </div>
          <div className="md:flex-grow">
            <h2 className="mt-8 text-2xl font-medium text-sky-700 title-font mb-2">{course.danhMucKhoaHoc.tenDanhMucKhoaHoc}</h2>
            <p className="leading-relaxed m-0">{course.moTa.slice(0, 20)}...</p>
            <p className="leading-relaxed m-0">Tên khóa học: {course.tenKhoaHoc}</p>
            <div className="text-yellow-500 flex items-center mt-4 cursor-pointer hover:text-sky-700 "
              onClick={() => {
                history.push(`/chitiet/${course.maKhoaHoc}`)
              }}
            >Xem chi tiết
              <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      )
    })
  }
  return (
    <>
      <div className="mb-6">
        {CourseFlSearch !== undefined ? renderListCourseSearch() : (<div className="text-center my-5">
          <p className="text-2xl  text-yellow-600 font-extrabold">{error}</p>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
            onClick={() => {
              history.goBack()
            }}
          >
            Quay Lại</button>
        </div>
        )}
      </div>
      <Pagination defaultCurrent={current}
        defaultPageSize={memoPage} onChange={onChange} total={CourseFlSearch !== undefined ? CourseFlSearch.length : 1}
        className="text-center " />
    </>
  )
}

export default PaginationSearch
