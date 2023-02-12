import PropTypes from 'prop-types'

function Card({ children }) {
    return (
        <div className='bg-white p-4 rounded-md mb-5'>
            {children}
        </div>
    )
}

Card.propTypes = {
    children: PropTypes.node.isRequired
}

export default Card