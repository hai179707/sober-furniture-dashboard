import PropTypes from 'prop-types'
import { useRef } from 'react'
import { RiCloseLine, RiSearchLine } from 'react-icons/ri'

function SearchForm({ value, placeholder='Search', onChange, onClear, onSubmit }) {
    const searchInp = useRef()

    const handleClear = () => {
        searchInp.current.focus()
        onClear()
    }

    return (
        <form onSubmit={onSubmit} className='flex border border-secondary-bg rounded relative max-w-full overflow-hidden'>
            <button type='submit' className='text-lg text-secondary px-2'><RiSearchLine /></button>
            <input
                ref={searchInp}
                type='text'
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className='flex-1 border-none outline-none p-3 max-w-[84%] min-[320px]:max-w-none'
            />
            {!!value && <RiCloseLine className='absolute right-5 top-50 -translate-y-50 cursor-pointer' onClick={handleClear} />}
        </form>
    )
}

SearchForm.propTypes = {
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onClear: PropTypes.func,
    onSubmit: PropTypes.func
}

export default SearchForm