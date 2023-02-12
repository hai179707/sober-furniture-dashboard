import PropTypes from 'prop-types'

function CardBody({ children }) {
    return (
        <div className='pt-3'>
            {children}
        </div>
    )
}

CardBody.propTypes = {
    children: PropTypes.node.isRequired
}

export default CardBody