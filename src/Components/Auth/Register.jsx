
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Auth.css";

function Register() {
    const [form,setForm]=useState({
        name:"",
        email:"",
        password:""
 });

 const handleSubmit = async(e) =>{
    e.preventDefault(); // Preventing  from page reload
    try{
        await
        axios.post("http://localhost:5000/api/auth/signup",form);
        alert("Registration successful! You can now log in.");
        setForm({name:"",email:"",password:""}) //Reset form
    }
    catch(err){
        alert(err.response?.data?.messege||"Something went wrong!")
    }
 };
  return (
    <div className="container">
      <div className="box">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="register">
            <label>Full Name</label>
            <input id="name" type="text" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} required></input>
            <label>Email</label>
            <input id="email" type="text" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} required></input>
            <label>Password</label>
            <input id="password" type="password" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} required></input>
            <button className="btn">Register</button>
          </div>
          <p>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
