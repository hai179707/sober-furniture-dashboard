import { Link, useNavigate } from "react-router-dom"
import Button from "../Button"
import Card from "../Card"
import routes from "~/config/routes"
import { useDispatch, useSelector } from "react-redux"
import { addProduct } from "~/actions/product.actions"

function AddProductHeader() {
    const { newProduct } = useSelector(state => state.productReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleAddProduct = () => {
        dispatch(addProduct(newProduct, newProdId => navigate('/products/' + newProdId)))
    }

    return (
        <>
            <Card>
                <div className="flex justify-between items-center">
                    <p className="font-semibold">The progress has not been saved</p>
                    <div className="flex gap-2">
                        <Link className="bg-secondary-bg py-2 px-4 rounded" to={routes.products}>Discard</Link>
                        <Button onClick={handleAddProduct}>Save</Button>
                    </div>
                </div>
            </Card>
            <h3 className="font-semibold text-xl mb-3">New product</h3>
        </>
    )
}

export default AddProductHeader