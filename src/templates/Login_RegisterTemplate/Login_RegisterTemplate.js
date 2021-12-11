import React from 'react'
import { Route } from 'react-router'
// Hometemplate để dựa vào các component truyền vào ở file app.js để render 
// tránh việc lặp code nếu chuyển qua nhiều trang mà có phần header và footer
const Login_RegisterTemplate = (props) => {
  const { Component, ...restProps } = props
  return (
    <Route {...restProps} render={(propRoute) => {
      return <>
        <Component {...propRoute} />
      </>
    }}>
    </Route>
  )
}
export default Login_RegisterTemplate