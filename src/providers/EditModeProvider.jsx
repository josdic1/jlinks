import { useState } from 'react';
import EditModeContext from "../context/EditModeContext"

function EditModeProvider({children}) {

    const [ inEditMode, setInEditMode ] = useState(false)

return (
<>
<EditModeContext.Provider value={{
    inEditMode, setInEditMode
}}
>
    {children}
</EditModeContext.Provider>
</>
)}

export default EditModeProvider
