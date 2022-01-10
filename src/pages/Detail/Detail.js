import React, { Fragment, useEffect } from 'react'
import { message, Rate } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailCourseAction, registerCourseAction } from '../../Redux/action/CourseAction';
import { UsergroupAddOutlined, BookOutlined, SendOutlined, DollarCircleOutlined } from '@ant-design/icons'
import { accessToken, INFO_USER } from '../../Redux/types/UserType'
import { history } from '../../App';
import { getInfoUserRegistered } from '../../Redux/action/UserAction';
const Detail = (props) => {
  const { detailCourse, describe, isLength, ListRegisteredCourse } = useSelector(state => state.DetailCourseReducer);
  const dispatch = useDispatch()
  let { id } = props.match.params
  useEffect(() => {
    dispatch(getDetailCourseAction(id))
    dispatch(getInfoUserRegistered())
  }, [dispatch, id])
  // hàm xử lý đăng ký khóa học
  const handleRegister = async () => {
    const { taiKhoan } = JSON.parse(localStorage.getItem(INFO_USER))
    await dispatch(getInfoUserRegistered())
    let isRegister = await ListRegisteredCourse.some((course) => course.maKhoaHoc === id)
    if (!localStorage.getItem(accessToken)) {
      history.push('/dangnhap')
    } else {
      //logic kiểm tra xem khóa học đã được đăng ký chưa

      if (isRegister) {
        message.error('Khóa học này đã đăng ký rồi')
      } else {
        dispatch(registerCourseAction({
          maKhoaHoc: id,
          taiKhoan: taiKhoan
        }))
        history.goBack()
        message.success('Đăng ký khóa học thành công')

      }
    }
  }

  return (
    <Fragment>
      <div className="relative top-0 detail">
        <img src="../img/bannerChiTiet.jpg" alt="..." className="w-full h-80 object-cover " />
        <div className="glassesMorphin absolute top-0 w-full h-full">
          <div className="container ">
            <div className="my-24 flex justify-around">
              <div className="">
                <h1 className="text-black text-xl sm:text-3xl font-extrabold">{detailCourse.tenKhoaHoc}</h1>
                <div>
                  <span>Lượt đánh giá: </span>
                  <Rate defaultValue={5} />
                </div>
                <button className="my-6 px-6 py-2 border-2 bg-transparent text-orange-400
            border-orange-400 rounded-xl hover:bg-orange-400 hover:text-white duration-600"
                  onClick={() => {
                    handleRegister()
                  }}
                >Đăng ký</button>
              </div>
              <div className='hidden md:block'>
                <img src={detailCourse.hinhAnh} className="w-30 h-28 object-cover rounded-lg" alt=""
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://picsum.photos/100/176" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-5/6 mx-auto my-7 bg-opacity-10 bg-black rounded-xl">
        <div className="p-10">
          <h2 className="text-4xl font-bold text-center text-yellow-500">Mô tả khóa học</h2>
          <div className="py-4">
            <span className=" text-yellow-500 pr-3">
              <BookOutlined className="text-2xl" />
            </span>
            <span className="text-xl text-blue-800">{isLength === true ? describe : detailCourse.moTa}</span>
          </div>
          <div className="pb-4">
            <span className="text-xl text-yellow-500"><UsergroupAddOutlined /> </span>
            <span className="text-blue-800 text-xl">Học viên đang theo học : <span className="text-black">{detailCourse?.soLuongHocVien <= 0 ? 300 : detailCourse.soLuongHocVien} bạn</span></span>
          </div>
          <div className="pb-4">
            <span className="text-xl text-yellow-500"><SendOutlined /> </span>
            <span className="text-blue-800 text-xl">Sau quá trình học tập, học viên có kiến thức có thể xin vào các công ty là đối tác của trung tâm</span>
          </div>
          <div className="pb-4">
            <span className="text-xl text-yellow-500"><DollarCircleOutlined /> </span>
            <span className="text-blue-800 text-xl">Lương khởi điểm của các bạn có thể lên đến 500$</span>
          </div>
          <div className="text-right">
            <button className="py-2 px-6 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-xl hover:opacity-50 text-white font-semibold"
              onClick={() => {
                history.goBack()
              }}
            >
              Quay lại</button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Detail
