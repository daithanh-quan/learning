import React, { Fragment, useEffect } from 'react'
import { Rate } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailCourseAction } from '../../Redux/action/CourseAction';
import { UsergroupAddOutlined, BookOutlined, SendOutlined, DollarCircleOutlined } from '@ant-design/icons'
import { history } from '../../App';
const Detail = (props) => {
  const { detailCourse, describe } = useSelector(state => state.DetailCourseReducer)
  const dispatch = useDispatch()
  let { id } = props.match.params
  useEffect(() => {
    dispatch(getDetailCourseAction(id))
  }, [dispatch, id])
  return (
    <Fragment>
      <div className="relative top-0 detail">
        <img src="../img/bannerChiTiet.jpg" alt="..." className="w-full h-80 object-cover " />
        <div className="glassesMorphin absolute top-0 w-full h-full">
          <div className="container ">
            <div className="my-24 flex justify-around">
              <div className="">
                <h1 className="text-black text-3xl font-extrabold">{detailCourse.tenKhoaHoc}</h1>
                <div>
                  <span>Lượt đánh giá: </span>
                  <Rate defaultValue={5} />
                </div>
                <button className=" my-6 px-6 py-2 border-2 bg-transparent text-orange-400
            border-orange-400 rounded-xl hover:bg-orange-400 hover:text-white duration-600" >Đăng ký</button>
              </div>
              <div >
                <img src={detailCourse.hinhAnh} className="w-30 h-28 object-cover rounded-lg" alt=""
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://picsum.photos/75/176" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-5/6 mx-auto my-7">
        <h2 className="text-4xl font-bold">Mô tả khóa học</h2>
        <p className=" text-yellow-500 ">
          <BookOutlined className="text-2xl" />
        </p>
        {/* {moTa.split('').length < 5 ? 'Khóa học này rất thích hợp cho người mới bắt đầu vào lập trình. Nếu các bạn có đam mê và sự kiên trì thì khóa học này sẽ rất dễ đối với bạn. Khóa học chuyên sâu sẽ giúp bạn nắm chắc phần kiến thức để trở thành một lập trình viên trong tương lai.' : */}
        <p className="text-xl text-blue-800">{describe !== '' ? describe : detailCourse.moTa}</p>
        <p className="text-xl text-yellow-500"><UsergroupAddOutlined /> </p>
        <p className="text-blue-800 text-xl">Học viên đang theo học : <span className="text-black">{detailCourse.soLuongHocVien <= 0 ? 300 : detailCourse.soLuongHocVien} bạn</span></p>
        <p className="text-xl text-yellow-500"><SendOutlined /> </p>
        <p className="text-blue-800 text-xl">Sau quá trình học tập, học viên có kiến thức có thể xin vào các công ty là đối tác của trung tâm</p>
        <p className="text-xl text-yellow-500"><DollarCircleOutlined /> </p>
        <p className="text-blue-800 text-xl">Lương khởi điểm của các bạn có thể lên đến 500$</p>
        <div className="text-center">
          <button className="py-2 px-6 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-xl hover:opacity-50 text-white font-semibold"
            onClick={() => {
              history.goBack()
            }}
          >
            Quay lại</button>
        </div>
      </div>
    </Fragment>
  )
}

export default Detail
