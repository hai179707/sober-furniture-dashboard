import PropTypes from 'prop-types'
import { useState } from 'react'
import { RiArrowRightSFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

import routes from '~/config/routes'
import OrderItemDetail from '~/components/OrderItemDetail'

function OrderItem({ data }) {
    const [openDetail, setOpenDetail] = useState(false)

    return (
        <div className='py-3 border-b border-gray-bg'>
            <div className='flex items-center'>
                <span className='px-1 w-5 sm:w-7 text-base cursor-pointer' onClick={() => setOpenDetail(!openDetail)}>
                    <RiArrowRightSFill className={openDetail ? 'rotate-90 transition-transform duration-500' : 'rotate-0 transition-transform duration-500'} />
                </span>
                <span className='px-1 flex-1 min-[320px]:flex-0 min-[320px]:w-1/4 sm:w-1/6 lg:w-1/12 text-blue-600'>
                    <Link to={routes.orders + '/' + data.orderCode}>#{data.orderCode}</Link>
                </span>
                <span className='px-1 flex-1 sm:w-1/6 xl:w-1/12 hidden min-[320px]:block text-xs sm:text-sm'>
                    <span className='block'>{new Date(data.createdAt).toLocaleDateString()}</span>
                    <span className='xs:hidden text-sm'>{data.customer.fullName}</span>
                </span>
                <span className='px-1 flex-1 hidden xs:block'>{data.customer.fullName}</span>
                <span className='px-1 w-1/6 hidden sm:block'>{data.paymentStatus}</span>
                <span className='px-1 w-1/6 hidden sm:block'>{data.deliveryStatus}</span>
                <span className='px-1 w-1/6 sm:w-1/12 text-right'>${data.cost}</span>
            </div>
            {openDetail
                &&
                <OrderItemDetail data={data._id} />
            }
        </div>
    )
}

OrderItem.propTypes = {
    data: PropTypes.object.isRequired
}

export default OrderItem