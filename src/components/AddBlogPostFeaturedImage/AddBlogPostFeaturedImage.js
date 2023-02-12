import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { RiUploadCloud2Line } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { setNewBlogFeaturedImage } from "~/actions/blog.actions"
import { addImage } from "~/actions/image.actions"
import storage from "~/auth/firebase"
import Card from "../Card"
import CardBody from "../CardBody"
import CardHeader from "../CardHeader"

function AddBlogPostFeaturedImage() {
    const { newBlog: { featuredImage } } = useSelector(state => state.blogReducer)
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
                        dispatch(setNewBlogFeaturedImage(url))
                        dispatch(addImage({
                            url,
                            name: image.name,
                            media: image.name.split('.')[1]
                        }))
                    })
                })
        }
    }

    return (
        <Card>
            <CardHeader>
                <p className="font-semibold">Featured image</p>
            </CardHeader>
            <CardBody>
                {!!featuredImage
                    ?
                    <>
                        <div className="rounded-lg border border-dashed border-secondary-bg h-60 flex items-center overflow-hidden">
                            <img src={featuredImage} alt="featured" className="w-full" />
                        </div>
                        <div className="my-2 flex justify-between">
                            <label htmlFor="upload_featured_image" className="cursor-pointer">Change</label>
                            <button onClick={() => dispatch(setNewBlogFeaturedImage(''))} className='text-red-600'>
                                Delete
                            </button>
                        </div>
                    </>
                    :
                    <div>
                        <label htmlFor="upload_featured_image" className="border border-dashed border-secondary-bg bg-gray-bg rounded-lg h-60 flex justify-center items-center flex-col gap-y-2 cursor-pointer">
                            <RiUploadCloud2Line className="text-5xl text-secondary" />
                            <div>Upload</div>
                        </label>
                    </div>
                }
                <input
                    type='file'
                    id="upload_featured_image"
                    accept="image/*"
                    className="hidden"
                    onChange={handleUploadImage}
                />
            </CardBody>
        </Card>
    )
}

export default AddBlogPostFeaturedImage