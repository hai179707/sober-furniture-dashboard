import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createCustomer } from "~/actions/customer.actions"
import Button from "../Button"
import CreateCustomerAddress from "../CreateCustomerAddress"
import CreateCustomerGeneral from "../CreateCustomerGeneral"
import CreateCustomerImage from "../CreateCustomerImage"

function CreateCustomerContent() {
    const { newCustomer } = useSelector(state => state.customerReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <div className="flex flex-wrap mt-10">
            <div className="w-full sm:w-2/3 sm:pr-2 sm:flex-1">
                <CreateCustomerGeneral />
                <CreateCustomerAddress />
            </div>
            <div className="w-full sm:w-1/3 sm:pl-2 sm:max-w-[350px]">
                <CreateCustomerImage />
            </div>
            <div className="w-full flex justify-end">
                <Button onClick={() => dispatch(createCustomer(newCustomer, customerId => navigate('/customers/' + customerId)))}>Save</Button>
            </div>
        </div>
    )
}

export default CreateCustomerContent