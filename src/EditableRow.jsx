import React from 'react'

function EditableRow({editFormdata, HandleEditChange, handleCancelEdit}) {
    return (
        <tr>
            <td><input type="text" name="name" id="name" placeholder='Enter Your Name...' value={editFormdata.name} onChange={HandleEditChange} required/>
            </td>
            <td><input type="text" name="age" id="age" placeholder='Enter Your Age...' value={editFormdata.age} onChange={HandleEditChange} required/>
            </td>
            <td><input type="email" name="email" id="email" placeholder='Enter Your Email...' value={editFormdata.email} onChange={HandleEditChange} required/>
            </td>
            <td><input type="tel" name="contact" id="contact" placeholder='Enter Your Contact Number...' pattern="[6-9]{1}[0-9]{9}" value={editFormdata.contact} onChange={HandleEditChange} required/>
            </td>
            <td>
                <input type="text" name="city" id="city" placeholder='Enter Your City...' value={editFormdata.city} onChange={HandleEditChange} required/>
            </td>
            <td>
             <button type="submit" name="submit" className="submit" >Save</button>
             <button className='delete' onClick={handleCancelEdit}>Cancel</button>
            </td>
        </tr>
    )
}

export default EditableRow