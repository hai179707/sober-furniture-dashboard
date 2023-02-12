import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import routes from '~/config/routes'

function PrivateRoutes() {
    const { isLogin, user } = useSelector(reduxData => reduxData.authReducer)
    const location = useLocation()

    return isLogin && user.isAdmin ? <Outlet /> : <Navigate to={routes.login} state={{ from: location}} replace />
}

export default PrivateRoutes