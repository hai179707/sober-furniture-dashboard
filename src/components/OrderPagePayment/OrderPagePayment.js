import { useState } from "react"
import { MdOutlinePayments } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { updateOrder } from "~/actions/order.actions"
import Card from "../Card"
import CardBody from "../CardBody"
import CardHeader from "../CardHeader"

function OrderPagePayment() {
    const { order } = useSelector(state => state.orderReducer)
    const dispatch = useDispatch()
    const [note, setNote] = useState(order.note)

    return (
        <Card>
            <CardHeader>
                <div className="capitalize font-semibold">Payment: {order.paymentStatus}</div>
            </CardHeader>
            <CardBody>
                <div className="flex flex-wrap gap-y-4">
                    <div className="w-full md:w-1/2 sm:pr-5">
                        <p className="font-medium">Notes</p>
                        <textarea
                            type='text'
                            value={note}
                            onChange={e => setNote(e.target.value)}
                            placeholder='Note for order'
                            className="border border-secondary-bg w-full px-3 py-2 rounded outline-none mt-3 focus:border-black resize-none small-scroll"
                        >
                        </textarea>
                        <div className="flex justify-end mt-3">
                            {note !== order.note
                                ?
                                <button
                                    className="bg-black text-white rounded px-4 py-2"
                                    onClick={() => dispatch(updateOrder(order._id, { note: note }))}
                                >
                                    Update
                                </button>
                                :
                                <button
                                    className="bg-secondary-bg rounded px-4 py-2"
                                >
                                    Update
                                </button>
                            }
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="flex justify-between py-2">
                            <span>Quantity</span>
                            <span>{order.products.reduce((sum, prod) => sum + prod.qty, 0)}</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span>Total</span>
                            <span>${order.cost}</span>
                        </div>
                        <div className="text-secondary">Cash on delivery (COD)</div>
                        <div className="flex justify-between py-2">
                            <span>Paid</span>
                            <span>{order.paymentStatus}</span>
                        </div>
                        {order.status !== 'cancel'
                            &&
                            <>
                                {order.paymentStatus === 'unpaid'
                                    ?
                                    <div className="flex justify-center sm:justify-end py-2">
                                        <button
                                            className='px-3 py-2 w-full sm:w-auto lg:px-4 lg:py-3 bg-black text-white rounded flex gap-2 items-center justify-center'
                                            onClick={() => dispatch(updateOrder(order._id, { paymentStatus: 'paid' }))}
                                        >
                                            <MdOutlinePayments />
                                            <span>Confirm payment | ${order.cost}</span>
                                        </button>
                                    </div>
                                    :
                                    <div className="text-right font-semibold">Payment confirmation</div>
                                }
                            </>}
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default OrderPagePayment