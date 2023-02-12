import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { RiEdit2Line } from 'react-icons/ri'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { MdOutlineCancel, MdOutlinePayments } from 'react-icons/md'

import { getOrder } from '~/services/orderServices'
import { useDispatch } from 'react-redux'
import { updateOrder } from '~/actions/order.actions'

function OrderItemDetail({ data }) {
    const [order, setOrders] = useState()
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const fetchApi = async () => {
        setLoading(true)
        const res = await getOrder(data)
        if (res) setOrders(res)
        setLoading(false)
    }

    useEffect(() => {
        fetchApi()
         // eslint-disable-next-line
    }, [])

    const handleCancel = () => {
        dispatch(updateOrder(order._id, { status: 'cancel' }))
        fetchApi()
    }

    const handleVerify = () => {
        dispatch(updateOrder(order._id, { status: 'confirmed' }))
        fetchApi()
    }

    const handleComfirmPayment = () => {
        dispatch(updateOrder(order._id, { paymentStatus: 'paid' }))
        fetchApi()
    }

    const handleDelivery = deliveryStatus => {
        if(deliveryStatus === 'delivered') {
            dispatch(updateOrder(order._id, { deliveryStatus: deliveryStatus, status: 'success' }))
        } else {
            dispatch(updateOrder(order._id, { deliveryStatus: deliveryStatus }))
        }
        fetchApi()
    }

    return (
        <div className='min-h-[150px]'>
            {loading
                ?
                <div className='flex items-center justify-center h-[150px]'>
                    <div className='animate-spin text-xl'><AiOutlineLoading3Quarters /></div>
                </div>
                :
                <div className='pt-5'>
                    {!!order
                        &&
                        <>
                            <div className='flex flex-wrap gap-y-5 pb-3 border-b border-gray-bg'>
                                <div className='w-full sm:w-1/2 sm:pr-8'>
                                    <div className='h-36 overflow-y-scroll small-scroll'>
                                        {order.products.map(prod => (
                                                <div className='flex py-1' key={prod.product._id}>
                                                    <img src={prod.product.images[0]} alt='product' className='w-14 min-w-[56px]' />
                                                    <div className='flex-1 pl-3'>
                                                        <div className='flex'>
                                                            <span className='flex-1'>{prod.product.name}</span>
                                                            <span>x {prod.qty}</span>
                                                        </div>
                                                        <div className='text-right'>${prod.product.promotionPrice * prod.qty}</div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className='text-right font-semibold'>Total: ${order.cost}</div>
                                </div>
                                <div className='w-full sm:w-1/2 py-1'>
                                    <div className='font-semibold flex items-center'><span className='mr-3'>Delivery information</span><RiEdit2Line className='cursor-pointer' /></div>
                                    <p className='font-medium py-3'>{order.customer.fullName}</p>
                                    <p>{order.customer.address}, {order.customer.city}, {order.customer.province}</p>
                                    <p className='mt-2'>{order.customer.phone}</p>
                                    <ul className='py-3'>
                                        <li className='flex justify-between'><span className='border-b border-dashed border-secondary'>Ordered:</span><span className='font-semibold'>{order.customer.orders.length} Order(s)</span></li>
                                    </ul>
                                </div>
                            </div>
                            {order.status === 'cancel'
                                &&
                                <div className='mt-3 text-red-600'>Order has been cancelled!</div>
                            }
                            {(order.status === 'open' || order.status === 'confirmed')
                                &&
                                <div className='flex flex-wrap justify-between gap-2 mt-3'>
                                    <div className='flex-1 flex items-center'>
                                        {order.status === 'open'
                                            ?
                                            <button className='px-3 py-2 lg:px-4 lg:py-3 flex gap-2 items-center text-red-600' onClick={handleCancel}>
                                                <MdOutlineCancel />
                                                <span>Cancel order</span>
                                            </button>
                                            :
                                            <div className='text-blue-600'>Confirmed!</div>
                                        }
                                    </div>
                                    {order.status === 'open'
                                        &&
                                        <button onClick={handleVerify} className='px-3 py-2 lg:px-4 lg:py-3 bg-secondary-bg rounded'>Verify order</button>
                                    }
                                    {order.paymentStatus === 'unpaid'
                                        &&
                                        <button onClick={handleComfirmPayment} className='px-3 py-2 lg:px-4 lg:py-3 bg-blue-600 text-white rounded flex gap-2 items-center'><MdOutlinePayments /><span>Confirm payment | ${order.cost}</span></button>
                                    }
                                    {order.deliveryStatus === 'not shipped yet'
                                        &&
                                        <button onClick={() => handleDelivery('delivering')} className='px-3 py-2 lg:px-4 lg:py-3 bg-secondary-bg rounded'>Delivery</button>
                                    }
                                    {order.deliveryStatus === 'delivering'
                                        &&
                                        <button onClick={() => handleDelivery('delivered')} className='px-3 py-2 lg:px-4 lg:py-3 bg-green-600 text-white rounded'>Complete order</button>
                                    }
                                </div>
                            }
                            {order.status === 'success'
                                &&
                                <div className='mt-3 text-green-600'>Order completed!</div>
                            }
                        </>
                    }
                </div>

            }
        </div>
    )
}

OrderItemDetail.propTypes = {
    data: PropTypes.string.isRequired
}

export default OrderItemDetail