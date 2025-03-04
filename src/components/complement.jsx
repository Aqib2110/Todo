import React from 'react'
import { useState,useRef,useEffect } from 'react';
const complement = ({text}) => {
  console.log(text);
  const [workTodo, setworkTodo] = useState(()=>{
    const todos = localStorage.getItem(`${text}`)
    const Ptodo = JSON.parse(todos);
    return Ptodo?Ptodo:[]; 
  })
      const workref = useRef();
  //     useEffect(() => {
  //    const arrit = localStorage.getItem('todos');
  //    setworkTodo(arrit)
  //     }, [])
      useEffect(() => {
        // if(workTodo){
          localStorage.setItem(`${text}`,JSON.stringify(workTodo))
         
      }, [workTodo]);
     const handleWorkerClick = ()=>{
      const WR = workref.current.value;
      const id = Math.random();
      console.log(id)
      const obj = {id:id,todo:WR}
      console.log(obj)
      setworkTodo([...workTodo,obj]);  
      workref.current.value = "";
     }
    //  useEffect(() => {
    //   // const stored = localStorage.getItem('todos');
    //   // // if(stored){
    //   //     const newStored = JSON.parse(stored);
    //   //     console.log(newStored);
    //   if(props){
    //     localStorage.setItem(`${props.coll}`, JSON.stringify(workTodo));
    //   }
        
    //  }
    //  , [workTodo]);
  //    console.log(workTodo);
     const handleDelete = (d)=>{
  const arrDEL = workTodo.filter((todo)=>todo.id!==d);
  console.log(arrDEL)
  setworkTodo(arrDEL);
     }
     const handleUpdate = (work)=>{
      workref.current.value = work.todo;
      const arrDEL = workTodo.filter((todo)=>todo.id!==work.id);
  console.log(arrDEL)
  setworkTodo(arrDEL);
     }
    return (
      <div className='WT'>  
        <div className='workTodos'>
          <div className='workerT'>
  <input className='input-work' type="text" placeholder='Enter todos here...' ref={workref} />
  <button className='btn-Add' onClick={handleWorkerClick}>Add</button>
          </div>
          <div className='WTD'>
          {workTodo.map((work)=>{
  return <div className='w-i'>
  <p className='wtodo'>{work.todo}</p>
  <div className='btns'> 
      <button className='btn' onClick={()=>{handleDelete(work.id)}}>Delete</button>
      <button className='btn' onClick={()=>{handleUpdate(work)}}>Update</button>
  </div>
  </div>
  })}
          </div>
        </div>  
      </div>
    )
}

export default complement
