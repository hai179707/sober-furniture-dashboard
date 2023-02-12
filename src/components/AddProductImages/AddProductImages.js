import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { useEffect } from "react"
import { useState } from "react"
import { RiDeleteBin5Line, RiImageAddLine } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { addNewProductImage, addProductImage, removeNewProductImage } from "~/actions/product.actions"
import storage from "~/auth/firebase"
import Button from "../Button"
import Card from "../Card"
import CardBody from "../CardBody"
import CardHeader from "../CardHeader"

function AddProductImages() {
    const { newProduct } = useSelector(state => state.productReducer)
    const dispatch = useDispatch()
    const [imageUrl, setImageUrl] = useState('')
    const [validUrl, setValidUrl] = useState(false)
    const [deleteImageModal, setDeleteImageModal] = useState(false)
    const [currImageId, setCurrImageId] = useState()

    useEffect(() => {
        const tester = new Image()
        tester.src = imageUrl
        tester.onload = () => setValidUrl(true)
        tester.onerror = () => setValidUrl(false)
    }, [imageUrl])

    const handleUploadImage = e => {
        const image = e.target.files[0]
        const storageRef = ref(storage, `/shop24h/${image.name}`)
        const uploadTask = uploadBytesResumable(storageRef, image)

        uploadTask.on(
            "state_changed",
            (snapshot) => { },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    dispatch(addNewProductImage(url))
                })
            })
    }

    const openDeleteImageModal = index => {
        setCurrImageId(index)
        setDeleteImageModal(true)
    }

    const handleDeleteImage = () => {
        dispatch(removeNewProductImage(currImageId))
        setDeleteImageModal(false)
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <p className="font-semibold">Images*</p>
                    <p className="text-secondary text-xs mt-2">(JPG, JPEG, PNG, GIF format, 1200px x 1425px for optimal image quality)</p>
                </CardHeader>
                <CardBody>
                    {newProduct.images.length > 0
                        ?
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                            {newProduct.images.map((image, index) => (
                                <div className="relative group" key={index}>
                                    <img src={image} alt="product" className="rounded" />
                                    <div className="absolute inset-0 rounded flex justify-center items-center cursor-pointer bg-black075 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                                        <RiDeleteBin5Line className="text-2xl text-white" onClick={() => openDeleteImageModal(index)} />
                                    </div>
                                </div>
                            ))}
                            <div>
                                <label
                                    className="rounded border border-dashed border-secondary-bg flex justify-center items-center flex-col text-secondary gap-y-2 cursor-pointer h-full min-h-[130px]"
                                    htmlFor='add_product_image'
                                >
                                    <RiImageAddLine className="text-2xl" />
                                    <span>Add image</span>
                                </label>
                                <input
                                    type='file'
                                    id='add_product_image'
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleUploadImage}
                                />
                            </div>
                        </div>
                        :
                        <div>
                            <label
                                className="rounded border border-dashed border-secondary-bg flex justify-center items-center flex-col text-secondary gap-y-2 cursor-pointer h-full min-h-[130px]"
                                htmlFor='add_product_image'
                            >
                                <RiImageAddLine className="text-2xl" />
                                <span>Add image</span>
                            </label>
                            <input
                                type='file'
                                id='add_product_image'
                                className="hidden"
                                onChange={handleUploadImage}
                            />
                        </div>
                    }
                    <div className="mt-4">
                        <label>Or add image from URL</label>
                        <div className="flex mt-3 gap-3">
                            <input
                                type='text'
                                placeholder="Insert image url"
                                value={imageUrl}
                                onChange={e => setImageUrl(e.target.value)}
                                className='flex-1 border border-gray-bg rounded p-2 outline-none'
                            />
                            {imageUrl && validUrl
                                ?
                                <Button onClick={() => dispatch(addProductImage(imageUrl))}>Add image</Button>
                                :
                                <button className="bg-secondary-bg py-2 px-4 rounded opacity-50 pointer-events-none">Add image</button>
                            }
                        </div>
                    </div>
                </CardBody>
            </Card>
            {deleteImageModal && currImageId
                &&
                <div className="fixed inset-0 flex justify-center items-center bg-black01">
                    <Card>
                        <CardHeader>
                            <p>Delete image</p>
                        </CardHeader>
                        <CardBody>
                            <div className="my-3">Are you sure to delete this image? This can not be undone</div>
                            <div className="flex justify-end gap-5 mt-5">
                                <button className="py-2 px-4 bg-secondary-bg rounded font-semibold text-red-600" onClick={handleDeleteImage}>Delete</button>
                                <button className="py-2 px-4 bg-black text-white rounded" onClick={() => setDeleteImageModal(false)}>Close</button>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            }
        </>
    )
}

export default AddProductImages