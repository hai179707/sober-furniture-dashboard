import { useEffect } from "react"
import { useState } from "react"
import { RiAddCircleLine, RiAddFill } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import useDebounce from "~/hooks/useDebounce"
import Button from "../Button"
import Card from "../Card"
import SearchForm from "../SearchForm"
import { motion, AnimatePresence } from "framer-motion"
import CardHeader from "../CardHeader"
import CardBody from "../CardBody"
import { addMarketingEmail } from "~/actions/marketingEmail.actions"

function MarketingEmailsPageHeader() {
    const { page, limit } = useSelector(state => state.marketingEmailReducer)
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const searchParam = new URLSearchParams(location.search).get('query')

    const [searchValue, setSearchValue] = useState(searchParam || '')
    const [openCreateModal, setOpenCreateModal] = useState(false)
    const [email, setEmail] = useState('')

    const debounceSearchValue = useDebounce(searchValue, 500)

    useEffect(() => {
        navigate(`?page=${page}&limit=${limit}&query=${debounceSearchValue}`)
        // eslint-disable-next-line
    }, [debounceSearchValue])

    const handleAddEmail = () => {
        dispatch(addMarketingEmail({ email }))
        setOpenCreateModal(false)
    }

    return (
        <div className="mb-4">
            <h3 className="font-semibold mb-4">All marketing emails</h3>
            <Card>
                <div className="flex gap-2">
                    <div className="flex-1">
                        <SearchForm value={searchValue} onChange={e => setSearchValue(e.target.value)} onClear={() => setSearchValue('')} />
                    </div>
                    <Button onClick={() => setOpenCreateModal(true)}>
                        <div className="flex gap-2 items-center cursor-pointer">
                            <RiAddCircleLine />
                            <span className="hidden sm:block">Add email</span>
                        </div>
                    </Button>
                </div>
            </Card>
            <AnimatePresence>
                {openCreateModal
                    &&
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, duration: 0.3 }}
                        exit={{ opacity: 0, duration: 0.3 }}
                        className='fixed z-10 top-0 left-0 h-screen w-screen bg-black01 flex justify-center items-center text-sm'
                    >
                        <div className="w-full px-2 sm:w-2/3">
                            <Card>
                                <CardHeader>
                                    <p>Add new marketing email</p>
                                </CardHeader>
                                <CardBody>
                                    <div className="flex gap-2 mt-4 mb-6">
                                        <input
                                            type='email'
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            placeholder='Enter email'
                                            className="border border-secondary rounded p-3 outline-none w-full"
                                        />
                                        <Button onClick={handleAddEmail}>
                                            <div className="flex items-center gap-2">
                                                <RiAddFill className="text-2xl" />
                                                <span>Add</span>
                                            </div>
                                        </Button>
                                    </div>
                                    <div className="flex justify-end gap-5 mt-5 pt-5 border-t border-gray-bg">
                                        <button className="py-2 px-4 bg-black text-white rounded" onClick={() => setOpenCreateModal(false)}>Close</button>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}

export default MarketingEmailsPageHeader