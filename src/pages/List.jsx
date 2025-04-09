import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import LinkContext from "../context/LinkContext"
import EditModeContext from "../context/EditModeContext"
import LinkItem from "../components/LinkItem"
import Filter from "./Filter"

function List() {

    const { links, setSelectedLink, handleUpdate, handleDelete } = useContext(LinkContext)
    const { setInEditMode } = useContext(EditModeContext)
    const [filterValues, setFilterValues] = useState({
        textFilter: '',
        paidFilter: ''
    })

    const [sortValues, setSortValues] = useState({
        typeSort: '',
        paidSort: '',
        starSort: ''
    })
    const [listToShow, setListToShow] = useState(() => links || [])


    useEffect(() => {
        const displayList = [...links]
          .filter(link =>
            link.title.toLowerCase().includes(filterValues.textFilter.toLowerCase())
          )
          .sort((a, b) => a.title.localeCompare(b.title))
          .sort((a, b) => Number(b.starred) - Number(a.starred))
      
        setListToShow(displayList)
      }, [links, filterValues])

    const navigate = useNavigate()

    const listData = listToShow.map(link => (
        <LinkItem key={link.id} link={link} onListButtonClick={onListButtonClick}/>
    ))


    function onListButtonClick(id, name) {
        const thisLink = [...links].find(link => link.id === id)
        setSelectedLink(thisLink)

        switch(name) {
            case 'edit':
                setInEditMode(true)
                navigate('/form')
                break
            case 'del':
                handleDelete(id)
                break
            case 'view':
                window.open(thisLink.url)
                break
         case 'star':
            const updated = {
                ...thisLink,
                starred: !thisLink.starred,
              }
              handleUpdate(updated)
            break
        }
      }

      const onFilter = (obj) => {
       setFilterValues(prev => ({
        ...prev, 
        textFilter: obj.textFilter || '',
        paidFilter: !!obj.paidFilter
       }))
      }
  
      
return (
<>
<Filter onFilter={onFilter} filterValues={filterValues}/>
    <table>
    <thead>
          <tr>
            <th>★</th>
            <th>Title</th>
            <th>Type</th>
            <th>Description</th>
            <th>$</th>
            <th>Card</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
            {listData}
        </tbody>
    </table>
</>  
)}

export default List
