import managerUser from "../../services/ManagerUser"
import { GET_LIST_REGISTERED_COURSE, GET_LIST_USERS, SAVE_ACCESS } from "../types/UserType"
import { hiddenLoadingAction, loadingAction } from "./LoadingAction";

export const userRegisterAction = (infoUserRegister) => { // action hành động đăng ký của user
  return async (dispatch) => {
    try {
      dispatch(loadingAction)
      await managerUser.register(infoUserRegister)
      dispatch(hiddenLoadingAction)
    } catch (error) {
      dispatch(hiddenLoadingAction)
      console.log(error);
    }
  }
};

export const getListUserAction = () => { // action lấy danh sách người dùng đã đăng ký trước đó
  return async (dispatch) => {
    try {
      dispatch(loadingAction)
      let result = await managerUser.listUser()
      await dispatch({
        type: GET_LIST_USERS,
        listInfoUser: result.data
      })
      dispatch(hiddenLoadingAction)
    } catch (error) {
      console.log(error);
    }
  }
};

export const userLoginAction = (infoLogin) => { // action khi đăng nhập thành công 
  return async (dispatch) => {
    try {
      dispatch(loadingAction)
      let result = await managerUser.login(infoLogin)
      if (result.status === 200) {
        dispatch({
          type: SAVE_ACCESS,
          access: result.data.accessToken // gởi lên reducer accessToken để lưu ở local
        })
      }
      dispatch(hiddenLoadingAction)
    } catch (error) {
      dispatch(hiddenLoadingAction)
      console.log(error);
    }
  }
};

export const editInfoUserAction = (infoEdit) => { // action sửa chữa thông tin tài khoản
  return async (dispatch) => {
    try {
      dispatch(loadingAction)
      await managerUser.editAccount(infoEdit)
      dispatch(hiddenLoadingAction)
    } catch (error) {
      dispatch(hiddenLoadingAction)
      console.log(error);
    }
  }
}

export const getInfoUserRegistered = () => {
  return async (dispatch) => {
    try {
      dispatch(loadingAction)
      let result = await managerUser.infoUser()
      await dispatch({
        type: GET_LIST_REGISTERED_COURSE,
        listRegisteredCourse: result.data.chiTietKhoaHocGhiDanh
      })
      await dispatch(hiddenLoadingAction)
    } catch (error) {
      console.log(error);
    }
  }
}

