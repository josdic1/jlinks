import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import EditModeContext from "../context/EditModeContext"
import LinkContext from "../context/LinkContext"

function Form() {

    const { inEditMode, setInEditMode } = useContext(EditModeContext)
    const { selectedLink, setSelectedLink, handleAdd, handleUpdate } =useContext(LinkContext)

    const navigate = useNavigate()

    const [ formData, setFormData] = useState({
        title: '',
        url: '',
        type: '',
        description: '',
        paid: ''
    })

    useEffect(() => {
        if (inEditMode && selectedLink?.id) {
            setFormData({
                title: selectedLink.title || '',
                url: selectedLink.url || '',
                type: selectedLink.type || '',
                description: selectedLink.description || '',
                paid: !!selectedLink.paid
            });
        }
    }, [selectedLink, inEditMode]);

const onChange = (e) => {
    const { name, value, type, checked } = e.currentTarget
    const updated = {
        ...formData,
        [name]: type === 'checkbox' ? checked : value
    }
    setFormData(updated)
}

    const onSubmit = (e) => {
        e.preventDefault()
        let linkObj;
        if(inEditMode) {
           linkObj = {
                ...formData,
                id: selectedLink.id
            }
            handleUpdate(linkObj)
        } else {
            linkObj = {...formData}
            handleAdd(linkObj)
        }
        onCancel()
    }

    const onClear = () => {
        setFormData({
            title: '',
            url: '',
            type: '',
            description: '',
            paid: ''
        })
    }

    const onCancel = () => {
        onClear()
        setInEditMode(false)
        setSelectedLink('')
        navigate('/list')
    }

return (
<>
<form onSubmit={onSubmit}>
    <h4>{inEditMode ? 'EDIT MODE' : 'VIEW MODE'}</h4>
    <h4>{selectedLink.id ? selectedLink.title : '<>'}</h4>
    <label htmlFor="title"></label>
    <input type='text' name='title' placeholder='Title...' value={formData.title} onInput={onChange} /><br></br>
    <label htmlFor="url"></label>
    <input type='url' name='url' placeholder='Url...' value={formData.url} onInput={onChange} /><br></br>
    <label htmlFor="type"></label>
    <select name="type" onChange={onChange} value={formData.type} >
        <option value="" default unselectable="">Type...</option>
    <option value='ai'> AI </option>
    <option value='code'> Code </option>
    <option value='music'> Music </option>
    <option value='settings'> Settings </option>
    <option value='social'> Social </option>
    </select><br></br>
    <label htmlFor="description"></label>
    <textarea name="description" placeholder='Description...' value={formData.description} onChange={onChange}></textarea><br></br>
    <label htmlFor="paid">Paid ?</label>
    <input type='checkbox' name='paid' checked={formData.paid} onChange={onChange} />
    <button type='submit'>Submit</button>
    <button type='button' name='clear' onClick={onClear}>Clear</button>
    <button type='button' name='cancel' onClick={onCancel}>Cancel</button>
</form>
</>
)}

export default Form
