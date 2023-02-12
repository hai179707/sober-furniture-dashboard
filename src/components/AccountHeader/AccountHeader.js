import PropTypes from 'prop-types'

function AccountHeader({ children }) {
    return (
        <div className="px-2">
            <h3 className="text-xl">My account</h3>
            {children}
        </div>
    )
}

AccountHeader.propTypes = {
    children: PropTypes.node.isRequired
}

export default AccountHeader