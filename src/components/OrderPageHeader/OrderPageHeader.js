import Tippy from "@tippyjs/react/headless"
import { RiArrowDownSLine } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { deleteOrder, updateOrder } from "~/actions/order.actions"

function OrderPageHeader() {
    const { order } = useSelector(state => state.orderReducer)
    const dispatch = useDispatch()

    const handleCancel = () => {
        dispatch(updateOrder(order._id, { status: 'cancel' }))
    }

    const handleDelete = () => {
        dispatch(deleteOrder(order._id))
    }

    return (
        <>
            {order
                &&
                <div className="flex justify-between">
                    <div>
                        <div className="flex items-center">
                            <div className="sm:border-r border-secondary-bg pr-3">
                                <span className="block font-semibold text-secondary text-xs">ORDER</span>
                                <span className="font-bold text-xl">#{order.orderCode}</span>
                            </div>
                            <div className="hidden sm:block border-r border-secondary-bg px-3">
                                <span className="block font-semibold text-secondary text-xs">DELIVERY STATUS</span>
                                <span className="capitalize font-semibold">{order.deliveryStatus}</span>
                            </div>
                            <div className="hidden sm:block pl-3">
                                <span className="block font-semibold text-secondary text-xs">PAYMENT STATUS</span>
                                <span className="capitalize font-semibold">{order.paymentStatus}</span>
                            </div>
                        </div>
                        <div>
                            <p className="py-2">{new Date(order.updatedAt).toLocaleDateString()} {new Date(order.updatedAt).toLocaleTimeString()}</p>
                        </div>
                    </div>
                    <div className="flex justify-end sm:block">
                        <Tippy
                            interactive
                            trigger="click"
                            placement="bottom"
                            render={attr => (
                                <>
                                    {order.status !== 'success'
                                        ?
                                        <ul {...attr} className='bg-white py-2 rounded'>
                                            {order.status !== 'cancel' && <li className="py-2 px-4 cursor-pointer transition-colors duration-500 hover:bg-gray-bg" onClick={handleCancel}>Cancel order</li>}
                                            {order.status !== 'confirmed' && <li className="py-2 px-4 cursor-pointer transition-colors duration-500 hover:bg-gray-bg" onClick={handleDelete}>Delete order</li>}
                                        </ul>
                                        :
                                        <div {...attr} className='bg-white p-2 rounded'>Have no possible action</div>
                                    }
                                </>
                            )}
                        >
                            <button className="bg-secondary-bg max-h-[45px] py-1 px-3 sm:py-2 sm:px-5 rounded flex items-center gap-2"><span>Actions</span><RiArrowDownSLine /></button>
                        </Tippy>
                    </div>
                </div>
            }
        </>
    )
}

export default OrderPageHeader