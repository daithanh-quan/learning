import { DISPLAY_LOADING, HIDDEN_LOADING } from "../types/LoadingTypes";

const stateDefault = {
  isLoading: false
}

const LoadingReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case DISPLAY_LOADING: {
      state.isLoading = true
      return { ...state }
    }
    case HIDDEN_LOADING: {
      state.isLoading = false
      return { ...state }
    }
    default: return { ...state }
  }
}
export default LoadingReducer