import { useDispatch, useSelector } from "react-redux"
import { updateOrder } from "~/actions/order.actions"
import Button from "../Button"
import Card from "../Card"
import CardBody from "../CardBody"
import CardHeader from "../CardHeader"

function OrderPageProducts() {
    const { order } = useSelector(state => state.orderReducer)
    const dispatch = useDispatch()

    return (
        <Card>
            <CardHeader>
                <div className="font-semibold">
                    {order.products.every(prod => prod.product.amount >= prod.qty)
                        ?
                        <div>Ready to deliver</div>
                        :
                        <div>A product is out of stock</div>
                    }
                </div>
            </CardHeader>
            <CardBody>
                <div className="flex font-medium">
                    <div className="sm:w-1/2 w-2/3"></div>
                    <div className="w-1/6 text-center">Qty</div>
                    <div className="w-1/6 text-center hidden sm:block">Price</div>
                    <div className="w-1/6 text-right">Total</div>
                </div>
                {order.products.map(prod => (
                    <div className="flex py-5 border-b border-secondary-bg" key={prod.product._id}>
                        <div className="sm:w-1/2 w-2/3 flex">
                            <div className="w-14 min-w-[56px] rounded overflow-hidden">
                                <img src={prod.product.images[0]} alt='product' width='100%' />
                            </div>
                            <div className="pl-3">
                                <p className="font-semibold">{prod.product.name}</p>
                                <p className="text-secondary">In stock: {prod.product.amount}</p>
                            </div>
                        </div>
                        <div className="w-1/6 text-center">{prod.qty}</div>
                        <div className="w-1/6 text-center hidden sm:block">${prod.product.promotionPrice}</div>
                        <div className="w-1/6 text-right">${prod.qty * prod.product.promotionPrice}</div>
                    </div>
                ))}
                <div className="flex justify-end pt-4">
                    {order.status === 'cancel'
                        ?
                        <div>Order is canceled!</div>
                        :
                        <>
                            {order.deliveryStatus === 'not shipped yet' && <Button onClick={() => dispatch(updateOrder(order._id, { deliveryStatus: 'delivering' }))}>Delivery</Button>}
                            {order.deliveryStatus === 'delivering' && <Button onClick={() => dispatch(updateOrder(order._id, { deliveryStatus: 'delivered', status: 'success' }))}>Complete order</Button>}
                            {order.deliveryStatus === 'delivered' && <div>Order is completed!</div>}
                        </>
                    }
                </div>
            </CardBody>
        </Card>
    )
}

export default OrderPageProducts