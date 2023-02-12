import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { updateCustomer } from "~/actions/customer.actions"
import AccountHeader from "~/components/AccountHeader"
import Card from "~/components/Card"
import CardBody from "~/components/CardBody"
import CardHeader from "~/components/CardHeader"
import routes from "~/config/routes"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import storage from "~/auth/firebase"
import { useEffect, useState } from "react"
import Button from "~/components/Button"

function Account() {
    const { user } = useSelector(reduxData => reduxData.authReducer)
    const dispatch = useDispatch()

    const [displayName, setDisplayName] = useState(user.displayName)
    const [fullName, setFullName] = useState(user.fullName)
    const [phone, setPhone] = useState(user.phone)
    const [changed, setChanged] = useState(false)

    const handleChange = e => {
        const image = e.target.files[0]

        const storageRef = ref(storage, `/shop24h/${image.name}`)
        const uploadTask = uploadBytesResumable(storageRef, image)

        uploadTask.on(
            "state_changed",
            (snapshot) => { },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    dispatch(updateCustomer(user._id, {
                        photoURL: url
                    }))
                })
            })
    }

    useEffect(() => {
        setChanged(!!(
            displayName !== user.displayName
            || fullName !== user.fullName
            || phone !== user.phone
        ))
        // eslint-disable-next-line
    }, [displayName, fullName, phone])

    const handleSave = () => {
        dispatch(updateCustomer(user._id, {
            displayName,
            fullName,
            phone
        }))
    }


    return (
        <AccountHeader>
            <div className="my-3">
                <ul className="py-3 flex border-y border-secondary-bg gap-4">
                    <li><Link className='ct-account-nav-item active' to={routes.account}>General</Link></li>
                    <li><Link className='ct-account-nav-item' to={routes.security}>Security</Link></li>
                </ul>
            </div>
            <div className="my-3">
                <Card>
                    <CardHeader>Details</CardHeader>
                    <CardBody>
                        <div className="flex gap-5 border-b border-gray-bg pb-5 pt-2">
                            <div className="w-12 h-12 min-w-[48px] rounded-full overflow-hidden flex items-center">
                                <img src={user.photoURL} alt='avatar' width='100%' />
                            </div>
                            <label htmlFor="upload" className="h-12 px-3 border border-gray-bg hover:bg-gray-bg transition-colors duration-500 cursor-pointer flex items-center">Change image</label>
                            <input id='upload' className="opacity-0" type="file" accept="image/*" onChange={handleChange} />
                        </div>
                        <div className="my-5">
                            <div className="flex flex-wrap mb-2">
                                <div className="w-full sm:w-1/2 sm:pr-10">
                                    <label className="block">Display name</label>
                                    <input className="p-3 border border-secondary-bg w-full my-2 rounded-md outline-none" type='text' value={displayName} onChange={e => setDisplayName(e.target.value)} />
                                </div>
                                <div className="w-full sm:w-1/2 sm:pr-10">
                                    <label className="block">Full name</label>
                                    <input className="p-3 border border-secondary-bg w-full my-2 rounded-md outline-none" type='text' value={fullName} onChange={e => setFullName(e.target.value)} />
                                </div>
                            </div>
                            <div className="flex flex-wrap mb-2">
                                <div className="w-full sm:w-1/2 sm:pr-10">
                                    <label className="block">Username</label>
                                    <input className="p-3 border border-secondary-bg w-full my-2 rounded-md outline-none cursor-not-allowed" type='text' value={user.username} disabled />
                                </div>
                                <div className="w-full sm:w-1/2 sm:pr-10">
                                    <label className="block">Phone number</label>
                                    <input className="p-3 border border-secondary-bg w-full my-2 rounded-md outline-none" type='text' value={phone} onChange={e => setPhone(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className={changed ? "transition-opacity duration-500" : "opacity-70 pointer-events-none transition-opacity duration-500 select-none"} onClick={handleSave}>
                            <Button>Save</Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </AccountHeader>
    )
}

export default Account