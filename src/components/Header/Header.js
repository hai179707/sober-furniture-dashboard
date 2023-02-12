import Tippy from '@tippyjs/react/headless'
import { RiMenuFill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setSidebarShow } from '~/actions'
import { handleLogout } from '~/actions/auth.actions'
import routes from '~/config/routes'
import Breadcrumbs from '../Breadcrumbs'

function Header() {
    const dispatch = useDispatch()
    const { sidebarShow } = useSelector(state => state.mainReducer)
    const { user } = useSelector(state => state.authReducer)

    const handleSignOut = () => {
        dispatch(handleLogout())
    }

    return (
        <>
            <div className='flex justify-between py-4 px-2'>
                <Breadcrumbs className='hidden md:flex items-center' />
                <RiMenuFill className='text-xl cursor-pointer md:hidden' onClick={() => dispatch(setSidebarShow(!sidebarShow))} />
                <Link to={routes.dashboard} className='md:hidden'><img className='cursor-pointer' src='https://firebasestorage.googleapis.com/v0/b/devcamp-shop-24h-19469.appspot.com/o/shop24h%2Flogo.svg?alt=media&token=09b57337-990f-4399-a483-cc3067bd98d9' alt="brand" /></Link>
                <Tippy
                    interactive
                    hideOnClick={false}
                    offset={[0, 10]}
                    render={attrs => (
                        <ul className="drop-shadow rounded-md bg-white overflow-hidden text-sm" tabIndex="-1" {...attrs}>
                            <li className='px-4 py-2 border-b border-gray-bg'>
                                <span className='block'>{user.displayName}</span>
                                <span className='block text-secondary'>{user.email}</span>
                            </li>
                            <li className='cursor-pointer hover:bg-link-hover transition-colors duration-500'>
                                <Link to={routes.account} className='px-4 py-2 block'>Account</Link>
                            </li>
                            <li className='cursor-pointer px-4 py-2 hover:bg-link-hover transition-colors duration-500' onClick={handleSignOut}>Sign out</li>
                        </ul>
                    )}
                >
                    <div className='flex items-center gap-4 font-semibold'>
                        <div className='hidden md:block'>Sober Furniture</div>
                        <div className='w-8 h-8 rounded-full overflow-hidden flex items-center cursor-pointer'>
                            <img src={user.photoURL} alt='avatar' width={32} />
                        </div>
                    </div>
                </Tippy>
            </div>
            <div className='md:hidden pb-4 px-2'>
                <Breadcrumbs />
            </div>
        </>
    )
}

export default Header