import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import routes from "~/config/routes"
import { createCustomer } from "~/services/customerServices"
import Button from "../Button"

function CreateCustomerHeader() {
    const { newCustomer } = useSelector(state => state.customerReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <>
            <h3 className="text-xl font-semibold">Create customer</h3>
            <div className="flex my-3 justify-between">
                <div>
                    <p className="text-base font-medium">Customer information</p>
                    <p className="text-secondary">PLEASE PROVIDE INFORMATION ABOUT THE CUSTOMER</p>
                </div>
                <div className="flex gap-2 items-start sm:items-center">
                    <div className="hidden sm:block">
                        <Link className="bg-secondary-bg py-2 px-4 rounded" to={routes.customers}>Discard</Link>
                    </div>
                    <div>
                        <Button onClick={() => dispatch(createCustomer(newCustomer, customerId => navigate('/customers/' + customerId)))}>Save</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateCustomerHeader