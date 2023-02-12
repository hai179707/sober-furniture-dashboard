import { useDispatch, useSelector } from "react-redux"
import { updateOrder } from "~/actions/order.actions"
import Card from "../Card"
import CardBody from "../CardBody"
import CardHeader from "../CardHeader"

function OrderPageStatus() {
    const { order } = useSelector(state => state.orderReducer)
    const dispatch = useDispatch()

    return (
        <>
            <Card>
                {order.status === 'open'
                    &&
                    <>
                        <CardHeader>
                            <div className="font-semibold">Verify order</div>
                        </CardHeader>
                        <CardBody>
                            <p>Please verify order</p>
                            <button className="bg-black text-white rounded w-full py-3 mt-3" onClick={() => dispatch(updateOrder(order._id, { status: 'confirmed' }))}>Verify order</button>
                        </CardBody>
                    </>
                }
                {order.status === 'confirmed'
                    &&
                    <>
                        <CardHeader>
                            <div className="font-semibold">Order has been confirmed!</div>
                        </CardHeader>
                        <CardBody>
                            <button className="bg-black text-white rounded w-full py-3 mt-3" onClick={() => dispatch(updateOrder(order._id, { status: 'success', deliveryStatus: 'delivered', paymentStatus: 'paid' }))}>Complete order</button>
                            <button className="bg-secondary-bg rounded w-full py-3 mt-3" onClick={() => dispatch(updateOrder(order._id, { status: 'cancel' }))}>Cancel order</button>
                        </CardBody>
                    </>
                }
                {order.status === 'cancel'
                    &&
                    <>
                        <CardHeader>
                            <div className="font-semibold">Canceled!</div>
                        </CardHeader>
                        <CardBody>
                            <div>Order has been canceled!</div>
                        </CardBody>
                    </>
                }
                {order.status === 'success'
                    &&
                    <>
                        <CardHeader>
                            <div className="font-semibold">Completed!</div>
                        </CardHeader>
                        <CardBody>
                            <div>Order has been completed!</div>
                        </CardBody>
                    </>
                }
            </Card>
        </>
    )
}

export default OrderPageStatus