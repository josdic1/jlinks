

function Filter({ onFilter, filterValues, onClear}) {


const onChange = (e) => {
    const { name, value, type, checked } = e.currentTarget
    const updated = {
        ...filterValues,
        [name]: type === "checkbox" ? checked : value
    }
    onFilter(updated)
}

return (
<>
<label htmlFor="textFilter">Search: </label>
<input type="text" name="textFilter" placeholder='Type something...' value={filterValues.textFilter} onChange={onChange} />
<button type="button" name="clear" onClick={onClear}>Clear</button>
</>
)}

export default Filter


