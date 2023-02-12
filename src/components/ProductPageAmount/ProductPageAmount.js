import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateProduct } from "~/actions/product.actions"
import Button from "../Button"
import Card from "../Card"
import CardBody from "../CardBody"
import CardHeader from "../CardHeader"

function ProductPageAmount() {
    const { product } = useSelector(state => state.productReducer)
    const dispatch = useDispatch()
    const [amount, setAmout] = useState(0)

    useEffect(() => {
        setAmout(product.amount)
    }, [product._id, product.amount])

    return (
        <Card>
            <CardHeader>
                <p className="font-semibold">Inventory</p>
            </CardHeader>
            <CardBody>
                <div className="mb-3">
                    <label className="block font-medium">Amount</label>
                    <input
                        type='number'
                        placeholder="Pre-discount price"
                        value={amount}
                        onChange={e => e.target.value >= 0 ? setAmout(e.target.value) : setAmout(0)}
                        className='w-full border border-gray-bg p-2 outline-none'
                    />
                </div>
                <div className="flex justify-end">
                    {amount !== product.amount && amount >=0
                        ?
                        <Button onClick={() => dispatch(updateProduct(product._id, { amount }))}>Update</Button>
                        :
                        <button className="bg-secondary-bg py-2 px-4 rounded opacity-50 pointer-events-none">Update</button>
                    }
                </div>
            </CardBody>
        </Card>
    )
}

export default ProductPageAmount