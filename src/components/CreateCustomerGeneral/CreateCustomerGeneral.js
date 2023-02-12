import { useDispatch, useSelector } from "react-redux"
import { setCustomerDisplayName, setCustomerEmail, setCustomerFullName, setCustomerPhone } from "~/actions/customer.actions"
import Card from "../Card"
import CardBody from "../CardBody"
import CardHeader from "../CardHeader"

function CreateCustomerGeneral() {
    const { newCustomer } = useSelector(state => state.customerReducer)
    const dispatch = useDispatch()

    return (
        <Card>
            <CardHeader>
                <h4 className="font-semibold">General Information</h4>
            </CardHeader>
            <CardBody>
                <div className="mb-4 flex flex-wrap gap-y-4">
                    <div className="w-full sm:w-1/2 sm:pr-2">
                        <label className="block font-medium mb-2">Full name*</label>
                        <input
                            type='text'
                            placeholder="Enter full name"
                            value={newCustomer.fullName}
                            onChange={e => dispatch(setCustomerFullName(e.target.value))}
                            className='border border-gray-bg outline-none p-2 w-full rounded'
                        />
                    </div>
                    <div className="w-full sm:w-1/2 sm:pl-2">
                        <label className="block font-medium mb-2">Display name</label>
                        <input
                            type='text'
                            placeholder="Enter display name"
                            value={newCustomer.displayName}
                            onChange={e => dispatch(setCustomerDisplayName(e.target.value))}
                            className='border border-gray-bg outline-none p-2 w-full rounded'
                        />
                    </div>
                </div>
                <div className="mb-4 flex flex-wrap gap-y-4">
                    <div className="w-full sm:w-1/2 sm:pr-2">
                        <label className="block font-medium mb-2">Email*</label>
                        <input
                            type='email'
                            placeholder="Enter email"
                            value={newCustomer.email}
                            onChange={e => dispatch(setCustomerEmail(e.target.value))}
                            className='border border-gray-bg outline-none p-2 w-full rounded'
                        />
                    </div>
                    <div className="w-full sm:w-1/2 sm:pl-2">
                        <label className="block font-medium mb-2">Phone*</label>
                        <input
                            type='text'
                            placeholder="Enter phone"
                            value={newCustomer.phone}
                            onChange={e => dispatch(setCustomerPhone(e.target.value))}
                            className='border border-gray-bg outline-none p-2 w-full rounded'
                        />
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default CreateCustomerGeneral