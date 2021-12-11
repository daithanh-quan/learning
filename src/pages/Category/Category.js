import React, { memo, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getListFlCategory } from '../../Redux/action/CourseAction'
import { history } from '../../App'
const Category = (props) => {

  const { listCourseFlCategory } = useSelector(state => state.ListFollowCategoryRD)
  const idMemo = useMemo(() => props.match.params.id, [props.match.params])
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getListFlCategory(idMemo))
  }, [dispatch, idMemo])

  const renderLisrCourse = () => {
    return listCourseFlCategory?.map((course, index) => {
      return <div className="p-4 md:w-1/4 sm:mb-0 mb-6 shadow-lg rounded-xl mx-3" key={index}>
        <div className="rounded-lg h-64 overflow-hidden">
          <img alt="content" className="object-cover object-center h-full w-full" src={course.hinhAnh}
            onError={(e) => { e.target.onerror = null; e.target.src = "https://picsum.photos/75/75" }}
          />
        </div>
        <h2 className="text-xl text-sky-700 font-medium title-font  mt-5">{`${course.tenKhoaHoc.slice(0, 17)} ...`}</h2>
        <p className="text-base leading-relaxed mt-2"
        >{`${course.moTa.length <= 30 ? 'Vui lòng chọn khóa học khác, chúng tôi đang khắc phục, xin cảm ơn.' : course.moTa.slice(0, 60)} ...`}</p>
        <p className="text-base leading-relaxed mt-2">Lược đăng ký học: <span className="text-yellow-500">{course.luotXem}</span></p>
        <button className="text-indigo-500 inline-flex items-center mt-3"
          onClick={() => {
            history.push(`/chitiet/${course.maKhoaHoc}`)
          }}
        >Xem chi tiết
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 ml-2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    })
  }

  return (
    <div className="container category mb-5">
      <div className="bg-gradient-to-bl from-sky-400 to-blue-500 h-40 rounded-md ">
        <div className="flex px-5 items-center">
          <img src="../img/user.png" alt="..." className="w-60 h-40 object-center opacity-50" />
          <h3 className="text-white font-bold text-3xl lg:ml-24">Các khóa học về : {idMemo}</h3>
        </div>
      </div>
      <p className="text-gray-600 w-5/6 my-9  font-extrabold  text-center  mx-auto text-xl pl-5">Danh sách khóa học</p>
      <div className="w-5/6 mx-auto " >
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-6 mx-auto">
            <div className="flex justify-center  flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
              {renderLisrCourse()}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default memo(Category)
