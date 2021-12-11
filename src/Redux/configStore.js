import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
// install redux-thunk
import thunk from 'redux-thunk'
import CategoryCourseReducer from './reducer/CategoryCoursesReducer'
import DetailCourseReducer from './reducer/DetailCourseReducer'
import ListCourseReducer from './reducer/ListCoursesReducer'
import ListFollowCategoryRD from './reducer/ListFollowCategoryRD'
import ListFollowSearchRD from './reducer/ListFollowSearchRD'
import UserRegisterReducer from './reducer/UserRegisterReducer'
import UserLoginReducer from './reducer/UserLoginReducer'
import InformationUserRD from './reducer/InformationUserRD'
import LoadingReducer from './reducer/LoadingReducer'
import DrawerReducer from './reducer/DrawerReducer'
import UserUpdateReducer from './reducer/UserUpdateReducer'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose //có thể sử dụng redux tool
// cấu hình kho store của ứng dụng
const rootReducer = combineReducers({
  // quản lý state tổng
  CategoryCourseReducer, // nhóm các danh mục khóa học load ở header
  ListCourseReducer, // danh sách khóa học ở trang home
  ListFollowCategoryRD, // danh sách khóa học theo danh mục
  ListFollowSearchRD, // danh sách khóa học theo tìm kiếm
  DetailCourseReducer, // lấy chi tiết khóa học
  UserRegisterReducer,  // danh sách người dùng đang đăng ký
  UserLoginReducer,   // người dùng đăng nhập
  UserUpdateReducer, //  cập nhập thông tin người dùng
  InformationUserRD, //  danh sách thông tin người dùng và khóa học đã đk
  LoadingReducer, // loading
  DrawerReducer, // ẩn hiện drawer

})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))