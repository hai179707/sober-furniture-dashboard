import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Card from "../Card"
import CardBody from "../CardBody"
import CardHeader from "../CardHeader"

function CustomerTotal() {
    const { customer } = useSelector(state => state.customerReducer)

    const orderTotal = customer.orders.reduce((total, order) => total + order.cost, 0)

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-5">
                        <div className="w-12 h-12 min-w-[48px] flex items-center overflow-hidden rounded-full">
                            <img src={customer.photoURL} width='100%' alt="avatar" />
                        </div>
                        <h3 className="uppercase font-semibold text-base">{customer.fullName}</h3>
                    </div>
                </CardHeader>
                {customer.orders[0]
                    &&
                    <CardBody>
                        <div className="flex flex-wrap text-center text-secondary gap-y-5">
                            <div className="w-full sm:w-1/3">
                                <Link to={'/orders/' + customer.orders[0].orderCode} className='text-blue-600 block'>Lastest order</Link>
                                <Link to={'/orders/' + customer.orders[0].orderCode} className="font-semibold my-1 sm:my-3 text-black block">#{customer.orders[0].orderCode}</Link>
                                <p>{new Date(customer.orders[0].updatedAt).toLocaleDateString()} {new Date(customer.orders[0].updatedAt).toLocaleTimeString()}</p>
                            </div>
                            <div className="w-full sm:w-1/3">
                                <p>Total spent</p>
                                <p className="font-semibold my-1 sm:my-3 text-black">
                                    ${orderTotal}
                                </p>
                                <p>{customer.orders.length} order(s)</p>
                            </div>
                            <div className="w-full sm:w-1/3">
                                <p>Average value of the order</p>
                                <p className="font-semibold my-1 sm:my-3 text-black">
                                    ${Math.ceil(orderTotal / customer.orders.length) || 0}
                                </p>
                            </div>
                        </div>
                    </CardBody>
                }
            </Card>
        </>
    )
}

export default CustomerTotal