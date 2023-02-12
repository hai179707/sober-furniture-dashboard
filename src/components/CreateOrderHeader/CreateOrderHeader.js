import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { createOrder } from "~/actions/order.actions"
import routes from "~/config/routes"
import Button from "../Button"
import Card from "../Card"

function CreateOrderHeader() {
    const { newOrder } = useSelector(state => state.orderReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleCreateOrder = () => {
        dispatch(createOrder({
            ...newOrder,
            customer: newOrder.customer._id,
            products: newOrder.products.map(prod => ({ qty: prod.qty, product: prod.product._id })),
            cost: newOrder.products.reduce((total, prod) => total + prod.qty * prod.product.promotionPrice, 0)
        }, 
        newOrderCode => navigate('/orders/' + newOrderCode)))
    }

    return (
        <>
            <Card>
                <div className="flex justify-between items-center">
                    <p className="font-semibold">The progress has not been saved</p>
                    <div className="flex gap-2">
                        <Link className="bg-secondary-bg py-2 px-4 rounded" to={routes.orders}>Discard</Link>
                        <Button onClick={handleCreateOrder}>Save</Button>
                    </div>
                </div>
            </Card>
            <div className="flex my-3 justify-between">
                <div>
                    <p className="text-base font-medium">Order details</p>
                    <p className="text-secondary">PLEASE PROVIDE INFORMATION ABOUT THE ORDER THAT WILL BE CREATED</p>
                </div>
            </div>
        </>
    )
}

export default CreateOrderHeader