import Card from "../Card"
import CardBody from "../CardBody"
import CardHeader from "../CardHeader"
import { motion, AnimatePresence } from "framer-motion"
import { RiCloseLine } from "react-icons/ri"
import { setDeleteConfirmModelShow } from "~/actions"
import { useDispatch, useSelector } from "react-redux"
import { deleteOrder } from "~/actions/order.actions"

function DeleteConfirmModal() {
    const { order } = useSelector(state => state.orderReducer)
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(setDeleteConfirmModelShow(false))
    }

    const handleConfirm = () => {
        dispatch(deleteOrder(order._id))
        dispatch(setDeleteConfirmModelShow(false))
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, duration: 0.3 }}
                exit={{ opacity: 0, duration: 0.3 }}
                className='fixed z-10 top-0 left-0 h-screen w-screen bg-black01 flex justify-center items-center'
            >
                <div className="w-full px-2 sm:px-0 sm:w-1/3">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <span>Delete confirm</span>
                                <RiCloseLine className="cursor-pointer text-xl" onClick={handleClose} />
                            </div>
                        </CardHeader>
                        <CardBody>
                            <div className="my-3">Are you sure you want to delete this order?</div>
                            <div className="flex justify-end gap-5 mt-5">
                                <button className="py-2 px-4 bg-secondary-bg rounded font-semibold" onClick={handleConfirm}>Confirm</button>
                                <button className="py-2 px-4 bg-black text-white rounded" onClick={handleClose}>Close</button>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default DeleteConfirmModal