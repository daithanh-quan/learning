import { DISPLAY_DRAWER, HIDDEN_DRAWER } from "../types/DrawerType"

const stateDefault = {
  visible: false
}

const DrawerReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case HIDDEN_DRAWER: {
      return { ...state, visible: false }
    }
    case DISPLAY_DRAWER: {
      return { ...state, visible: true }
    }
    default: return { ...state }
  }
}
export default DrawerReducer