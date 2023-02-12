import CustomerContactInfo from "../CustomerContactInfo"
import CustomerOrders from "../CustomerOrders"
import CustomerTotal from "../CustomerTotal"

function CustomerInfo() {
    return (
        <div className="flex flex-wrap">
            <div className="w-full sm:w-2/3 sm:pr-5">
                <CustomerTotal />
                <CustomerOrders />
            </div>
            <div className="w-full sm:w-1/3">
                <CustomerContactInfo />
            </div>
        </div>
    )
}

export default CustomerInfo