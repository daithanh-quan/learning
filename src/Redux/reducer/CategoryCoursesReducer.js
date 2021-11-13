import { GET_CATEGORY_COURSE } from "../types/CourseTypes";

const stateDefault = {
  course: []
}


const CategoryCourseReducer = (state = stateDefault, action) => {
  switch (action.type) {
    // lấy danh sách khóa học từ api gán lên cho state course
    case GET_CATEGORY_COURSE: {
      state.course = action.category
      return { ...state }
    }
    default: return { ...state }
  }
}
export default CategoryCourseReducer