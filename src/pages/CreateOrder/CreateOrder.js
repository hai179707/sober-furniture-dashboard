import CreateOrderContent from "~/components/CreateOrderContent"
import CreateOrderHeader from "~/components/CreateOrderHeader"

function CreateOrder() {
    return (
        <div className="px-2">
            <CreateOrderHeader />
            <CreateOrderContent />
        </div>
    )
}

export default CreateOrder