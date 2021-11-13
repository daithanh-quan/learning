import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { ImStack } from 'react-icons/im'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoryCourse } from '../../Redux/action/CourseAction'
import { Select } from 'antd';
import { history } from '../../App'
import { EMPTY_INPUT_SEARCH, SEARCH } from '../../Redux/types/CourseTypes'
const { Option } = Select;

const Header = (props) => {
  const dispatch = useDispatch()
  const courses = useSelector(state => state.CategoryCourseReducer.course) // lấy course từ api ra để hiện lên ui
  const { value } = useSelector(state => state.ListFollowSearchRD) // lấy value từ ListFollowSearchRD
  useEffect(() => {
    dispatch(getCategoryCourse()) // dispatch action là func lấy khóa học từ api
  }, [dispatch])
  //lấy danh mục khóa học
  const renderCategoryCourse = () => { // hàm render các danh mục khóa học
    return courses?.map((course, index) => {
      return (
        <Option
          className="font-semibold text-sm rounded-xl"
          value={course.maDanhMuc}
          key={index}
        >
          <NavLink to={`/madanhmuc/${course.maDanhMuc}`}>
            {course.tenDanhMuc}
          </NavLink>
        </Option>
      )
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (value !== 'undefined') {
      await history.push(`/timkiem/${value}`)
      dispatch({
        type: EMPTY_INPUT_SEARCH,
        value: ''
      })
    }

  }
  return (
    <header className=" bg-gray-200 m ">
      <div className="container px-3 flex justify-between  h-16 mx-auto items-center">
        <NavLink to="/" exact className="hover:text-sky-400 hover:no-underline ">
          <div className="flex items-center">
            <ImStack className="h-16 mr-2 " />
            <p className="font-extrabold text-2xl mb-0">Full stack</p>
          </div>
        </NavLink>
        <div className="flex items-center md:space-x-4">
          <label className=" items-baseline w-72 hidden lg:flex" >
            <Select className="form-select block w-full mt-2 py-1  rounded-lg focus:outline-none focus:ring"
              placeholder="Danh mục khóa học"
            >
              {renderCategoryCourse()}
            </Select>
          </label>
          <form className="relative hidden lg:block " onSubmit={handleSubmit}>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <button type="submit" title="Search" className="p-1 focus:outline-none focus:ring"
                onClick={handleSubmit}
              >
                <svg fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4 text-coolGray-800">
                  <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z" />
                </svg>
              </button>
            </span>
            <input
              value={value}
              type="search"
              name="Search"
              placeholder="Tìm kiếm..."
              className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none bg-coolGray-100 text-coolGray-800 focus:bg-coolGray-50"
              onChange={(e) => {
                if (e.target.value !== '') {
                  dispatch({
                    type: SEARCH,
                    value: e.target.value
                  })
                }
              }}
            />
          </form>
          <button type="button" className="hidden px-4 py-2 font-semibold rounded lg:block bg-gradient-to-bl from-sky-400 to-blue-500 text-white hover:opacity-60 ">Đăng ký</button>
          <button type="button" className="hidden px-4 py-2 font-semibold rounded lg:block  bg-gradient-to-bl from-sky-400 to-blue-500 text-white hover:opacity-60 ">Đăng nhập</button>
        </div>
        <button title="Open menu" type="button" className="p-4 lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-coolGray-800">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>

  )
}

export default Header
