import { GET_COURSE_FOLLOW_CATEGORY } from "../types/CourseTypes"

const stateDefault = {
  // dannh sách khóa học theo danh mục
  listCourseFlCategory: []
}

const ListFollowCategoryRD = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_COURSE_FOLLOW_CATEGORY: {
      return { ...state, listCourseFlCategory: action.courses }
    }
    default: return { ...state }
  }
}
export default ListFollowCategoryRD