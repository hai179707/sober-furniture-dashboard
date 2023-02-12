import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { RiCloseLine, RiDeleteBin5Line, RiFileDownloadFill, RiLink } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import Card from "~/components/Card"
import CardBody from "~/components/CardBody"
import CardHeader from "~/components/CardHeader"
import { openToast } from "~/actions"
import { deleteImage, setImage, setViewImageModalShow } from "~/actions/image.actions"
import PageAndLimitController from "../PageAndLimitController"

function ImagesPageContent() {
    const { images, image, page, total, limit, viewImageModalShow } = useSelector(state => state.imageReducer)
    const dispatch = useDispatch()
    const [deleteModal, setDeleteModal] = useState(false)

    const handleCopyUrl = url => {
        navigator.clipboard.writeText(url)
        dispatch(openToast({ message: "Copied to clipboard!", type: 'success' }))
    }

    const handleOpenImageModal = image => {
        dispatch(setImage(image))
        dispatch(setViewImageModalShow(true))
    }

    const handleOpenConfirmModal = image => {
        dispatch(setImage(image))
        setDeleteModal(true)
    }

    const handleDeleteImage = () => {
        dispatch(deleteImage(image._id))
        setDeleteModal(false)
    }

    return (
        <>
            <Card>
                <div className="flex py-3 px-2 border-b border-secondary-bg">
                    <div className="w-1/2 flex gap-2">
                        <div className="w-12"></div>
                        <div className="w-12">Name</div>
                    </div>
                    <div className="w-1/4 text-center hidden md:block">Date added</div>
                    <div className="w-1/6 text-center">URL</div>
                    <div className="w-1/12"></div>
                </div>
                {!!images.length && images.map(image => (
                    <div className="flex items-center py-3 px-2 border-b border-gray-bg hover:bg-gray-bg transition-colors duration-500 cursor-pointer" key={image._id}>
                        <div className="w-1/2 flex-1 md:flex-auto flex gap-2 items-center overflow-hidden" onClick={() => handleOpenImageModal(image)}>
                            <div className="w-12 h-12 min-w-[48px] rounded border border-secondary-bg bg-white flex items-center overflow-hidden">
                                <img src={image.url} alt={image.name} width='100%' />
                            </div>
                            <div>
                                <p className="break-words">{image.name}</p>
                                <p className="uppercase">{image.media}</p>
                            </div>
                        </div>
                        <div className="w-1/4 text-center hidden md:block">{image.createdAt.split('T')[0].split('-').join('/')} {image.createdAt.split('T')[1].split('.')[0]}</div>
                        <div className="w-1/6 text-center">
                            <button className="p-2 border border-secondary-bg rounded" title="Copy image url" onClick={handleCopyUrl}><RiLink /></button>
                        </div>
                        <div className="w-1/12">
                            <button className="p-2 bg-red-600 text-white rounded" title="Delete image" onClick={() => handleOpenConfirmModal(image)}><RiDeleteBin5Line /></button>
                        </div>
                    </div>
                ))}
                <PageAndLimitController total={total} page={page} limit={limit} />
            </Card>
            <AnimatePresence>
                {viewImageModalShow
                    &&
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, duration: 0.3 }}
                        exit={{ opacity: 0, duration: 0.3 }}
                        className='fixed z-10 top-0 left-0 h-screen w-screen bg-black01 flex justify-center items-center text-sm'
                    >
                        <div className="w-full px-2 sm:px-0 sm:w-1/2">
                            <Card>
                                <CardHeader>
                                    <div className="flex justify-end text-base">
                                        <RiCloseLine className="cursor-pointer text-xl" onClick={() => dispatch(setViewImageModalShow(false))} />
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <div className="p-2 bg-gray-bg rounded-md overflow-hidden">
                                        <div style={{ backgroundImage: `url(${image.url})` }} className='h-72 bg-contain bg-center bg-no-repeat'></div>
                                        <div className="px-2 pt-4 flex justify-between">
                                            <div className="w-2/3">
                                                <p className="uppercase font-semibold break-words">{image.name}</p>
                                                <p className="text-secondary">{image.createdAt.split('T')[0].split('-').join('/')} {image.createdAt.split('T')[1].split('.')[0]} • {image.media.toUpperCase()}</p>
                                            </div>
                                            <div>
                                                <a href={image.url} target='_blank' rel="noreferrer" download><RiFileDownloadFill className="text-xl" /></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-3 pt-3 border-t border-secondary-bg">
                                        <button className="px-3 py-2 bg-secondary-bg rounded" onClick={() => dispatch(setViewImageModalShow(false))}>Close</button>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
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
                                    <div className="my-3">Are you sure you want to delete this image?</div>
                                    <div className="flex justify-end gap-5 mt-5">
                                        <button className="py-2 px-4 bg-secondary-bg rounded font-semibold" onClick={handleDeleteImage}>Confirm</button>
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

export default ImagesPageContent