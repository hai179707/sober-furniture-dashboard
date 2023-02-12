import { useDispatch, useSelector } from "react-redux"
import { setNewOrderNote, setNewOrderPaymentStatus, setNewOrderStatus } from "~/actions/order.actions"
import Card from "../Card"
import CardBody from "../CardBody"
import CardHeader from "../CardHeader"

function CreateOrderCheckout() {
    const { newOrder } = useSelector(state => state.orderReducer)
    const dispatch = useDispatch()

    return (
        <Card>
            <CardHeader>
                <p className="font-semibold">Checkout</p>
            </CardHeader>
            <CardBody>
                <div className="flex flex-wrap border-b border-secondary-bg pb-4 gap-y-4">
                    <div className="w-full sm:w-1/2 sm:pr-3">
                        <label className="block font-semibold mb-2">Note</label>
                        <textarea
                            type='text'
                            value={newOrder.note}
                            onChange={e => dispatch(setNewOrderNote(e.target.value))}
                            className='border border-secondary-bg p-3 rounded w-full resize-none outline-none'
                            placeholder="Add a note to this order"
                        ></textarea>
                    </div>
                    <div className="w-full sm:w-1/2 sm:pl-3">
                        <div className="flex justify-between pb-2">
                            <p>Quantity</p>
                            <p>{newOrder.products.reduce((total, prod) => total + +prod.qty, 0)}</p>
                        </div>
                        <div className="flex justify-between pb-2">
                            <p>Total payment</p>
                            <p>${newOrder.products.reduce((total, prod) => total + prod.qty * prod.product.promotionPrice, 0)}</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                    {newOrder.paymentStatus === 'unpaid'
                        ?
                        <button className="p-3 bg-black rounded text-white" onClick={() => dispatch(setNewOrderPaymentStatus('paid'))}>Mask as paid</button>
                        :
                        <button className="p-3 bg-secondary-bg rounded" onClick={() => dispatch(setNewOrderPaymentStatus('unpaid'))}>Mask as unpaid</button>
                    }
                    {newOrder.status === 'open'
                        ?
                        <button className="p-3 bg-black rounded text-white" onClick={() => dispatch(setNewOrderStatus('confirmed'))}>Mask as confirmed</button>
                        :
                        <button className="p-3 bg-secondary-bg rounded" onClick={() => dispatch(setNewOrderStatus('open'))}>Mask as open</button>
                    }
                </div>
            </CardBody>
        </Card>
    )
}

export default CreateOrderCheckout