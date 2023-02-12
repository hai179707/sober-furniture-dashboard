import { useDispatch, useSelector } from "react-redux"
import { updateProduct } from "~/actions/product.actions"
import Button from "../Button"
import DeleteProduct from "../DeleteProduct"
import ProductPageAmount from "../ProductPageAmount"
import ProductPageGeneral from "../ProductPageGeneral"
import ProductPageImages from "../ProductPageImages"
import ProductPagePrice from "../ProductPagePrice"

function ProductPageContent() {
    const { product } = useSelector(state => state.productReducer)
    const dispatch = useDispatch()

    return (
        <div className="flex flex-wrap">
            <div className="w-full sm:w-2/3 sm:pr-2">
                <ProductPageGeneral />
                <ProductPageImages />
            </div>
            <div className="w-full sm:w-1/3 sm:pl-2">
                <ProductPagePrice />
                <ProductPageAmount />
            </div>
            <div className="w-full flex justify-between">
                <DeleteProduct />
                <Button onClick={() => dispatch(updateProduct(product._id, {...product, type: product.type._id}))} >Update</Button>
            </div>
        </div>
    )
}

export default ProductPageContent