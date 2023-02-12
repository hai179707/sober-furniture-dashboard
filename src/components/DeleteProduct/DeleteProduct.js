import { useState } from "react"
import { RiCloseLine, RiDeleteBinLine } from "react-icons/ri"
import { motion, AnimatePresence } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import Card from "../Card"
import CardHeader from "../CardHeader"
import CardBody from "../CardBody"
import { deleteProduct } from "~/actions/product.actions"

function DeleteCustomer() {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const { product } = useSelector(state => state.productReducer)
    const dispatch = useDispatch()

    return (
        <>
            <button className="text-white bg-red-600 p-3 rounded-md flex gap-2 items-center" onClick={() => setIsOpenModal(true)}>
                <RiDeleteBinLine />
                <span>Delete</span>
            </button>
            {isOpenModal
                &&
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
                                        <RiCloseLine className="cursor-pointer text-xl" onClick={() => setIsOpenModal(false)} />
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <div className="my-3">Are you sure you want to delete this product?</div>
                                    <div className="flex justify-end gap-5 mt-5">
                                        <button className="py-2 px-4 bg-secondary-bg rounded font-semibold" onClick={() => dispatch(deleteProduct(product._id))}>Confirm</button>
                                        <button className="py-2 px-4 bg-black text-white rounded" onClick={() => setIsOpenModal(false)}>Close</button>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </motion.div>
                </AnimatePresence>
            }
        </>
    )
}

export default DeleteCustomer