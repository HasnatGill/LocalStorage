import React, { useState, useEffect } from 'react'
import './App.css';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
}

const getData = () => {
  const data = localStorage.getItem("inputValue")
  if (data) return JSON.parse(data)
  if (!data) return []


}






function App() {

  const [flag, setFlag] = useState(false)
  const [studData, setstudData] = useState(getData())
  const [state, setState] = useState(initialState)
  const [updateIndex, setupdateIndex] = useState()

  
  const handleChange = e => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))

  }


  const handleSubmit = (e) => {
    e.preventDefault()
    let id = Math.random().toString().slice(8)
    const { firstName, lastName, email, password } = state;
    const obj = {
      id,
      firstName,
      lastName,
      email,
      password
    }
    setstudData([...studData, obj])
    setState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    })

  }

  useEffect(() => {
    localStorage.setItem('inputValue', JSON.stringify(studData));

  }, [studData]);


  const handleEidt = (item, i) => {
    setFlag(true)
    setupdateIndex(i)
    setState({
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      password: item.password
    })


  }

  const handleUpdate = () => {
    const { firstName, lastName, email, password } = state;
    let items = [...studData];
    let item = items[updateIndex]
    item.firstName = firstName;
    item.lastName = lastName;
    item.email = email;
    item.password = password;
    items[updateIndex] = item;
    console.log(items[updateIndex] = item);
    setstudData(items)
    setFlag(false)
  }

  return (
    <div>

      <div className="row">
        <div className="col">
          <input type="text" name='firstName' placeholder='First Name' value={state.firstName} onChange={handleChange} /></div>
        <div className="col">
          <input type="text" name='lastName' placeholder='Last Name' value={state.lastName} onChange={handleChange} /></div>
      </div>
      <div className="row">
        <div className="col">
          <input type="email" name='email' placeholder='Email@gmail.com' value={state.email} onChange={handleChange} />

        </div>
      </div>
      <div className="row">
        <div className="col">
          <input type="password" name='password' placeholder='*********' value={state.password} onChange={handleChange} />
        </div>
      </div>

      <div className="row">
        <div className="col">
          {
            !flag
              ? <button id='S' onClick={handleSubmit}>Submit</button>
              : <button id='S' onClick={handleUpdate}>Update</button>
          }
        </div>
      </div>
      <form >



      </form>


      <table>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>Action</th>
        </tr>
        {
          studData.map((item, i) => {
            return (
              <tr key={i}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.password}</td>
                <td><button id='D' className='me-2'>Delete</button><button onClick={() => handleEidt(item, i)} id='E'>Edit</button></td>
              </tr>
            )
          })
        }
      </table>
    </div>
  );
}

export default App;
