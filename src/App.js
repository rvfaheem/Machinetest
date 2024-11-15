import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'
import Axios from 'axios'
import Loading from './Loading';

function App() {

  const [users, setUsers] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [updated, setUpdated] = useState({ id: "", name: "" });
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadData();
  }, [])

  const loadData = async () => {
    try {
      const response = await Axios.get('http://localhost:3001/users');
      console.log(response.data);
      setUsers(response.data)

    } catch (error) {
      console.log(error);

    }

  }

  const AddUser = (e) => {
    e.preventDefault();
    setIsLoading(true)

    if (!id || !name) {
      alert("please Enter both ID and Name");
      return;
    }

    Axios.post('http://localhost:3001/users', {
      id, name
    }).then(() => {
      setId(""); setName("");
    }).catch((err) => {
      console.log(err);
      setIsLoading(false)
      alert("abcd")
    })

    setTimeout(() => {
      loadData();
      setIsLoading(false)
    }, 500)
  }

  //json Placeholder

  const AddUsers = (e) => {
    e.preventDefault();

    if (!id || !name) {
      alert("please Enter both ID and Name");
      return;
    }

    Axios.post('http://localhost:3001/users', {
      id, name
    }).then(() => {
      setId(""); setName("");
    }).catch((err) => {
      console.log(err);
      alert("abcd")
    })

    setTimeout(() => {
      loadData();
    }, 500)
  }
  //


  const deleteUser = (id) => {
    Axios.delete(`http://localhost:3001/users/${id}`);
    setTimeout(() => {
      loadData()
    }, 500)
  }

  const updateUser = () => {
    console.log(updated.id, updated.name);
    Axios.put(`http://localhost:3001/users/${updated.id}`, {
      id: updated.id, name: updated.name

    }).then((response) => {
      console.log(response);
    }).catch((e) => { console.log(e) })

    setTimeout(() => {
      loadData()
    }, 500)
  }

  return (
    <>{isLoading ?
      <Loading />
      :
      <div className="App">
        <input type="text" placeholder='Enter the Id' value={id} onChange={(e) => setId(e.target.value)} />
        <input type="text" placeholder='Enter the Name' value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={AddUser}>Add</button>

        {users.map(e => (
          <div key={e.id} className='box'>
            <div className='box-1'>
              {e.id} {e.name}
              <button onClick={() => { deleteUser(e.id) }}>Delete</button>
            </div>
            <div className='box-2'>
              <input type='text' placeholder='Enter the updated Id' onChange={e => setUpdated({ ...updated, id: e.target.value })} />
              <input type="text" placeholder='Enter the updated Name' onChange={e => setUpdated({ ...updated, name: e.target.value })} />
              <button onClick={updateUser}>Update</button>
            </div>

          </div>
        ))}
      </div>
    }
    </>
  );
}

export default App;
