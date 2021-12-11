import { FILTER_COURSE, GET_LIST_COURSE } from "../types/CourseTypes"
import { GET_LIST_REGISTERED_COURSE } from "../types/UserType"

const stateDefault = {
  ListRegisteredCourse: [], //  danh sách danh mục khóa học đã đăng ký
  listCourse: [], // danh sách tất cả các khóa học
  renderArrayRegisteredCourse: [] // danh sách render trực tiếp các khóa học ra ui
}
const InformationUserRD = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_LIST_COURSE: {
      state.listCourse = action.list
      return { ...state }
    }
    case GET_LIST_REGISTERED_COURSE: {
      state.ListRegisteredCourse = action.listRegisteredCourse
      return { ...state }
    }
    case FILTER_COURSE: {
      let index = state.renderArrayRegisteredCourse.findIndex(item => item.maKhoaHoc === action.course.maKhoaHoc)
      if (index !== -1) {
        return { ...state }
      } else {
        state.renderArrayRegisteredCourse.push(action.course)
      }
      return { ...state }
    }
    case 'Delete': {
      let index = state.renderArrayRegisteredCourse.findIndex(item => item.maKhoaHoc === action.course)
      state.renderArrayRegisteredCourse.splice(index, 1)
      return { ...state }
    }
    default: return { ...state }
  }
}

export default InformationUserRD