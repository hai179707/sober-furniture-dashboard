import { useDispatch, useSelector } from "react-redux"
import { setNewProductAmount } from "~/actions/product.actions"
import Card from "../Card"
import CardBody from "../CardBody"
import CardHeader from "../CardHeader"

function AddProductAmount() {
    const { newProduct } = useSelector(state => state.productReducer)
    const dispatch = useDispatch()

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
                        value={newProduct.amount}
                        onChange={e => e.target.value >= 0 ? dispatch(setNewProductAmount(e.target.value)) : dispatch(setNewProductAmount(0))}
                        className='w-full border border-gray-bg p-2 outline-none'
                    />
                </div>
            </CardBody>
        </Card>
    )
}

export default AddProductAmount