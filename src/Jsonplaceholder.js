import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import User from './User';
import AddUser from './AddUser';
import { ToastContainer, toast } from 'react-toastify'

export const Jsonplaceholder = () => {

  const [users, setUsers] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [updated, setUpdated] = useState({ id: "", name: "" });

  useEffect(() => {
    loadData();
  }, [])

  const loadData = async () => {
    const response = await Axios.get('https://jsonplaceholder.typicode.com/users');
    console.log(response.data);
    setUsers(response.data)
  }

  const onAdd = async (name, email) => {

    if (!name || !email) {
      // alert("Name and Email cannot be empty.");
      toast.error("Name and Email cannot be empty.");
      return;
    }


    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      // alert("Please enter a valid email address.");
      toast.error("Please enter a valid email address.");
      return;
    }



    await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        email: email
      }),
      headers: {
        "content-type": "application/json; charset=UTF-8",
      }
    })
      .then((res) => {
        if (res.status !== 201) {
          return
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setUsers((users) => [...users, data]);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const onDelete = async (id) => {
    await fetch('https://jsonplaceholder.typicode.com/users/${id}', {
      method: 'Delete'
    })
      .then((res) => {
        if (res.status !== 200) {
          return
        } else {
          setUsers(users.filter((user) => {
            return user.id !== id;
          }))
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onUpdate = async (id, name, email) => {
    Axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, { id, name, email })
      .then(response => {
        setUsers(users.map(user => user.id === id ? { ...user, name, email } : user));
      })
      .catch(e => console.log(e));
  };


  // console.log(users);

  return (
    <>
      <ToastContainer />
      <div className="App">
        {/* <input type="text" placeholder='Enter the Id' value={id} onChange={(e)=>setId(e.target.value)} />
      <input type="text" placeholder='Enter the Name' value={name} onChange={(e)=>setName(e.target.value)} /> */}
        <div>
          <AddUser onAdd={onAdd} />
        </div>


        {users.map((user) => (
          <div className='list' key={user.id}>
            <div className=''>
              <User id={user.id} key={user.id} name={user.name} email={user.email} onDelete={onDelete} onUpdate={onUpdate} />
              {/* <button onClick={()=>{deleteUser(e.id)}}>Delete</button> */}
            </div>
            {/* <div className='box-2'>
              <input type='text' placeholder='Enter the updated Id' onChange={e=> setUpdated({...updated,id:e.target.value})} />
              <input type="text" placeholder='Enter the updated Name' onChange={e=>setUpdated({...updated,name:e.target.value})} />
              <button onClick={updateUser}>Update</button>
            </div> */}

          </div>
        ))}
      </div>
    </>
  )
}
