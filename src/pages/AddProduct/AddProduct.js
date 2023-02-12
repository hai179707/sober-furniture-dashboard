import AddProductContent from "~/components/AddProductContent"
import AddProductHeader from "~/components/AddProductHeader"

function AddProduct() {
    return (
        <div className="px-2">
            <AddProductHeader />
            <AddProductContent />
        </div>
    )
}

export default AddProduct