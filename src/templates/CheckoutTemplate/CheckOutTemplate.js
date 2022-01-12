import React from 'react'
import { Redirect, Route } from 'react-router'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import { accessToken } from '../../Redux/types/UserType'
// Hometemplate để dựa vào các component truyền vào ở file app.js để render 
// tránh việc lặp code nếu chuyển qua nhiều trang mà có phần header và footer
const CheckoutTemplate = (props) => {
  if (!localStorage.getItem(accessToken)) {
    <Redirect to="/dangnhap" exact />
  }
  const { Component, ...restProps } = props
  return (
    <Route {...restProps} render={(propRoute) => {
      return <>
        <Header {...propRoute} />
        <Component {...propRoute} />
        <Footer />
      </>
    }}>
    </Route>
  )
}

export default CheckoutTemplate;