import { GET_DETAIL_COURSE } from "../types/CourseTypes"

const stateDefault = {
  detailCourse: {}, // chi tiết khóa học
  describe: '',      // mô tả khóa học nếu nó quá ngắn
}


const DetailCourseReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_DETAIL_COURSE: {
      state.detailCourse = action.detail
      // kiểm tra chiều dài của mota quá ngắn thì sẽ hiện đoạn tin nhắn
      if (action.detail.moTa.length <= 30) {
        state.describe = 'Khóa học này rất thích hợp cho người mới bắt đầu vào lập trình.Nếu các bạn có đam mê và sự kiên trì thì khóa học này sẽ rất dễ đối với bạn.Khóa học chuyên sâu sẽ giúp bạn nắm chắc phần kiến thức để trở thành một lập trình viên trong tương lai.'
      }

      return { ...state }
    }
    default: return { ...state }
  }
}
export default DetailCourseReducer