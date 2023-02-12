import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Card from "../Card"
import CardBody from "../CardBody"
import CardHeader from "../CardHeader"
import CustomerOrderItem from "../CustomerOrderItem"

function CustomerOrders() {
    const { customer } = useSelector(state => state.customerReducer)

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex justify-between">
                        <p className="font-semibold">Orders</p>
                        <Link to={'/orders?customer_id=' + customer._id} className="text-blue-600">View all</Link>
                    </div>
                </CardHeader>
                <CardBody>
                    {customer.orders.length
                        ?
                        customer.orders.map(order => (
                            <CustomerOrderItem key={order._id} data={order} />
                        ))
                        :
                        <div>This customer hasn’t placed any orders yet.</div>
                    }
                </CardBody>
            </Card>
        </>
    )
}

export default CustomerOrders