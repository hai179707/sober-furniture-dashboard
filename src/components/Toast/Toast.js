import { useEffect } from "react"
import { RiCloseLine } from 'react-icons/ri'
import { useDispatch, useSelector } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"

import { closeToast } from "~/actions"


function Toast() {
    const dispatch = useDispatch()
    const { toast } = useSelector(reduxData => reduxData.mainReducer)

    let classNames = 'fixed top-[100px] right-50 translate-x-50 sm:right-10 sm:translate-x-0 rounded-lg w-[350px] max-w-full p-4 z-[10000]'

    if(toast.type === 'success') {
        classNames = classNames.concat(' bg-green-100 text-green-700')
    }
    else if(toast.type === 'warning') {
        classNames = classNames.concat(' bg-yellow-100 text-yellow-700')
    }
    else if(toast.type === 'error') {
        classNames = classNames.concat(' bg-red-100 text-red-700')
    }
    else if(toast.type === 'info') {
        classNames = classNames.concat(' bg-blue-100 text-blue-700')
    }
    else if(toast.type === 'dark') {
        classNames = classNames.concat(' bg-gray-100 text-gray-700')
    }

    const handleClose = () => {
        dispatch(closeToast())
    }
    
    useEffect(() => {
        const duration = setTimeout(() => {
            dispatch(closeToast())
        }, toast.duration)
        return () => clearTimeout(duration)
        // eslint-disable-next-line
    }, [toast.isOpen])

    return (
        <AnimatePresence>
            {toast.isOpen
                &&
                <motion.div
                    className={classNames}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1}}
                    exit={{ opacity: 0 }}
                >
                    {toast.message}
                    <RiCloseLine className="absolute top-50 right-3 -translate-y-50 cursor-pointer" onClick={handleClose} />
                </motion.div>
            }
        </AnimatePresence>
    )
}

export default Toast