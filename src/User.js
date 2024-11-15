import React, { useState } from 'react'

const User = ({ id, email, name, onDelete, onUpdate }) => {
  const handleDelete = () => {
    onDelete(id);
  }
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);


  const handleUpdate = () => {
    onUpdate(id, newName, newEmail);
    setIsEditing(false);
  };


  return (
    <div className='text-black'>
      {isEditing ? (

        <>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter updated name"
          />
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Enter updated email"
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (


        <>
        

          <span className=''>{name && name}</span>
          <span className=''>{email && email}</span>
          <button className='' onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(id)}>Delete</button>

        </>
      )}
    </div>


  )
}

export default User