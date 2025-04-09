

function Filter({ onFilter, filterValues }) {


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
<label htmlFor="paidFilter">Paid</label>
<input type="checkbox" name="paidFilter" checked={filterValues.paidFilter} onChange={onChange} />
</>
)}

export default Filter


