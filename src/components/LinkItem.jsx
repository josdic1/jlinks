

function LinkItem({ link, onListButtonClick }) {

    const onClick = (e) => {
        const { name } = e.currentTarget
            onListButtonClick(name)
    }

return (
<>
    <tr>
    <td>{link.starred}</td>
        <td><button type="button">{link.title}</button></td>
        <td>{link.type}</td>
        <td>{link.description}</td>
        <td>{link.paid ? "$" : ""}</td>
        <td><button type="button" data-id={link.id} name="edit" onClick={onClick}>Edit</button></td>
        <td><button type="button" data-id={link.id} name="card" onClick={onClick}>Card</button></td>
        <td><button type="button" data-id={link.id} name="del" onClick={onClick}>Delete</button></td>
    </tr>
</>
)}

export default LinkItem
