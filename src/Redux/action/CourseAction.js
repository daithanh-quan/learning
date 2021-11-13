import managerCourse from "../../services/ManagerCourses"
import { GET_CATEGORY_COURSE, GET_COURSE_FOLLOW_CATEGORY, GET_COURSE_FOLLOW_SEARCH, GET_DETAIL_COURSE, GET_LIST_COURSE } from "../types/CourseTypes"

export const getCategoryCourse = () => { // action lấy danh mục khóa học từ api đẩy lên categoryCourseRD 
  return async dispatch => {
    try {
      let result = await managerCourse.getCategoryCourse()
      dispatch({
        type: GET_CATEGORY_COURSE,
        category: result.data
      })
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
      console.log(error);

    }
  }
}
export const getListFlCategory = (category) => { //action lấy danh sách khóa học theo danh mục, category: là danh mục ở home
  return async dispatch => {
    try {
      let result = await managerCourse.getListCourseFollowCategory(category)
      if (result.status === 200) {
        dispatch({
          type: GET_COURSE_FOLLOW_CATEGORY,
          courses: result.data
        })
      }
    } catch (error) {
      console.log(error);

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
      let result = await managerCourse.getDetailCourse(value)
      dispatch({
        type: GET_DETAIL_COURSE,
        detail: result.data
      })
    } catch (error) {
      console.log(error);
    }
  }
}