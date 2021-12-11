import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { ImStack } from 'react-icons/im'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import * as Yup from 'yup'
import { history } from '../../App'
import { getListUserAction, userLoginAction } from '../../Redux/action/UserAction'
import { USER_LOGIN } from '../../Redux/types/UserType'
const Login = () => {
  const { isPasswordLogin, isAccountLogin } = useSelector(state => state.UserLoginReducer)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getListUserAction())
  }, [dispatch])
  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: ''
    },
    validationSchema: Yup.object().shape({
      taiKhoan: Yup.string().trim().required('Tài khoản không được bỏ trống'),
      matKhau: Yup.string().trim().required('Mật khẩu không được bỏ trống')
    }),
    onSubmit: (values) => {
      if (values) {
        // gởi lên thông tin người dùng đăng nhập
        dispatch({
          type: USER_LOGIN,
          infoLogin: values
        })
      }
      if (isAccountLogin && isPasswordLogin) {
        dispatch(userLoginAction(values))
        history.push('/')
      }
    }
  })


  return (
    <div className="lg:flex">
      <div className="lg:w-1/2 xl:max-w-screen-sm">
        <div className="py-8 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
          <div className=" flex items-center text-sky-400">
            <div>
              <ImStack className="h-16 mr-2 " />
            </div>
            <div className="text-2xl  tracking-wide ml-2 font-extrabold ">Full stack</div>
          </div>
        </div>
        <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-1 xl:px-24 xl:max-w-2xl">
          <h2 className="text-center text-3xl text-indigo-900 font-display font-semibold lg:text-left xl:text-3xl
              xl:text-bold">Đăng nhập</h2>
          <div className="mt-12">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <div className="text-sm font-bold text-gray-700 tracking-wide">Tài khoản</div>
                <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text"
                  name="taiKhoan" placeholder="thanh"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.taiKhoan && formik.errors.taiKhoan && <div className="text-red-500 text-xs">{formik.errors.taiKhoan}</div>}
                <div className="text-red-500 text-xs">{isAccountLogin === false ? 'Tài khoản không tồn tại' : ''}</div>
              </div>
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Mật khẩu
                  </div>
                </div>
                <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="password"
                  placeholder="Mật khẩu của bạn"
                  name="matKhau"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.matKhau && formik.errors.matKhau && <div className="text-red-500 text-xs">{formik.errors.matKhau}</div>}
                <div className="text-red-500 text-xs">{isPasswordLogin === false ? 'Mật khẩu không tồn tại' : ''}</div>
              </div>
              <div className="mt-10">
                <button className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                          shadow-lg"
                  type="submit"
                >
                  Đăng nhập
                </button>
              </div>
            </form>
            <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
              Bạn chưa có tài khoản ? <NavLink className="cursor-pointer text-indigo-600 hover:text-indigo-800"
                to="/dangky"
              >Đăng ký</NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-center bg-indigo-100 flex-1 h-screen">
        <img src="./img/login.png" alt="login" className="w-full h-full object-cover" />
      </div>
    </div>

  )
}

export default Login
