import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { setDeleteConfirmModelShow } from "~/actions"
import { getOrder } from "~/actions/order.actions"
import OrderPageCustomer from "~/components/OrderPageCustomer"
import OrderPageHeader from "~/components/OrderPageHeader"
import OrderPagePayment from "~/components/OrderPagePayment"
import OrderPageProducts from "~/components/OrderPageProducts"
import OrderPageStatus from "~/components/OrderPageStatus"
import routes from "~/config/routes"
import DeleteConfirmModal from '~/components/DeleteConfirmModal'
import { RiDeleteBin5Line } from "react-icons/ri"

function Order() {
    const { orderId } = useParams()
    const { order } = useSelector(state => state.orderReducer)
    const { deleteConfirmModalShow } = useSelector(state => state.mainReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOrder(orderId))
    }, [orderId, dispatch])

    return (
        <div className="px-2 py-4 text-sm">
            {order
                ?
                <>
                    <OrderPageHeader />
                    <div className="flex flex-wrap py-3">
                        <div className="w-full md:w-2/3 md:pr-3">
                            <OrderPageProducts />
                            <OrderPagePayment />
                        </div>
                        <div className="w-full md:w-1/3 md:pl-3">
                            <OrderPageStatus />
                            <OrderPageCustomer />
                        </div>
                    </div>
                    {order.status === 'confirmed' || order.status === 'success'
                        ?
                        <div title={`You can not delete ${order.status} order!`}>
                            <button
                                className="rounded bg-red-600 text-white p-3 flex items-center gap-2 opacity-50 cursor-not-allowed pointer-events-none"
                            >
                                <RiDeleteBin5Line />
                                <span>Delete order</span>
                            </button>
                        </div>
                        :
                        <div>
                            <button
                                className="rounded bg-red-600 text-white p-3 flex items-center gap-2"
                                onClick={() => dispatch(setDeleteConfirmModelShow(true))}
                            >
                                <RiDeleteBin5Line />
                                <span>Delete order</span>
                            </button>
                        </div>
                    }
                    {deleteConfirmModalShow && <DeleteConfirmModal />}
                </>
                :
                <div className="flex gap-1">
                    <div>Order does not exist or has been deleted - </div>
                    <Link to={routes.orders} className='underline font-semibold'>Return orders</Link>
                </div>
            }
        </div>
    )
}

export default Order