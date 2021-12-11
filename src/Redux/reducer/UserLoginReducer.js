import { accessToken, GET_LIST_USERS, INFO_USER, SAVE_ACCESS, USER_LOGIN } from "../types/UserType";
// lấy thông tin đăng ký từ localStorage
let infoUser = JSON.parse(localStorage.getItem(INFO_USER))
const stateDefault = {
  listUser: [], //  danh sách người dùng đã đăng ký trước đó
  infoUser: infoUser,
  isAccountLogin: true, // kiểm tra tài khoản có tồn tại không
  isPasswordLogin: true, // kiểm tra Password có đúng không
}



const UserLoginReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_LIST_USERS: {
      return { ...state, listUser: action.listInfoUser }
    }
    case USER_LOGIN: {
      // kiểm tra trong mảng danh sách ngươi dùng đã có tài khoản và mật khẩu trước đó chưa
      let { taiKhoan, matKhau } = action.infoLogin
      state.isAccountLogin = state.listUser.some(user => user.taiKhoan === taiKhoan)
      state.infoUser.matKhau === matKhau ? state.isPasswordLogin = true : state.isPasswordLogin = false
      return { ...state }
    }
    case SAVE_ACCESS: {
      // lưu accessToken trên localStorage 
      localStorage.setItem(accessToken, action.access)
      return { ...state }
    }

    default: return { ...state }
  }
}
export default UserLoginReducer;