import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { RiImageAddLine } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { setCustomerPhotoUrl } from "~/actions/customer.actions"
import storage from "~/auth/firebase"
import Card from "../Card"
import CardBody from "../CardBody"
import CardHeader from "../CardHeader"

function CreateCustomerImage() {
    const { newCustomer } = useSelector(state => state.customerReducer)
    const dispatch = useDispatch()

    const handleUploadImage = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0]
            const storageRef = ref(storage, `/shop24h/${image.name}`)
            const uploadTask = uploadBytesResumable(storageRef, image)

            uploadTask.on(
                "state_changed",
                (snapshot) => { },
                (err) => console.log(err),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        dispatch(setCustomerPhotoUrl(url))
                    })
                })
        }
    }

    return (
        <Card>
            <CardHeader>
                <p className="font-semibold">Avatar</p>
            </CardHeader>
            <CardBody>
                <div>
                    {newCustomer.photoURL
                        ?
                        <div>
                            <img src={newCustomer.photoURL} alt='avatar' className="w-full border-2 border-dashed border-gray-bg rounded" />
                            <div className="mt-4 flex justify-between">
                                <label htmlFor="upload_image" className="cursor-pointer">Change</label>
                                <button className="text-red-600" onClick={() => dispatch(setCustomerPhotoUrl(''))}>Delete</button>
                            </div>
                        </div>
                        :
                        <label
                            className="border-2 border-dashed border-gray-bg rounded min-h-[200px] flex justify-center items-center flex-col gap-y-3 cursor-pointer"
                            htmlFor="upload_image"
                        >
                            <RiImageAddLine className="text-2xl" />
                            <span>Upload image</span>
                        </label>

                    }
                    <input
                        type='file'
                        id="upload_image"
                        accept="image/*"
                        className="hidden"
                        onChange={handleUploadImage}
                    />
                </div>
            </CardBody>
        </Card>
    )
}

export default CreateCustomerImage