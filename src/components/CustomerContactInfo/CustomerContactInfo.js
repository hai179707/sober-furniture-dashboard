import Card from "../Card"
import CardHeader from "../CardHeader"
import CardBody from "../CardBody"
import { RiEdit2Line } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { setEditCustomerInfoModal } from "~/actions/customer.actions"

function CustomerContactInfo() {
    const { customer } = useSelector(state => state.customerReducer)
    const dispatch = useDispatch()

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <h4 className="font-semibold">Contact information</h4>
                        <RiEdit2Line className="cursor-pointer text-base text-secondary" onClick={() => dispatch(setEditCustomerInfoModal(true))} />
                    </div>
                </CardHeader>
                <CardBody>
                    <div className="pb-3 mb-3 border-b border-gray-bg leading-6">
                        <p>Email: <span className="font-semibold">{customer.email}</span></p>
                        <p>Phone: <span className="font-semibold">{customer.phone}</span></p>
                    </div>
                    <div className="flex justify-between items-center">
                        <h4 className="font-semibold">Address</h4>
                        <RiEdit2Line className="cursor-pointer text-base text-secondary" onClick={() => dispatch(setEditCustomerInfoModal(true))}  />
                    </div>
                    <div className="my-3 text-secondary">
                        <p>{customer.fullName}</p>
                        <p>{customer.address}{customer.city && ', ' + customer.city}{customer.province && ', ' + customer.province}</p>
                    </div>
                </CardBody>
            </Card>
        </>
    )
}

export default CustomerContactInfo