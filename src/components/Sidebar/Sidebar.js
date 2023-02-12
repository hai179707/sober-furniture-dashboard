import { RiCloseLine, RiEyeFill, RiGlobalLine, RiLineChartLine, RiShoppingCart2Line, RiUserLine } from "react-icons/ri"
import { HiTemplate } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { setSidebarShow } from "~/actions"
import routes from "~/config/routes"
import { useEffect } from "react"
import { getTotalOrder } from "~/services/orderServices"
import { setOrderSidebarTotal } from "~/actions/order.actions"

function Sidebar() {
    const { sidebarShow } = useSelector(state => state.mainReducer)
    const { sidebarTotal } = useSelector(state => state.orderReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSidebarShow(window.innerWidth >= 768))
        const fetchApi = async () => {
            const data = await getTotalOrder()
            dispatch(setOrderSidebarTotal(data.total))
        }
        fetchApi()

        const handleResize = () => {
            if(window.innerWidth < 768) {
                dispatch(setSidebarShow(false))
            }
            else {
                dispatch(setSidebarShow(true))
            }
        }

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className="w-[240px] max-w-screen-sm fixed top-0 bottom-0 bg-black text-white transition-all duration-500 z-10 ct-sidebar" style={{left: sidebarShow ? 0 : '-240px'}}>
                <div className="md:hidden text-xl absolute bottom-4 left-50 -translate-x-1/2 bg-white01 p-2 rounded-full" onClick={() => dispatch(setSidebarShow(false))}><RiCloseLine /></div>
                <div className="flex justify-center items-center py-5">
                    <Link to={routes.dashboard}><img className='cursor-pointer' src='https://firebasestorage.googleapis.com/v0/b/devcamp-shop-24h-19469.appspot.com/o/shop24h%2Flogo-light.svg?alt=media&token=926b3459-9d01-4fb6-80a8-53abeb09a131' alt="brand" /></Link>
                </div>
                <ul>
                    <li>
                        <NavLink onClick={() => dispatch(setSidebarShow(false))} to={routes.dashboard} className='ct-sidebar-nav-item'><RiLineChartLine /><span>General</span></NavLink>
                    </li>
                    <li>
                        <NavLink onClick={() => dispatch(setSidebarShow(false))} to={routes.orders} className='ct-sidebar-nav-item'><RiShoppingCart2Line /><span className="flex-1">Orders</span>{<span className="rounded-xl bg-white text-black px-2">{sidebarTotal}</span>}</NavLink>
                    </li>
                    <li>
                        <NavLink onClick={() => dispatch(setSidebarShow(false))} to={routes.customers} className='ct-sidebar-nav-item'><RiUserLine /><span>Customers</span></NavLink>
                    </li>
                    <li>
                        <NavLink onClick={() => dispatch(setSidebarShow(false))} to={routes.products} className='ct-sidebar-nav-item'><HiTemplate /><span>Products</span></NavLink>
                    </li>
                    <li className="relative text-sm">
                        <NavLink onClick={() => dispatch(setSidebarShow(false))} to={routes.website} className='ct-sidebar-nav-item'><RiGlobalLine /><span>Website</span></NavLink>
                        <a href={process.env.REACT_APP_WEBSITE_URL} target='_blank' rel="noreferrer" className="absolute right-4 top-[15px] opacity-50 hover:opacity-100"><RiEyeFill /></a>
                        <ul className="pl-10 hidden">
                            <li>
                                <NavLink to={routes.blogPosts} onClick={() => dispatch(setSidebarShow(false))} className='ct-sidebar-nav-sub'>Blogs</NavLink>
                            </li>
                            <li>
                                <NavLink to={routes.images} onClick={() => dispatch(setSidebarShow(false))} className='ct-sidebar-nav-sub'>Images</NavLink>
                            </li>
                            <li>
                                <NavLink to={routes.marketingEmails} onClick={() => dispatch(setSidebarShow(false))} className='ct-sidebar-nav-sub'>Marketing emails</NavLink>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Sidebar