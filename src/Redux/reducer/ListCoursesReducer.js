import { GET_LIST_COURSE } from "../types/CourseTypes"

const stateDefault = {
  listCourse: [] // danh sách các khóa học để render ra trang home carousel
}


const ListCourseReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_LIST_COURSE: {
      state.listCourse = action.list
      return { ...state }
    }

    default: return { ...state }
  }
}

export default ListCourseReducer