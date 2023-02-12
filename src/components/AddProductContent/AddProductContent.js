import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addProduct } from "~/actions/product.actions"
import AddProductAmount from "../AddProductAmount"
import AddProductGeneral from "../AddProductGeneral"
import AddProductImages from "../AddProductImages"
import AddProductPrice from "../AddProductPrice"
import Button from "../Button"

function AddProductContent() {
    const { newProduct } = useSelector(state => state.productReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <div className="flex flex-wrap">
            <div className="w-full sm:w-2/3 sm:pr-2">
                <AddProductGeneral />
                <AddProductImages />
            </div>
            <div className="w-full sm:w-1/3 sm:pl-2">
                <AddProductPrice />
                <AddProductAmount />
            </div>
            <div className="w-full flex justify-end">
                <Button onClick={() => dispatch(addProduct(newProduct, newProdId => navigate('/products/' + newProdId)))}>Save</Button>
            </div>
        </div>
    )
}

export default AddProductContent