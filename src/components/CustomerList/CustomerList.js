import { useSelector } from "react-redux"
import CustomerItem from "../CustomerItem"

function CustomerList() {
    const { customers } = useSelector(state => state.customerReducer)

    return (
        <div className="mt-3">
            <div className="flex py-3 font-semibold">
                <div className="px-1 w-1/3 flex-1 xs:flex-auto">Customer</div>
                <div className="px-1 w-1/2 sm:w-1/6">Phone</div>
                <div className="px-1 w-1/4 hidden xs:block">Email</div>
                <div className="px-1 text-center w-1/12 hidden sm:block">Orders</div>
                <div className="px-1 text-center w-1/6 hidden sm:block">Lastest order</div>
            </div>
            {customers.map(customer => (
                <CustomerItem data={customer} key={customer._id} />
            ))}
        </div>
    )
}

export default CustomerList