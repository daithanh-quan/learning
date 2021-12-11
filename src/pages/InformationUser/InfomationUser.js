import React, { useCallback, useEffect } from 'react'
import { Tabs } from 'antd';
import FormInfoUser from '../../components/FormInfoUser/FormInfoUser';
import AttendedCourse from '../../components/AttendedCourse/AttendedCourse';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoUserRegistered } from '../../Redux/action/UserAction';
import { getListCourse } from '../../Redux/action/CourseAction';
import { FILTER_COURSE } from '../../Redux/types/CourseTypes';

const { TabPane } = Tabs;
const InformationUser = () => {
  const dispatch = useDispatch()
  const { ListRegisteredCourse, listCourse, } = useSelector(state => state.InformationUserRD)
  useEffect(() => {
    dispatch(getInfoUserRegistered())
    dispatch(getListCourse())
  }, [dispatch])
  // xử lý lấy chi tiết hình ảnh và mô tả của khóa học
  const handleGetDetailRegisteredCourse = useCallback(() => {
    return listCourse?.forEach((course) => {
      ListRegisteredCourse.forEach(registerCourse => {
        if (course.maKhoaHoc.match(registerCourse.maKhoaHoc)) {
          dispatch({
            type: FILTER_COURSE,
            course: course
          })
        }
      })
    })
  }, [ListRegisteredCourse, dispatch, listCourse])
  return (
    <div className="relative top-0">
      <img src="../img/bannerThongtin.png" alt="..." className="w-full  object-cover h-96" />
      <div className="glassesMorphin absolute top-0 w-full h-96"></div>
      <div className="my-5 w-5/6 mx-auto">
        <Tabs defaultActiveKey="1" onChange={() => {
          handleGetDetailRegisteredCourse()
        }}>
          <TabPane tab="Thông tin cá nhân" key="1">
            <FormInfoUser />
          </TabPane>
          <TabPane tab="Khóa học của tôi" key="2" >
            <AttendedCourse handleGetDetailCourse={handleGetDetailRegisteredCourse} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default InformationUser
