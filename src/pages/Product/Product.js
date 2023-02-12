import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import routes from "~/config/routes"
import { getProduct } from "~/actions/product.actions"
import ProductPageHeader from "~/components/ProductPageHeader"
import ProductPageContent from "~/components/ProductPageContent"

function Product() {
    const { productId } = useParams()
    const { product } = useSelector(state => state.productReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getProduct(productId))
    }, [productId, dispatch])

    return (
        <div className="px-2 py-4 text-sm">
            {product
                ?
                <>
                    <ProductPageHeader />
                    <ProductPageContent />
                </>
                :
                <div className="flex gap-1">
                    <div>Product does not exist or has been deleted - </div>
                    <Link to={routes.products} className='underline font-semibold'>Return products</Link>
                </div>
            }
        </div>
    )
}

export default Product