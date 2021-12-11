import managerCourse from "../../services/ManagerCourses"
import { GET_CATEGORY_COURSE, GET_COURSE_FOLLOW_CATEGORY, GET_COURSE_FOLLOW_SEARCH, GET_DETAIL_COURSE, GET_LIST_COURSE } from "../types/CourseTypes"
import { hiddenLoadingAction, loadingAction } from "./LoadingAction";
import { getInfoUserRegistered } from "./UserAction";

export const getCategoryCourse = () => { // action lấy danh mục khóa học từ api đẩy lên categoryCourseRD 
  return async dispatch => {
    try {
      dispatch(loadingAction)
      let result = await managerCourse.getCategoryCourse()
      await dispatch({
        type: GET_CATEGORY_COURSE,
        category: result.data
      })
      dispatch(hiddenLoadingAction)
    } catch (error) {
      console.log(error);
    }
  }
};

export const getListCourse = () => { // action lấy danh sách các khóa học để đẩy lên listCourseRD
  return async dispatch => {
    try {
      let result = await managerCourse.getListCourses()
      if (result.status === 200) {
        dispatch({
          type: GET_LIST_COURSE,
          list: result.data
        })
      }
    } catch (error) {
    }
  }
}
export const getListFlCategory = (category) => { //action lấy danh sách khóa học theo danh mục, category: là danh mục ở home
  return async dispatch => {
    try {
      dispatch(loadingAction)
      let result = await managerCourse.getListCourseFollowCategory(category)
      if (result.status === 200) {
        await dispatch({
          type: GET_COURSE_FOLLOW_CATEGORY,
          courses: result.data
        })
      }
      dispatch(hiddenLoadingAction)
    } catch (error) {
    }
  }
};
export const getListFlSearch = (values) => { // action lấy danh sách khóa học theo tìm kiếm, values: giá trị của input nút search
  return async dispatch => {
    try {
      let result = await managerCourse.getListCourseFollowSearch(values)
      if (result.status === 200) {
        await dispatch({
          type: GET_COURSE_FOLLOW_SEARCH,
          courses: result.data
        })
      }
    } catch (error) {
      dispatch({  // dispatch lên lỗi nếu như không tìm thấy khóa học
        type: GET_COURSE_FOLLOW_SEARCH,
        errors: error.response.data
      })
      console.log(error);

    }
  }
}


export const getDetailCourseAction = (value) => { //action lấy chi tiết khóa học
  return async dispatch => {
    try {
      await dispatch(loadingAction)
      let result = await managerCourse.getDetailCourse(value)
      await dispatch({
        type: GET_DETAIL_COURSE,
        detail: result.data
      })
      dispatch(hiddenLoadingAction)
    } catch (error) {
      console.log(error);
    }
  }
};

export const registerCourseAction = (data) => { // action đăng ký khóa học
  return async dispatch => {
    try {
      await dispatch(loadingAction)
      await managerCourse.registerCourse(data)
      dispatch(hiddenLoadingAction)
    } catch (error) {
      dispatch(hiddenLoadingAction)
      console.log(error);
    }
  }
}

export const deleteCourseAction = (data) => { // action hủy đăng ký khóa học
  return async dispatch => {
    try {
      dispatch(loadingAction)
      await managerCourse.deleteCourse(data)
      await dispatch(getInfoUserRegistered())
      dispatch(hiddenLoadingAction)
    } catch (error) {
      dispatch(hiddenLoadingAction)
      console.log(error);
    }
  }
}