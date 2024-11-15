import React from 'react'

const AddUser = ({onAdd}) => {

const handleSubmit =(e) =>{
        e.preventDefault();
        onAdd(e.target.name.value,e.target.email.value);
        e.target.name.value="";
        e.target.email.value="";
    }
  return (
    <div className=' h-screen text-black'>
      <form onSubmit={handleSubmit}>
        <h3>Add User</h3>
        <input placeholder='Name' name="name" />
        <input placeholder="Email" name="email" />
        <button onSubmit={handleSubmit}>Add</button>
        <hr />
      </form>
    </div>
  )
}

export default AddUser