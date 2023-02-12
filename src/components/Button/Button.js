import PropTypes from 'prop-types'

function Button({children, ...attr}) {
    return (
        <button className="bg-black text-white py-2 px-4 rounded" {...attr}>{children}</button>
    )
}

Button.propTypes = {
    children: PropTypes.node.isRequired
}

export default Button