import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import AccountHeader from "~/components/AccountHeader"
import Button from "~/components/Button"
import Card from "~/components/Card"
import CardBody from "~/components/CardBody"
import routes from "~/config/routes"

function Security() {
    const { user } = useSelector(reduxData => reduxData.authReducer)
    const [openChangePassInp, setOpenChangePassInp] = useState(false)
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        console.log({
            currentPassword,
            newPassword,
            confirmPassword
        })
    }

    return (
        <AccountHeader>
            <div className="my-3">
                <ul className="py-3 flex border-y border-secondary-bg gap-4">
                    <li><Link className='ct-account-nav-item' to={routes.account}>General</Link></li>
                    <li><Link className='ct-account-nav-item active' to={routes.security}>Security</Link></li>
                </ul>
            </div>
            <div className="my-3">
                <Card>
                    <CardBody>
                        <div className="flex mb-5 items-center">
                            <div className="w-1/2 sm:w-1/3">Roles</div>
                            <div className="w-1/2 sm:w-2/3"><span className="bg-secondary-bg py-1 px-4 rounded-md">{user.isAdmin ? 'Admin' : 'Customer'}</span></div>
                        </div>
                        <div className="flex mb-5">
                            <div className="w-1/2 sm:w-1/3 pt-2">Change password</div>
                            <div className="w-1/2 sm:w-2/3">
                                {openChangePassInp
                                    ?
                                    <div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="py-2">
                                                <label className="block">Current password</label>
                                                <input
                                                    type='password' 
                                                    placeholder="Enter current password" 
                                                    value={currentPassword}
                                                    onChange={e => setCurrentPassword(e.target.value)}
                                                    className='px-2 py-3 my-2 border border-secondary-bg w-full rounded-md outline-none'
                                                    required
                                                />
                                            </div>
                                            <div className="py-2">
                                                <label className="block">New password</label>
                                                <input
                                                    type='password' 
                                                    placeholder="Enter new password" 
                                                    value={newPassword}
                                                    onChange={e => setNewPassword(e.target.value)}
                                                    className='px-2 py-3 my-2 border border-secondary-bg w-full rounded-md outline-none'
                                                    required
                                                />
                                            </div>
                                            <div className="py-2">
                                                <label className="block">Confirm</label>
                                                <input
                                                    type='password' 
                                                    placeholder="Enter confirm password" 
                                                    value={confirmPassword}
                                                    onChange={e => setConfirmPassword(e.target.value)}
                                                    className='px-2 py-3 my-2 border border-secondary-bg w-full rounded-md outline-none'
                                                    required
                                                />
                                            </div>
                                            <Button type="submit">Change</Button>
                                        </form>
                                    </div>
                                    :
                                    <button className="bg-secondary-bg py-1 px-4 rounded-md" onClick={() => setOpenChangePassInp(true)}>Change password</button>
                                }
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </AccountHeader>
    )
}

export default Security