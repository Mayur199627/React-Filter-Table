import { useEffect, useState } from 'react'
import './App.css'
import data from './Data.json'
import ReadOnly from './ReadOnly'
import EditableRow from './EditableRow'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [tableData, setTableData] = useState([])
  const [order, setOrder] = useState("ACS")  
  const [addFormdata, setFormData] = useState({
    name: "",
    age: "",
    contact: "",
    email: "",
    city: ""
  })  
  const [editFormdata, setEditFormData] = useState({
    name: "",
    age: "",
    contact: "",
    email: "",
    city: ""
  })

  const [editId, setEditId] = useState(null)

const [currentPage, setCurrentPage] = useState(1)
const recordsPerPage = 5;
const lastIndex = currentPage * recordsPerPage
const firstIndex = lastIndex - recordsPerPage
const records = tableData.slice(firstIndex, lastIndex)
const nPages = Math.ceil(tableData.length / recordsPerPage)
const numbers = [...Array(nPages + 1).keys()].slice(1)




  useEffect(() => {
    setTableData(data)
  }, [])

  const handleFormChange = (e) => {
    e.preventDefault();
    const feildName = e.target.getAttribute('name')
    const feildData = e.target.value
    const newData = { ...addFormdata };
    newData[feildName] = feildData;
    setFormData(newData)
  }
  
  const handleAddDetails = (e) => {
    e.preventDefault();

    const newContact = {
      id: Date.now(),
      name: addFormdata.name,
      age: addFormdata.age,
      email: addFormdata.email,
      contact: addFormdata.contact,
      city: addFormdata.city,
    }
    setTableData([...tableData, newContact])
  }

  const handleEdit = (e,ele) =>{
    e.preventDefault()
    setEditId(ele.id)

    const formValues = {
      name: ele.name,
      age: ele.age,
      email: ele.email,
      contact: ele.contact,
      city: ele.city,
    }
    setEditFormData(formValues)
  }

  const HandleEditChange = (e) =>{
    e.preventDefault()
    
    const feildName = e.target.getAttribute('name')
    const feildData = e.target.value
    const newData = { ...editFormdata };
    newData[feildName] = feildData;
    setEditFormData(newData)
  }

  const handleEditFormSubmit = (e) =>{
      e.preventDefault();

      const editedData = {
        id:editFormdata.id,
        name:editFormdata.name,
        age:editFormdata.age,
        email:editFormdata.email,
        contact:editFormdata.contact,
        city:editFormdata.city,
      }

      const newFormData = [...tableData]

      const index = tableData.findIndex((ele)=>ele.id === editId)

      newFormData[index] = editedData;
      setTableData(newFormData)
      setEditId(null)
  }

  const handleCancelEdit = () => {
    setEditId(null)
  }

  const handleDelete = (rowId) =>{
    const newData = [...tableData]

    const index = newData.findIndex((ele)=> ele.id === rowId)

    newData.splice(index,1)

    setTableData(newData)
  }

  const sorting = (val) =>{
    if(order === "ACS"){
      const sorted = [...tableData].sort((a,b)=>{
        return a[val].toLowerCase() > b[val].toLowerCase() ? 1 : -1
      })
      console.log('sort')
      setTableData(sorted);
      setOrder("DCS")
    }
    else{
      const sorted = [...tableData].sort((a,b)=>{
        return a[val].toLowerCase() < b[val].toLowerCase() ? 1 : -1
      })
      setTableData(sorted);
      setOrder("ACS")
    }
  }

  const sortingNum = (val) =>{
    if(order === "ACS"){
      const sorted = [...tableData].sort((a,b)=>{
        return a[val] > b[val] ? 1 : -1
      })
      console.log('sort')
      setTableData(sorted);
      setOrder("DCS")
    }
    else{
      const sorted = [...tableData].sort((a,b)=>{
        return a[val] < b[val] ? 1 : -1
      })
      setTableData(sorted);
      setOrder("ACS")
    }
  }

  const prevPage = () =>{
    if(currentPage !== 1){
      setCurrentPage(currentPage-1)
    }
  } 
  
  
  const nextPage = () =>{    
    if(currentPage !== nPages){
      setCurrentPage(currentPage+1)
    }
  }
  
  const changeCPage = (id) =>{
    setCurrentPage(id)  
  }
  

  return (
    <div className="app-container">
      <h1>Add New Row :</h1>
      <div className="new-row-add">
        <form className='single-row'>
          <input type="text" name="name" id="name" placeholder='Enter Your Name...' onChange={(e) => handleFormChange(e)} required />
          <input type="text" name="age" id="age" placeholder='Enter Your Age...' onChange={(e) => handleFormChange(e)} required />
          <input type="email" name="email" id="email" placeholder='Enter Your Email...' onChange={(e) => handleFormChange(e)} required />
          <input type="tel" name="contact" id="contact" placeholder='Enter Your Contact Number...' pattern="[6-9]{1}[0-9]{9}" onChange={(e) => handleFormChange(e)} required />
          <input type="text" name="city" id="city" placeholder='Enter Your City...' onChange={(e) => handleFormChange(e)} required />
          <button type="submit" name="Submit" id="submit" onClick={(e) => handleAddDetails(e)} >Add Details</button>
        </form>
      </div>

      <form onSubmit={handleEditFormSubmit}>
        <h1>User Data</h1>
        <table>
          <thead>
            <tr>
              <th onClick={()=>sorting("name")}>Name <span style={{fontSize:'0.9rem', cursor:"pointer"}} >⬆⬇</span></th>
              <th onClick={()=>sortingNum("age")}>Age <span style={{fontSize:'0.9rem', cursor:"pointer"}} >⬆⬇</span></th>
              <th onClick={()=>sorting("email")}>Email <span style={{fontSize:'0.9rem', cursor:"pointer"}} >⬆⬇</span></th>
              <th onClick={()=>sortingNum("contact")}>Contact No <span style={{fontSize:'0.9rem', cursor:"pointer"}} >⬆⬇</span></th>
              <th onClick={()=>sorting("city")}>City <span style={{fontSize:'0.9rem', cursor:"pointer"}} >⬆⬇</span></th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              records.map((ele) => {
                return (
                  <>
                  {editId === ele.id ? <EditableRow editFormdata={editFormdata} HandleEditChange={HandleEditChange} handleCancelEdit={handleCancelEdit}/> :<ReadOnly ele={ele} handleEdit={handleEdit} handleDelete={handleDelete}/> }
                  </>
                )
              })
            }
          </tbody>
        </table>
      </form>
      
      <nav>
              <ul className='pagination'>
                <li className='page-item'>
                  <a href="#" className='page-link' onClick={prevPage}>PREV</a>
                </li>
                {
                  numbers.map((n,i)=>{
                    return (<li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                    <a href="#" className='page-link' onClick={()=>changeCPage(n)}>{n}</a>
                    </li>)
                  })
                }
                
                <li className='page-item'>
                  <a href="#" className='page-link' onClick={nextPage}>NEXT</a>
                </li>
              </ul>
            </nav>
    </div>
  )
}

export default App
