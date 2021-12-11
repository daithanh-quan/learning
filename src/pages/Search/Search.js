import React, { memo, useMemo } from 'react'
import CarouselHome from '../../components/carousel/CarouselHome';
import PaginationSearch from '../../components/pagination/PaginationSearch';
const Search = (props) => {
  let { id } = useMemo(() => props.match.params, [props])
  return (
    <div>
      <CarouselHome />
      <div className="container my-10">
        <div className="w-5/6 mx-auto ">
          <h2 className="text-left text-lg font-bold text-gray-600  px-5">Khóa học bạn đã tìm kiếm</h2>
          <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-7 mx-auto">
              <div className="-my-8 divide-y-2 divide-gray-100">
                <PaginationSearch id={id} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default memo(Search);
