import { useFormik } from 'formik'
import React, { Fragment, useEffect } from 'react'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { getListUserAction, userRegisterAction } from '../../Redux/action/UserAction'
import { GROUP_ID } from '../../services/TypeSevices'
import { INFO_USER, INFO_USER_REGISTER } from '../../Redux/types/UserType'
import { history } from '../../App'
import { message } from 'antd'

const Register = () => {
  const dispatch = useDispatch()
  const { isAccount, isEmail, messageAccount, messageEmail } = useSelector(state => state.UserRegisterReducer)
  useEffect(() => {
    dispatch(getListUserAction())
  }, [dispatch])
  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
      confirmPassword: '',
      maNhom: GROUP_ID,
      email: "",
      soDT: '',
      hoTen: '',
    },
    validationSchema: Yup.object().shape({
      taiKhoan: Yup.string().trim().required('Tài khoản không được bỏ trống').matches(/^[a-z0-9]+$/i, 'Tài không đúng định dạng'),
      matKhau: Yup.string().trim().required('Mật khẩu không được bỏ trống').min(6, 'Mật khẩu phải trên 6 kí tự').max(32, 'Mật khẩu không quá 32 kí tự').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,8}$/, 'Mật khẩu chứa 1 kí tự đặc biệt và 1 chữ in hoa'),
      confirmPassword: Yup.string().when("matKhau", {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("matKhau")],
          "Nhập lại mật khẩu không đúng"
        )
      }),
      email: Yup.string().required('Email không được bỏ trống').matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email không đúng định dạng'),
      soDT: Yup.string().required('Điện thoại không được bỏ trống'),
      hoTen: Yup.string().required('Họ tên không được bỏ trống')
    }),
    onSubmit: (values) => {
      // dispatch lên dữ liệu để kiểm tra sự trùng email và tài khoản
      if (values) {
        dispatch({
          type: INFO_USER_REGISTER,
          info: values
        })
      }
      delete values.confirmPassword // xóa dữ liệu confirmPassword
      let newValues = values
      if (isAccount === false && isEmail === false) {
        dispatch(userRegisterAction(newValues))
        if (localStorage.getItem(INFO_USER)) return localStorage.removeItem(INFO_USER)
        localStorage.setItem(INFO_USER, JSON.stringify(newValues))
        history.push('/dangnhap')
        message.success('Đăng ký thành công')
      }
    },
  })
  return (
    <Fragment>
      <div className="min-w-screen min-h-screen bg-gradient-to-bl from-sky-400 to-blue-500 flex items-center justify-center px-5 py-5">
        <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{ maxWidth: 1000 }}>
          <div className="md:flex w-full">
            <div className="hidden md:block w-1/2  py-10 px-10">
              <img src="./img/registerBg.png" alt="" className="w-screen h-full object-cover" />
            </div>
            <form className="w-full md:w-1/2 py-10 px-5 md:px-10"
              onSubmit={formik.handleSubmit}
            >
              <div className="text-center mb-10">
                <h1 className="font-bold text-3xl text-gray-900">ĐĂNG KÝ</h1>
              </div>
              <div>
                <div className="flex -mx-3">
                  <div className="w-1/2 px-3 mb-5">
                    <label className="text-xs font-semibold px-1">Tài khoản</label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg" /></div>
                      <input type="text" className="w-full -ml-10 pr-3 py-2 rounded-lg border-2 border-gray-200 pl-2 outline-none focus:border-blue-500" placeholder="thanh"
                        name="taiKhoan"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    {formik.touched.taiKhoan && formik.errors.taiKhoan && <div className="text-red-500 text-xs">{formik.errors.taiKhoan}</div>}
                    <div className="text-red-500 text-xs">{messageAccount}</div>
                  </div>
                  <div className="w-1/2 px-3 mb-5">
                    <label className="text-xs font-semibold px-1">Mật khẩu</label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg" /></div>
                      <input type="password" className="w-full -ml-10 pl-2 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500" placeholder="*******"
                        name="matKhau"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    {formik.touched.matKhau && formik.errors.matKhau && <div className="text-red-500 text-xs">{formik.errors.matKhau}</div>}

                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-1/2 px-3 mb-5">
                    <label className="text-xs font-semibold px-1">Email</label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg" /></div>
                      <input type="email" className="w-full -ml-10 pl-2 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500" placeholder="johnsmith@example.com"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    {formik.touched.email && formik.errors.email && <div className="text-red-500 text-xs">{formik.errors.email}</div>}
                    <div className="text-red-500 text-xs">{messageEmail}</div>
                  </div>
                  <div className="w-1/2 px-3 mb-5">
                    <label className="text-xs font-semibold px-1">Nhập lại mật khẩu</label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg" /></div>
                      <input type="password" className="w-full -ml-10 pl-2 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500" placeholder="*******"
                        name="confirmPassword"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && <div className="text-red-500 text-xs">{formik.errors.confirmPassword}</div>}
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-1/2 px-3 mb-5">
                    <label className="text-xs font-semibold px-1">Họ tên</label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg" /></div>
                      <input type="text" className="w-full -ml-10 pl-2 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500" placeholder="họ tên"
                        name="hoTen"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    {formik.touched.hoTen && formik.errors.hoTen && <div className="text-red-500 text-xs">{formik.errors.hoTen}</div>}
                  </div>
                  <div className="w-1/2 px-3 mb-12">
                    <label className="text-xs font-semibold px-1">Số điện thoại</label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg" /></div>
                      <input type="number" className="w-full -ml-10 pl-2 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500" placeholder="số điện thoại"
                        name="soDT"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    {formik.touched.soDT && formik.errors.soDT && <div className="text-red-500 text-xs">{formik.errors.soDT}</div>}
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-1/2 px-3 mb-5">
                    <button className="block w-full max-w-xs mx-auto bg-blue-700 hover:bg-blue-500 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                      type="submit"
                    >
                      Đăng ký</button>
                  </div>
                  <div className="w-1/2 px-3 mb-5">
                    <button className="block w-full max-w-xs mx-auto bg-blue-700 hover:bg-blue-500 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                      type="submit"
                      onClick={() => {
                        history.push('/dangnhap')
                      }}
                    >
                      Đăng nhập</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Register
