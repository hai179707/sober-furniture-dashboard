import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateProduct } from "~/actions/product.actions"
import Button from "../Button"
import Card from "../Card"
import CardBody from "../CardBody"
import CardHeader from "../CardHeader"

function ProductPagePrice() {
    const { product } = useSelector(state => state.productReducer)
    const dispatch = useDispatch()
    const [buyPrice, setBuyPrice] = useState(0)
    const [promotionPrice, setPromotionPrice] = useState(0)

    useEffect(() => {
        setBuyPrice(product.buyPrice)
        setPromotionPrice(product.promotionPrice)
    }, [product._id, product.buyPrice, product.promotionPrice])

    return (
        <Card>
            <CardHeader>
                <p className="font-semibold">Prices</p>
            </CardHeader>
            <CardBody>
                <div className="mb-3">
                    <label className="block font-medium">Pre-discount price</label>
                    <input
                        type='number'
                        placeholder="Pre-discount price"
                        value={buyPrice}
                        onChange={e => setBuyPrice(e.target.value)}
                        className='w-full border border-gray-bg p-2 outline-none'
                    />
                </div>
                <div className="mb-3">
                    <label className="block font-medium">Price</label>
                    <input
                        type='number'
                        placeholder="Price"
                        value={promotionPrice}
                        onChange={e => e.target.value <= buyPrice && setPromotionPrice(e.target.value)}
                        className='w-full border border-gray-bg p-2 outline-none'
                    />
                </div>
                <div className="flex justify-end">
                    {buyPrice !== product.buyPrice || promotionPrice !== product.promotionPrice
                        ?
                        <Button onClick={() => dispatch(updateProduct(product._id, { buyPrice, promotionPrice }))}>Update</Button>
                        :
                        <button className="bg-secondary-bg py-2 px-4 rounded opacity-50 pointer-events-none">Update</button>
                    }
                </div>
            </CardBody>
        </Card>
    )
}

export default ProductPagePrice