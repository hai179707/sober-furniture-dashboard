import PropTypes from 'prop-types'

function CardHeader({ children }) {
    return (
        <div className='border-b border-secondary-bg pb-3'>
            {children}
        </div>
    )
}

CardHeader.propTypes = {
    children: PropTypes.node.isRequired
}

export default CardHeader