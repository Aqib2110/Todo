
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Nav from './nav';
import Footer from './Footer';
import Cookies from 'js-cookie'
import Complement from './complement';
import { useNavigate } from 'react-router-dom'
const Collection = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            // alert("No token found, navigating to signup");
            navigate('/signup');
            return;
        }
        fetch("http://localhost:3001", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(res => res.json()).then(data => {
            if (data.message) {
                alert(data.message);
                navigate('/');
            }
        }).catch((err) => {
           
            navigate('/signup');
            console.log(err);
        });
    }, []);
    const [collect, setcollect] = useState( ()=>{
      const storedTodos = localStorage.getItem("spare");
      const todos = JSON.parse(storedTodos);
     return todos ? todos: [];
    });
    const inputref = useRef();
    const [hidden, sethidden] = useState('none');
    const [hiddencol, sethiddencol] = useState('block');

    useEffect(() => {
        console.log(collect, "Updated collect");
        localStorage.setItem("spare", JSON.stringify(collect));
    }, [collect]);
    const handleclick = () => {
        document.body.style.background = 'rgb(221, 178, 178)';
        sethidden('block');
    };
    const handleclickCollection = () => {
        const val = inputref.current.value;
        const d = Math.random();
        const objt = {
            id: d,
            value: val,
        };
        setcollect([...collect, objt]);
        inputref.current.value = "";
    };
    const handleIndividual = (e) => {
        console.log(e.target.innerHTML);
        sethiddencol('none');
        const text = e.target.innerHTML;
      const container = document.body;
        const root = ReactDOM.createRoot(container);
        root.render(
          <>
           <Nav/>
            <Complement text={text}/>
            <Footer />
          </>
        );
    };
    const handleXClose = (id,value) => {
        const newcollect = collect.filter((item) => item.id !== id);
        setcollect(newcollect);
        localStorage.removeItem(value);
    };
    return (
        <div className='col'>
            <div className='collection' style={{ display: hiddencol }}>
                <div className='col-2'>
                    <p>All Collections</p>
                    <button onClick={handleclick} className='btn-new'>
                        Create new
                    </button>
                </div>
                <div className='col-list'>
                    <div className='col-single'>
                        <Link to="/Work">Work</Link>
                    </div>
                    <div className='col-single'>
                        <Link to="/Personal">Personal</Link>
                    </div>
                    <div className='col-single'>
                        <Link to="/Grocery">Home</Link>
                    </div>
                    {collect.map((col, index) => (<>
                    <div className='divclose'>
                    <div key={col.id} className='col-single' style={{ color: "white" }} onClick={handleIndividual}>
                           
                           {col.value}
                       </div>
                        <div className='Xclose' onClick={(e) => { e.stopPropagation(); handleXClose(col.id,col.value); }}>X</div>
                    </div>
                     
                    </>  
                    ))}
                </div>
            </div>
            <div className='popup' style={{ display: hidden }}>
                <div className='X' onClick={() => { sethidden('none'); document.body.style.backgroundColor = 'rgb(69, 60, 60)'; }}>X</div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "8px", flexDirection: "column", gap: "20px" }}>
                    <div>
                        <center><h1 style={{ paddingRight: "15px" }}>create new collection</h1></center>
                    </div>
                    <div>
                        <input type="text" style={{ width: "100%" }} className='colinp' placeholder='create collection' ref={inputref} required = {true}/>
                    </div>
                    <button type='submit' className='crcol' onClick={() => { handleclickCollection(); sethidden('none'); document.body.style.background = 'rgb(69, 60, 60)'; }}>create</button>
                </div>
            </div>
        </div>
    );
};
export default Collection;
