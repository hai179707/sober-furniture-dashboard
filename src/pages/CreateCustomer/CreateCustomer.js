import CreateCustomerContent from "~/components/CreateCustomerContent"
import CreateCustomerHeader from "~/components/CreateCustomerHeader"

function CreateCustomer() {
    return (
        <div className="px-2">
            <CreateCustomerHeader />
            <CreateCustomerContent />
        </div>
    )
}

export default CreateCustomer