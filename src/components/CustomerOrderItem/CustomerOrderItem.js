import PropTypes from 'prop-types'
import { useState } from 'react'
import { RiArrowRightSLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import CustomerOrderItemDetail from '../CustomerOrderItemDetail'

function CustomerOrderItem({ data }) {
    const [openDetail, setOpenDetail] = useState(false)

    return (
        <div className='py-3 border-b border-gray-bg'>
            <div className='flex justify-between'>
                <div>
                    <Link to={'/orders/' + data.orderCode} className='text-sky-600 hover:text-blue-600 transition-colors duration-500'>Order #{data.orderCode}</Link>
                    <p className='mt-2'>${data.cost}</p>
                </div>
                <div className='flex gap-2'>
                    <span>{new Date(data.updatedAt).toLocaleDateString()} {new Date(data.updatedAt).toLocaleTimeString()}</span>
                    <RiArrowRightSLine
                        className={
                            openDetail
                                ?
                                'text-xl cursor-pointer text-sky-600 select-none transition-transform duration-500 rotate-90'
                                :
                                'text-xl cursor-pointer text-sky-600 select-none transition-transform duration-500'
                        }
                        onClick={() => setOpenDetail(!openDetail)}
                    />
                </div>
            </div>
            {openDetail
                &&
                <CustomerOrderItemDetail data={data.products} />
            }
        </div>
    )
}

CustomerOrderItem.propTypes = {
    data: PropTypes.object.isRequired
}

export default CustomerOrderItem