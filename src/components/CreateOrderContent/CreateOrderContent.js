import CreateOrderCheckout from "../CreateOrderCheckout"
import CreateOrderCustomer from "../CreateOrderCustomer"
import CreateOrderProducts from "../CreateOrderProducts"

function CreateOrderContent() {
    return (
        <div className="flex flex-wrap mt-10">
            <div className="w-full sm:w-2/3 sm:pr-2 sm:flex-1">
                <CreateOrderProducts />
                <CreateOrderCheckout />
            </div>
            <div className="w-full sm:w-1/3 sm:pl-2">
                <CreateOrderCustomer />
            </div>
        </div>
    )
}

export default CreateOrderContent