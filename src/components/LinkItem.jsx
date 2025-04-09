

function LinkItem({ link, onListButtonClick }) {

    const onClick = (e) => {
        const { id } = e.currentTarget.dataset
        const { name } = e.currentTarget
        onListButtonClick(id, name)
    }

return (
<>
    <tr>
    <td><button type="button" data-id={link.id} name="star" onClick={onClick}>{link.starred ? "★" : "☆"}</button></td>
        <td><button type="button"data-id={link.id} name="view" onClick={onClick}>{link.title}</button></td>
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
