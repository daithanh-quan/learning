import React, { Fragment } from 'react'
import { Spin } from 'antd';
import { useSelector } from 'react-redux'
const Loading = () => {
  const { isLoading } = useSelector(state => state.LoadingReducer)
  return (
    <Fragment>
      {isLoading ? <div className="fixed z-50 top-0 left-0 flex justify-center items-center w-screen h-screen bg-white "
      >
        <Spin />
      </div> : ''}
    </Fragment>
  )
}

export default Loading
