import PropTypes from 'prop-types'
import Sidebar from "~/components/Sidebar"
import Header from "~/components/Header"
import { useSelector } from 'react-redux'
import EditCustomerModal from '~/components/EditCustomerModal'

function DashboardLayout({ children }) {
    const { sidebarShow } = useSelector(state => state.mainReducer)
    const { isOpenEditCustomerInfo } = useSelector(state => state.customerReducer)

    return (
        <div>
            <Sidebar />
            <div className="transition-all duration-500 text-sm ct-main-content" style={{ paddingLeft: sidebarShow ? '240px' : 0 }}>
                <div className="px-2 pb-4">
                    <Header />
                    {children}
                </div>
            </div>
            {isOpenEditCustomerInfo
                &&
                <EditCustomerModal />
            }
        </div>
    )
}

DashboardLayout.propTypes = {
    children: PropTypes.node.isRequired
}

export default DashboardLayout
