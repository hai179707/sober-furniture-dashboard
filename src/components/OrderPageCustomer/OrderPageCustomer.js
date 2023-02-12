import { RiEdit2Line } from "react-icons/ri"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import routes from "~/config/routes"
import Card from "../Card"
import CardBody from "../CardBody"
import CardHeader from "../CardHeader"

function OrderPageCustomer() {
    const { order } = useSelector(state => state.orderReducer)

    return (
        <Card>
            <CardHeader>
                <div className="font-semibold">Customer</div>
            </CardHeader>
            <CardBody>
                <div className="border-b border-secondary-bg pb-3">
                    <Link to={routes.customers + '/' + order.customer._id} className='text-blue-600'>{order.customer.fullName}</Link>
                    <div className='flex justify-between my-3'>
                        <span className='border-b border-dashed border-secondary'>Ordered:</span>
                        <span className='font-semibold'>{order.customer.orders.length} Order(s)</span>
                    </div>
                </div>
                <div className="py-3">
                    <div className="flex justify-between items-center font-semibold">
                        <span>Shipment Details</span>
                        <Link to={routes.customers + '/' + order.customer._id}><RiEdit2Line /></Link>
                    </div>
                    <div className="pt-3">{order.customer.fullName}</div>
                    <div className="pt-3">{order.customer.phone}</div>
                    <div className="font-semibold mt-5">Shipping address</div>
                    <div className="pt-3">{order.customer.address + ', ' + order.customer.city + ', ' + order.customer.province}</div>
                </div>
            </CardBody>
        </Card>
    )
}

export default OrderPageCustomer