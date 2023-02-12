import PropTypes from 'prop-types'

function EmptyLayout({ children }) {
    return (
        <div className='bg-white'>
            {children}
        </div>
    )
}

EmptyLayout.propTypes = {
    children: PropTypes.node.isRequired
}

export default EmptyLayout