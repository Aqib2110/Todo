// import React, { useEffect, useRef } from 'react'
// import { useNavigate } from 'react-router-dom'
// const signup = () => {
//     const navigate = useNavigate();
//     const username = useRef();
//     const password = useRef();
//     const name = useRef();

//     const handleSubmit = async(event)=>{
//       event.preventDefault();
//         const nam = name.current.value;
//         const usernam = username.current.value;
//         const passwor = password.current.value;
       
//           const data = await fetch('http://localhost:3001/signup',{
//             method:'POST',
//             headers:{'Content-Type':'application/json'},
//             body:JSON.stringify({nam,usernam,passwor})
//                 });
//      const respose = await data.json();
//      console.log(respose);
//     //  name.current.value = ""
//     //  username.current.value = "";
//     //  password.current.value = "";
//     if (respose.message) {
     
//       navigate('/signin');
//     } else {
//      console.log("failed");
//      navigate('/signup');
//     }
        
      
//     }
//   return (
//     <div className='SignMain'>
//       <div className='signh1'>
//       <h1 className=''>Signup</h1>
//       </div>
  
// <div className='Signup'>
//   <form onSubmit={handleSubmit}>

//   <div className='signdiv'>
//   <label htmlFor=""> Firstname:   <input type="text" className='sign' ref={name} required={true} />  </label>
//   </div>
// <div className='signdiv'>
// <label htmlFor=""> Username: <input type="text" className='sign' ref={username} required /> </label>
// </div>
// <div className='signdiv'>
// <label htmlFor=""> Password: <input type="text" className='sign' ref={password} required/> </label>
// </div>


// <button className='signbtn' type='submit' >Signup</button>
//   </form>
 
// <div className='signalready'>
// <p>Already have an Account?<a href="/signin">Login</a></p>
// </div>

// </div>


    
//     </div>
//   )
// }

// export default signup
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const username = useRef();
    const password = useRef();
    const name = useRef();

function toast(){
    <div className="toast">
    <div className="alert alert-info">
      <span>New message arrived.</span>
    </div>
  </div>
}

    const handleSubmit = async (event) => {
        event.preventDefault();
// const yourToken = localStorage.getItem('token');
// if(!yourToken){

// }
        const name2 = name.current.value;               
        const username2 = username.current.value;
        const password2 = password.current.value;
        try {
            const response = await fetch('http://localhost:3001/signup', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                //   'Authorization': `Bearer ${yourToken}`
                },
                credentials: 'include',
                body: JSON.stringify({ name: name2, username: username2, password: password2 }),
            });
            const result = await response.json();
            console.log(result);

            if (result.message) {
                setTimeout(() => {
                    navigate('/signin');
                }, 1000);  
            } else {
                console.log("Signup failed");
            }
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    return (
        <div className='SignMain'>
            <div className='signh1'>
                <h1>Signup</h1>
            </div>
            <div className='Signup'>
                <form onSubmit={handleSubmit}>
                    <div className='signdiv'>
                        <label>
                            <input type="text" className='sign' ref={name} required />
                            <span className=''>Firstname</span>
                        </label>
                    </div>
                    <div className='signdiv'>
                        <label>
                            <input type="text" className='sign' ref={username} required />
                            <span> Username</span>
                        </label>
                    </div>
                    <div className='signdiv'>
                        <label>
                            <input type="password" className='sign' ref={password} required />
                            <span> Password</span>
                        </label>
                    </div>
                    <button className='signbtn' type='submit'>Signup</button>
                </form>
                <div className='signalready'>
                    <p>Already have an account? <a href="/signin">Login</a></p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
