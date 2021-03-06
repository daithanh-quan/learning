import { http } from "../util/setting"
import { GROUP_ID } from "./TypeSevices"

class ManagerCourses {
  // lấy danh mục các khóa học
  getCategoryCourse = () => {
    return http.get(`/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc`)
  }
  // lấy danh sách các khóa học
  getListCourses = () => {
    return http.get(`/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=${GROUP_ID}`)
  }
  //lấy khóa học theo danh mục
  getListCourseFollowCategory = (category) => {
    return http.get(`/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${category}&MaNhom=${GROUP_ID}`)
  }
  // lấy danh mục các khóa học tìm kiếm
  getListCourseFollowSearch = (value) => {
    return http.get(`/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${value}&MaNhom=${GROUP_ID}`)
  }
  // lấy chi tiết khóa học
  getDetailCourse = (value) => {
    return http.get(`/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${value}`)
  }
  // đăng ký khóa học
  registerCourse = (data) => { // data:{ ma khóa học và tài khoản }
    return http.post(`/api/QuanLyKhoaHoc/DangKyKhoaHoc`, data)
  }
  // hủy ghi danh
  deleteCourse = (data) => { // data: tài khoản và maKhoahoc
    return http.post(`/api/QuanLyKhoaHoc/HuyGhiDanh`, data)
  }
}
const managerCourse = new ManagerCourses()
export default managerCourse