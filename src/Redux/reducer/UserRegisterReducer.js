import { ACCOUNT_USER, GET_LIST_USERS, INFO_USER_REGISTER } from "../types/UserType"

const stateDefault = {
  listUser: [], // danh sách người dùng đã đăng ký
  isAccount: true, // kiểm tra tài khoản có bị trung trong danh sách người dùng
  isEmail: true, // kiểm tra email có bị trùng trong danh sách người dùng
  messageAccount: '',
  messageEmail: '',
}
const UserRegisterReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_LIST_USERS: {//lấy danh sách người dùng đã đăng ký rồi
      return { ...state, listUser: action.listInfoUser }
    }
    case INFO_USER_REGISTER: {
      // kiểm tra tài khoản và email đagn đăng ký có bị trùng với tài khoản và email có trong danh sách đã đăng ký không
      let { taiKhoan, email } = action.info
      state.isAccount = state.listUser.some((user) => {
        return user.taiKhoan === taiKhoan
      })
      state.isAccount === true ? state.messageAccount = "Tài khoản đã tồn tại" : state.messageAccount = ''
      if (state.isAccount === false) localStorage.setItem(ACCOUNT_USER, ACCOUNT_USER)
      state.isEmail = state.listUser.some((user) => {
        return user.email.match(email)
      })
      state.isEmail === true ? state.messageEmail = "Email đã tồn tại" : state.messageEmail = ''
      return { ...state }
    }
    default: return { ...state }
  }
}

export default UserRegisterReducer;