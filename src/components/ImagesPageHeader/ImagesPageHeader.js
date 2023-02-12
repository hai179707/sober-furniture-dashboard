import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { useEffect } from "react"
import { useState } from "react"
import { RiAddCircleLine } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { addImage } from "~/actions/image.actions"
import storage from "~/auth/firebase"
import useDebounce from "~/hooks/useDebounce"
import Button from "../Button"
import Card from "../Card"
import SearchForm from "../SearchForm"

function ImagesPageHeader() {
    const { page, limit } = useSelector(state => state.imageReducer)
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const searchParam = new URLSearchParams(location.search).get('query')
    const [searchValue, setSearchValue] = useState(searchParam || '')

    const debounceSearchValue = useDebounce(searchValue, 500)

    useEffect(() => {
            navigate(`?page=${page}&limit=${limit}&query=${debounceSearchValue}`)
        // eslint-disable-next-line
    }, [debounceSearchValue])

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
        <div className="mb-4">
            <h3 className="font-semibold mb-4">All images</h3>
            <Card>
                <div className="flex gap-2">
                    <div className="flex-1">
                        <SearchForm value={searchValue} onChange={e => setSearchValue(e.target.value)} onClear={() => setSearchValue('')} />
                    </div>
                    <Button>
                        <label htmlFor="upload_image_btn" className="flex gap-2 items-center cursor-pointer">
                            <RiAddCircleLine />
                            <span className="hidden sm:block">Add image</span>
                        </label>
                        <input 
                            type='file'  
                            id="upload_image_btn"
                            accept="image/*"
                            className="hidden"
                            onChange={handleUploadImage}
                        />
                    </Button>
                </div>
            </Card>
        </div>
    )
}

export default ImagesPageHeader