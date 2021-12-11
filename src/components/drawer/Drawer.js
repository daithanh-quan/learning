import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Drawer } from 'antd';
import { NavLink } from 'react-router-dom'

import { HIDDEN_DRAWER } from '../../Redux/types/DrawerType'
import { getCategoryCourse } from '../../Redux/action/CourseAction'
import { EMPTY_INPUT_SEARCH, SEARCH } from '../../Redux/types/CourseTypes';
import { history } from '../../App';
import { accessToken, INFO_USER } from '../../Redux/types/UserType';
import { ArrowRightOutlined } from '@ant-design/icons';


const DrawerHeader = () => {
  const [width, setWidth] = useState(window.innerWidth)
  const dispatch = useDispatch()
  const { visible } = useSelector(state => state.DrawerReducer)
  const courses = useSelector(state => state.CategoryCourseReducer.course)
  const { value } = useSelector(state => state.ListFollowSearchRD)
  useEffect(() => {
    dispatch(getCategoryCourse()) // dispatch action là func lấy khóa học từ api
  }, [dispatch])
  // xử lý tắt drawer khi ra màn hình laptop
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      if (width >= 1000) {
        window.removeEventListener('resize', handleResize)
        dispatch({
          type: HIDDEN_DRAWER
        })
      }
    }
  }, [width, dispatch])
  const onClose = () => {
    dispatch({
      type: HIDDEN_DRAWER
    })
  }
  const renderCategoryCourse = () => { // hàm render các danh mục khóa học
    return courses?.map((course, index) => {
      return (
        <div key={index} className='hover:opacity-60 my-2 rounded-lg p-2 border-2 cursor-pointer hover:bg-sky-300 group-hover:text-white ' >
          <NavLink to={`/madanhmuc/${course.maDanhMuc}`} className="text-sky-600 hover:text-white" onClick={() => {
            dispatch({
              type: HIDDEN_DRAWER
            })
          }}>{course.tenDanhMuc}</NavLink>
        </div>
      )
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!value) return history.push('/')
    if (value !== 'undefined') {
      await history.push(`/timkiem/${value}`)
      dispatch({
        type: EMPTY_INPUT_SEARCH,
        value: ''
      })
      dispatch({
        type: HIDDEN_DRAWER
      })
    }

  }
  return (
    <>
      <Drawer placement="right" onClose={onClose} visible={visible} className='p-0'>
        <form className="relative mt-8 border-t-2 border-b-2" onSubmit={handleSubmit}>
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
        <div className="my-4 font-semibold text-gray-500" >
          Danh mục khóa học
        </div>
        {renderCategoryCourse()}
        <div className=''>
          {localStorage.getItem(INFO_USER) && localStorage.getItem(accessToken) ? <div className=" lg:flex items-center  ">
            <div
              className='cursor-pointer my-3 font-semibold text-yellow-500 hover:text-yellow-700'
              onClick={() => {
                history.push('/thongtintaikhoan')
                dispatch({
                  type: HIDDEN_DRAWER
                })
              }}
            >
              Thông tin cá nhân
              <ArrowRightOutlined className='ml-5' />
            </div>
            <div
              className='cursor-pointer my-5 font-semibold text-yellow-500 hover:text-yellow-700'
              onClick={async () => {
                await localStorage.removeItem(accessToken);
                history.push('/')
                dispatch({
                  type: HIDDEN_DRAWER
                })
              }}
            >
              Đăng xuất
              <ArrowRightOutlined className='ml-5' />
            </div>
          </div> : <div className="flex flex-wrap ">
            <button type="button" className=" py-2 my-2 font-semibold rounded w-full bg-gradient-to-bl from-sky-400 to-blue-500 text-white hover:opacity-60 mx-1"
              onClick={async () => {
                await history.push('/dangky')
                dispatch({
                  type: HIDDEN_DRAWER
                })
              }}
            >
              Đăng ký</button>
            <button type="button" className=" py-2 font-semibold rounded w-full mx-1  bg-gradient-to-bl from-sky-400 to-blue-500 text-white hover:opacity-60 "
              onClick={() => {
                history.push('/dangnhap')
                dispatch({
                  type: HIDDEN_DRAWER
                })
              }}
            >
              Đăng nhập</button></div>}
        </div>
      </Drawer>
    </>
  )
}
export default DrawerHeader
