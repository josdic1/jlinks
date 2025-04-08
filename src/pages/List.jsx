import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import LinkContext from "../context/LinkContext"
import LinkItem from "../components/LinkItem"

function List() {

    const { links } = useContext(LinkContext)
    const [listToShow, setListToShow] = useState(links)

    const navigate = useNavigate()

    const listData = links.map(link => (
        <LinkItem key={link.id} link={link} onListButtonClick={onListButtonClick}/>
    ))
    
    function onListButtonClick(btn) {
        switch(btn) {
            case 'edit':
                onEditClick()
                navigate('/form')
        }
      }
      
return (
<>
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
