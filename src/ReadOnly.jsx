import React from 'react'

function ReadOnly({ele, handleEdit, handleDelete}) {
  return (
    <tr key={ele.id}>
          <td>{ele.name}</td>
          <td>{ele.age}</td>
          <td>{ele.email}</td>
          <td>{ele.contact}</td>
          <td>{ele.city}</td>
          <td>
            {
              <div className="action">
              <button className='edit' onClick={(e)=>handleEdit(e,ele)}>Edit</button>
              <button className='delete' onClick={()=>handleDelete(ele.id)}>Delete</button>
              </div>
            }
          </td>
        </tr>
  )
}

export default ReadOnly