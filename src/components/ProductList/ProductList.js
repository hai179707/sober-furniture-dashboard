import { useSelector } from "react-redux"
import ProductItem from "../ProductItem"

function ProductList() {
    const { products } = useSelector(state => state.productReducer)

    return (
        <div className="mt-3">
            <div className="flex py-3 font-semibold">
                <div className="px-1 w-2/3">Name</div>
                <div className="px-1 w-1/3 sm:1/12 text-right sm:text-center">Inventory</div>
                <div className="px-1 w-1/4 text-center hidden sm:block">Type</div>
            </div>
            {products.map(product => (
                <ProductItem data={product} key={product._id} />
            ))}
        </div>
    )
}

export default ProductList