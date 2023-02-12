import { hashSync } from "bcryptjs"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { handleLogin } from "~/actions/auth.actions"
import routes from "~/config/routes"

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || routes.dashboard
    const { isLogin } = useSelector(reduxData => reduxData.authReducer)

    const handleSubmit = e => {
        e.preventDefault()
        const hashPassword = hashSync(password, process.env.SALT)
        dispatch(handleLogin({ username, password: hashPassword }, () => navigate(from)))
    }

    return (
        <>
            {isLogin
                ?
                <Navigate to={from} replace />
                :
                <div className='flex h-screen'>
                    <div className='hidden md:flex md:w-1/2 bg-[#eaf0fa] px-10 md:items-center'>
                        <img src='https://accounts.haravan.com/img/login_banner.svg' width='100%' alt="login" />
                    </div>
                    <div className='w-full md:w-1/2 lg:pl-32 lg:justify-start flex items-center justify-center relative'>
                        <div className="text-center max-w-[90%]">
                            <h3>Sober Furniture - Login</h3>
                            <p className="text-sm">Hello, please enter your login information</p>
                            <form onSubmit={handleSubmit} className='text-sm flex flex-col my-5'>
                                <input
                                    type='text'
                                    placeholder="Username or email"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    required
                                    className="border border-gray-bg p-3 mb-4 rounded-md outline-none"
                                />
                                <input
                                    type='password'
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    className="border border-gray-bg p-3 mb-4 rounded-md outline-none"
                                />
                                <p className="text-xs text-left no-underline text-black m-0 cursor-pointer">Forgot your password?</p>
                                <button type="submit" className="p-3 bg-black text-white rounded-md my-4">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Login