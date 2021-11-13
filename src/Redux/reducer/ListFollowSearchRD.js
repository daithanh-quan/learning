import { EMPTY_INPUT_SEARCH, GET_COURSE_FOLLOW_SEARCH, SEARCH } from "../types/CourseTypes"

const stateDefault = {
  value: '',
  CourseFlSearch: [],
  error: ''
}

const ListFollowSearchRD = (state = stateDefault, action) => {
  switch (action.type) {
    case SEARCH: {
      return { ...state, value: action.value }
    }
    case EMPTY_INPUT_SEARCH: {
      return { ...state, value: action.value }
    }
    case GET_COURSE_FOLLOW_SEARCH: {
      if (action.course === undefined) { // nếu tìm không thấy khóa học nào
        state.error = action.errors // gán lỗi từ dispatch gởi lên
      }
      state.CourseFlSearch = action.courses
      return { ...state }
    }
    default: return { ...state }

  }
}
export default ListFollowSearchRD