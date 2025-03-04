import React, { useRef, useState,useEffect } from 'react'
const Grocery = () => {
    // const [workTodo, setworkTodo] = useState(()=>{
    //   const storedTodos = localStorage.getItem('todos');
    // const todos = JSON.parse(storedTodos);
    // return todos?todos:[];
    // })
    const token = localStorage.getItem('token');
    const [fetchtodo, setfetchtodo] = useState(true)
    const [workTodo, setworkTodo] = useState([]
    //   if (!token) {
    //     // alert("No token found, navigating to signup");
    //     navigate('/signup');
    //     return;
    // }
    //   fetch('http://localhost:3001/worktodos',{
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${token}`
    //     },
    //   }
    //   ).then(res=>res.json()).then(data=>{
    //     if(data){
    //       return data ?data:[];
    //     }
    //   }).catch(err=>{
    //     console.log(err);
    //   })
    //   const storedTodos = localStorage.getItem('todos');
    // const todos = JSON.parse(storedTodos);
    // return todos?todos:[];
)
useEffect(() => {
 if(fetchtodo)
  {
  if (!token) {
    // alert("No token found, navigating to signup");
    navigate('/signup');
    return;
}
  fetch('http://localhost:3001/Hometodos',{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }
  ).then(res=>res.json()).then(data=>{
    if(data){
      setworkTodo(data.todos);
      console.log(data.todos);
    }
  }).catch(err=>{
    console.log(err);
  })
  setfetchtodo(false)
 }


}, [fetchtodo])

    const workref = useRef();

   
   const handleWorkerClick = async()=>{
    const WR = workref.current.value;
    try {
      const response = await fetch('http://localhost:3001/Hometodos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          credentials: 'include',
          body: JSON.stringify({ title:WR}),
      });

      const result = await response.json();
      console.log(result);
setfetchtodo(true);
      if (result.message) {

        
              // navigate('/Work');
        workref.current.value = " "; 
      } else {
          console.log("failed to post todo");
      }
  } catch (error) {
      console.error("Error signing up:", error);
  }

   }
  
   const handleDelete = async(d)=>{
    try {
      const response = await fetch('http://localhost:3001/Hometodos', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          credentials: 'include',
          body: JSON.stringify({ todoId:d}),
      });
      const result = await response.json();
      console.log(result);
      if (result.message) {
setfetchtodo(true)
      } else {
          console.log("failed to delete todo");
      }
  } catch (error) {
      console.error("Error signing up:", error);
  }
   }
   const handleUpdate = async(work)=>{
  
    try {
      fetch('http://localhost:3001/Hometodos', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({ todoId:work._id}),
    }).then(res=>res.json()).then(data=>{
      if(data){
        workref.current.value = work.title;
        setfetchtodo(true)
        console.log("todo updated successfully")

      }
      else {
        console.log("failed to delete todo");
    }})
    } catch (error) {
      console.log(error)
    }
   }
  return (
    <div className='WT'>  
      <div className='workTodos'>
        <div className='workerT'>
<input className='input-work' type="text" placeholder='Enter todos here...' ref={workref} />
<button className='btn-Add' onClick={handleWorkerClick}>Add</button>
        </div>
        <div className='WTD'>
    
 {workTodo.length === 0 ? <center> <div>No todos to show </div> </center>: workTodo.map((work)=>{
 return <div className='w-i' key={work._id}>
 <p className='wtodo'>{work.title}</p>
 <div className='btns'>
    
     <button className='btn' onClick={()=>{handleDelete(work._id)}}>Delete</button>
     <button className='btn' onClick={()=>{handleUpdate(work)}}>Update</button>
 </div>
 </div>
 })}
        </div>


      </div>  
    </div>
  )
}

export default Grocery
