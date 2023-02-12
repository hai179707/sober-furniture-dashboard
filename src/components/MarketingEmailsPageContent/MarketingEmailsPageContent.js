import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { RiCloseLine, RiDeleteBin5Line } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { deleteMarketingEmail } from "~/actions/marketingEmail.actions"
import Card from "~/components/Card"
import CardBody from "~/components/CardBody"
import CardHeader from "~/components/CardHeader"
import PageAndLimitController from "../PageAndLimitController"

function MarketingEmailsPageContent() {
    const { marketingEmails, page, total, limit } = useSelector(state => state.marketingEmailReducer)
    const dispatch = useDispatch()
    const [deleteModal, setDeleteModal] = useState(false)
    const [currEmail, setCurrEmail] = useState('')

    const handleOpenConfirmModal = email => {
        setCurrEmail(email)
        setDeleteModal(true)
    }

    const handleDeleteEmail = () => {
        dispatch(deleteMarketingEmail(currEmail._id))
        setDeleteModal(false)
    }

    return (
        <>
            <Card>
                <div className="flex py-3 px-2 border-b border-secondary-bg">
                    <div className="w-11/12 sm:w-1/2">Email</div>
                    <div className="w-1/4 text-center hidden md:block">Date subscribed</div>
                    <div className="w-1/6 text-center hidden md:block">Has account</div>
                    <div className="w-1/12"></div>
                </div>
                {marketingEmails.map(email => (
                    <div className="flex items-center py-3 px-2 border-b border-gray-bg" key={email._id}>
                        <div className="w-11/12 sm:w-1/2 overflow-hidden">{email.email}</div>
                        <div className="w-1/4 text-center hidden md:block">{email.createdAt.split('T')[0].split('-').join('/')}</div>
                        <div className="w-1/6 text-center hidden md:block">{email.hasAccount ? 'Yes' : 'No'}</div>
                        <div className="w-1/12 text-right">
                            <button className="p-2 bg-red-600 text-white rounded" title="Delete email" onClick={() => handleOpenConfirmModal(email)}><RiDeleteBin5Line /></button>
                        </div>
                    </div>
                ))}
                <PageAndLimitController total={total} page={page} limit={limit} />
            </Card>
            <AnimatePresence>
                {deleteModal
                    &&
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, duration: 0.3 }}
                        exit={{ opacity: 0, duration: 0.3 }}
                        className='fixed z-10 top-0 left-0 h-screen w-screen bg-black01 flex justify-center items-center text-sm'
                    >
                        <div className="w-full px-2 sm:px-0 sm:w-1/3">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <span>Delete confirm</span>
                                        <RiCloseLine className="cursor-pointer text-xl" onClick={() => setDeleteModal(false)} />
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <div className="my-3">Are you sure you want to delete this email?</div>
                                    <div className="flex justify-end gap-5 mt-5">
                                        <button className="py-2 px-4 bg-secondary-bg rounded font-semibold" onClick={handleDeleteEmail}>Confirm</button>
                                        <button className="py-2 px-4 bg-black text-white rounded" onClick={() => setDeleteModal(false)}>Close</button>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </>
    )
}

export default MarketingEmailsPageContent