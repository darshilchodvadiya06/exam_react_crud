import { useEffect, useState } from 'react';
import './App.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { getData } from './Api';

function App() {
  const [data, setData] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //data post
  const handle = (e) => {
    console.log(e);
    axios.post(" http://localhost:3030/posts", e).then((res) => {
      console.log(res);
      getData().then((res) => {
        setData([...res]);
      })
      setData([...data, res.data]);
    });
  };

  // delete data
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3030/posts/${id}`).then((res) => {
      const updateddata = data.filter((item) => item.id !== id);
      setData(updateddata);
    })
  }

  const x = getData();
  // console.log(x);
  useEffect(() => {
    getData().then((res) => {
      setData([...res]);
    })
  }, []);
  return (
    <div className='container'>
      <form onSubmit={handleSubmit(handle)} className='mb-5'>
        <input {...register("firstName")} />
        <input {...register("lastName", { required: true })} />
        {errors.lastname && <p>Last name is required.</p>}
        <input {...register("age", { pattern: /\d+/ })} />
        {errors.age && <p>Please enter number for age.</p>}
        <input type="submit" />
      </form>
      <div className='card col-4 p-5 border-5'>
        {data.map((e, ind) => {
          return (
            <div key={ind}>
              <h2>ID is {e.id}</h2>
              <h4>Name is {e.firstName} {e.lastName}</h4>
              <h4>Age is {e.age}</h4>
              <button className='btn btn-primary' onClick={() => handleDelete(e.id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;