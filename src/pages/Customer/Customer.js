import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { getCustomer } from "~/actions/customer.actions"
import CustomerInfo from "~/components/CustomerInfo"
import DeleteCustomer from "~/components/DeleteCustomer"
import routes from "~/config/routes"

function Customer() {
    const { customerId } = useParams()
    const { customer } = useSelector(state => state.customerReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCustomer(customerId))
    }, [customerId, dispatch])

    return (
        <div className="px-2 py-3 text-sm">
            <div className="pb-3">
                <h3 className="font-semibold text-lg">Customer information</h3>
            </div>
            {customer
                ?
                <>
                    <CustomerInfo />
                    {customer.isAdmin
                        ||
                        <DeleteCustomer />
                    }
                </>
                :
                <div className="flex gap-1">
                    <div>Customer does not exist or has been deleted - </div>
                    <Link to={routes.customers} className='underline font-semibold'>Return customers</Link>
                </div>
            }
        </div>
    )
}

export default Customer