import { http } from "../util/setting"
import { GROUP_ID } from "./TypeSevices"

class ManagerUser {
  register = (infoUserRegister) => { // Thông tin đăng ký của người dùng
    return http.post(`/api/QuanLyNguoiDung/DangKy`, infoUserRegister)
  }
  listUser = () => { //lấy các dánh sách người dùng đã đăng ký
    return http.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}`)
  }
  login = (infoLogin) => { // thông tin người dùng đăng nhập
    return http.post(`/api/QuanLyNguoiDung/DangNhap`, infoLogin)
  }
  editAccount = (infoEdit) => { // sửa thông tin tài khoản
    return http.put(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, infoEdit)
  }
  infoUser = () => { // thông tin người dùng
    return http.post(`/api/QuanLyNguoiDung/ThongTinNguoiDung`)
  }

}
const managerUser = new ManagerUser()
export default managerUser;