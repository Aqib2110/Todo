import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
const Signin = () => {
    const navigate = useNavigate();
     const usernameref = useRef();
        const passwordref = useRef();
//         const handleSubmit = async(event)=>{  
//             event.preventDefault();
//             const uservalue = usernameref.current.value;
//             const passvalue = passwordref.current.value;
//         fetch('http://localhost:3001/signin',{
//            method:'POST',
//            headers:{'Content-Type':'application/json'},
//            body:JSON.stringify({username: uservalue, password: passvalue})
// }).then(res => {
//     if (!res.ok) {
//         throw new Error('Network response was not ok');
//     }
//     return res.json();
// }).then(data => {
//     localStorage.setItem('token',data.token);
// // alert('signin')
//                 navigate('/');
//             })
//             .catch(error =>{ console.error('There was a problem with the fetch operation:', error);
//                     navigate('/signup');
//                 });
// } ;
const handleSubmit = async(event)=>{
    event.preventDefault();
      const username = usernameref.current.value;
      const password = passwordref.current.value;
     
        // const data = await fetch('http://192.168.241.63:3001/signin',{
        //   method:'POST',
        //   // headers:{'Content-Type':'application/json'},
        //   credentials: 'include',
        //   body:JSON.stringify({username,password})
        //       });

           fetch('https://todo-backend-theta-ashy.vercel.app/signin', {
                   method: 'POST',
                   headers: { 'Content-Type': 'application/json' },
                   credentials: 'include',  // 👈 Required to send cookies
                   body: JSON.stringify({ username, password })
               })
               .then(response => response.json())
               .then(data =>{ console.log("Response:", data);
                if(data){
                  localStorage.setItem('token',data.token);
                  setTimeout(() => {
                    navigate('/');
                  }, 3000);
                
                }
 else {
  console.log("failed");
  navigate('/signup');
 }}
              )
               .catch(error => console.error('Error:', error));
            
            
  //  const respose = await data.json();
  //  console.log(respose);
  // //  name.current.value = ""
  // //  username.current.value = "";
  // //  password.current.value = "";
  // if (respose.message) {
  //  
  //   navigate('/');
  // } else {
  //  console.log("failed");
  //  navigate('/signup');
  // }   
  }
        
  return (
    <>
     <div className='SignMain'>
      <div className='signh1'>
      <h1 className=''>Login</h1>
      </div>
  
<div className='Signup'>
    <form  onSubmit={handleSubmit}>

    <div className='signindiv'>
<label htmlFor=""> Username: <input type="text" className='sign' ref={usernameref} required/> </label>
</div>
<div className='signindiv'>
<label htmlFor=""> Password: <input type="password" className='sign' ref={passwordref} required/> </label>
</div>


<button className='signinbtn' type='submit'>Login</button>
    </form>

</div>
    </div>
    </>
   
  )
}
export default Signin;
