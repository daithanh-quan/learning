import { ArrowUpOutlined } from '@ant-design/icons'
import { BackTop } from 'antd'
import React from 'react'
import { Route } from 'react-router'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
// Hometemplate để dựa vào các component truyền vào ở file app.js để render 
// tránh việc lặp code nếu chuyển qua nhiều trang mà có phần header và footer
const HomeTemplate = (props) => {
  const { Component, ...restProps } = props
  return (
    <Route {...restProps} render={(propRoute) => {
      return <>
        <Header {...propRoute} />
        <Component {...propRoute} />
        <Footer />
        <BackTop>
          <div className="flex items-center justify-center bg-sky-600 text-white w-9 h-9 rounded-md"><ArrowUpOutlined /></div>
        </BackTop>
      </>
    }}>
    </Route>
  )
}

export default HomeTemplate
