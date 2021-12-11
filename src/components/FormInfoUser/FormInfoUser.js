import { message } from 'antd'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { editInfoUserAction, getListUserAction } from '../../Redux/action/UserAction'
import { USER_UPDATE } from '../../Redux/types/UserType'
import { GROUP_ID } from '../../services/TypeSevices'
// lấy thông tin trên local
// if(localStorage.getItem(INFO_USER)) {
//   let { email, hoTen, matKhau, taiKhoan, soDT } = JSON.parse(localStorage.getItem(INFO_USER))
// }
const FormInfoUser = () => {
  let { hoTen, matKhau, soDT, taiKhoan, email } = useSelector(state => state.UserLoginReducer.infoUser)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getListUserAction())
  }, [dispatch])
  const formik = useFormik({
    initialValues: {
      taiKhoan: taiKhoan,
      email: email,
      hoTen: hoTen,
      soDT: soDT,
      matKhau: matKhau,
      maLoaiNguoiDung: 'NV',
      maNhom: GROUP_ID
    },
    validationSchema: Yup.object().shape({
      matKhau: Yup.string().trim().required('Mật khẩu không được bỏ trống').min(6, 'Mật khẩu phải trên 6 kí tự').max(32, 'Mật khẩu không quá 32 kí tự').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,8}$/, 'Mật khẩu chứa 1 kí tự đặc biệt và 1 chữ in hoa'),
      soDT: Yup.string().required('Điện thoại không được bỏ trống'),
      hoTen: Yup.string().required('Họ tên không được bỏ trống')
    }),
    onSubmit: async (values) => {

      if (formik.values.matKhau !== matKhau | formik.values.hoTen !== hoTen | formik.values.soDT !== soDT) {
        await dispatch({
          type: USER_UPDATE,
          info: values
        })
        await dispatch(editInfoUserAction(values))
        message.success('Cập nhập thành công')
      } else {
        message.error('Bạn chưa cập nhập')
      }
    },

  })


  return (
    <form className="w-full h-full pt-10 md:py-10 px-5 md:px-10 border-2 "
      onSubmit={formik.handleSubmit}
      style={{ background: 'url(../img/bgCommon2.jpg)', backgroundSize: 'center' }}
    >
      <div className=' infoUser glassesMorphin '>
        <div className="flex -mx-3 flex-wrap" >
          <div className="w-full sm:w-1/2 px-3 mb-5">
            <label className="text-xs font-semibold text-purple-500 px-1">Email</label>
            <div className="flex">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg" /></div>
              <input disabled type="text" className="w-full -ml-10 pr-3 py-2 rounded-lg border-2 border-blue-500  pl-2 outline-none " placeholder="thanh@gmail.com"
                name="email"
              />
            </div>
          </div>
          <div className="w-full sm:w-1/2 px-3 mb-5">
            <label className="text-xs font-semibold text-purple-500 px-1">Tài khoản</label>
            <div className="flex">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg" /></div>
              <input disabled type="text" className="w-full -ml-10 pl-2 pr-3 py-2 rounded-lg border-2 border-blue-500 outline-none " placeholder="abc"
                name="taiKhoan"
              />
            </div>
          </div>
        </div>
        <div className="flex -mx-3 flex-wrap">
          <div className="w-full sm:w-1/2 px-3 mb-5">
            <label className="text-xs font-semibold text-purple-500 px-1">Họ tên</label>
            <div className="flex">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg" /></div>
              <input type="text" className="w-full -ml-10 pr-3 py-2 rounded-lg border-2 border-blue-500 pl-2 outline-none " placeholder="thanh"
                name="hoTen"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.hoTen}
              />
            </div>
            {formik.touched.hoTen && formik.errors.hoTen && <div className="text-red-500 text-xs">{formik.errors.hoTen}</div>}
          </div>
          <div className="w-full sm:w-1/2 px-3 mb-5">
            <label className="text-xs font-semibold text-purple-500 px-1">Mật khẩu</label>
            <div className="flex">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg" /></div>
              <input type="password" className="w-full -ml-10 pl-2 pr-3 py-2 rounded-lg border-2 border-blue-500 outline-none " placeholder="*******"
                name="matKhau"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.matKhau}
              />
            </div>
            {formik.touched.matKhau && formik.errors.matKhau && <div className="text-red-500 text-xs">{formik.errors.matKhau}</div>}
          </div>
        </div>
        <div className="flex -mx-3 flex-wrap">
          <div className="w-full sm:w-1/2 px-3 mb-5">
            <label className="text-xs font-semibold text-purple-500 px-1">Số điện thoại</label>
            <div className="flex">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg" /></div>
              <input type="number" className="w-full -ml-10 pr-3 py-2 rounded-lg border-2 border-blue-500 pl-2 outline-none " placeholder="thanh"
                name="soDT"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.soDT}
              />
            </div>
            {formik.touched.soDT && formik.errors.soDT && <div className="text-red-500 text-xs">{formik.errors.soDT}</div>}
          </div>
          <div className="w-full sm:w-1/2 px-3 mb-5">
            <label className="text-xs font-semibold px-1"></label>
            <div className="flex justify-end ">
              <button
                type="submit" className="py-2 px-3 bg-gradient-to-br from-green-300 via-blue-500 to-purple-600 text-white rounded-lg hover:opacity-75">Cập nhập</button>
            </div>
          </div>
        </div>
      </div>

    </form>
  )
}

export default FormInfoUser
