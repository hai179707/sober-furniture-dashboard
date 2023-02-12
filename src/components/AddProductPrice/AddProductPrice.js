import { useDispatch, useSelector } from "react-redux"
import { setNewProductBuyPrice, setNewProductPromotionPrice } from "~/actions/product.actions"
import Card from "../Card"
import CardBody from "../CardBody"
import CardHeader from "../CardHeader"

function AddProductPrice() {
    const { newProduct } = useSelector(state => state.productReducer)
    const dispatch = useDispatch()

    return (
        <Card>
            <CardHeader>
                <p className="font-semibold">Prices</p>
            </CardHeader>
            <CardBody>
                <div className="mb-3">
                    <label className="block font-medium">Pre-discount price*</label>
                    <input
                        type='number'
                        placeholder="Pre-discount price"
                        value={newProduct.buyPrice}
                        onChange={e => dispatch(setNewProductBuyPrice(e.target.value))}
                        className='w-full border border-gray-bg p-2 outline-none'
                    />
                </div>
                <div className="mb-3">
                    <label className="block font-medium">Price*</label>
                    <input
                        type='number'
                        placeholder="Price"
                        value={newProduct.promotionPrice}
                        onChange={e => e.target.value <= newProduct.buyPrice && dispatch(setNewProductPromotionPrice(e.target.value))}
                        className='w-full border border-gray-bg p-2 outline-none'
                    />
                </div>
            </CardBody>
        </Card>
    )
}

export default AddProductPrice