import { INFO_USER, USER_UPDATE } from '../types/UserType'

const stateDefault = {
  infoUserUpdate: {}
}
const UserUpdateReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case USER_UPDATE: {
      state.infoUserUpdate = action.info
      localStorage.removeItem(INFO_USER)
      localStorage.setItem(INFO_USER, JSON.stringify(action.info))
      return { ...state }
    }
    default: return { ...state }
  }
}
export default UserUpdateReducer