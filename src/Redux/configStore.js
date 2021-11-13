import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
// install redux-thunk
import thunk from 'redux-thunk'
import CategoryCourseReducer from './reducer/CategoryCoursesReducer'
import DetailCourseReducer from './reducer/DetailCourseReducer'
import ListCourseReducer from './reducer/ListCoursesReducer'
import ListFollowCategoryRD from './reducer/ListFollowCategoryRD'
import ListFollowSearchRD from './reducer/ListFollowSearchRD'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose //có thể sử dụng redux tool
// cấu hình kho store của ứng dụng
const rootReducer = combineReducers({
  // quản lý state tổng
  CategoryCourseReducer, // nhóm các danh mục khóa học load ở header
  ListCourseReducer, // danh sách khóa học ở trang home
  ListFollowCategoryRD, // danh sách khóa học theo danh mục
  ListFollowSearchRD, // danh sách khóa học theo tìm kiếm
  DetailCourseReducer // lấy chi tiết khóa học
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))