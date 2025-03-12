"use client";
import {Button,Spinner} from "@radix-ui/themes"
import axios from "axios";


import { useState } from "react";

 const Signup= () => {
    const initialState={
        first_name:"",
        last_name:"",
        username:"",
        password:"",
        email:"",
        phone:""
    }
    const[user,setUser]=useState(initialState);
    const [processing,setProcessing]=useState(false);

    const handleSubmit =async (e: React.FormEvent)=>{
        e.preventDefault();
        setProcessing(true);
        try{
            const res=await axios.post('/api/users/signup',user)

            if (res.status!==201) throw new Error(res.data.error)

            localStorage.setItem("token",res.data.token)
            sessionStorage.setItem("token",res.data.token)

            setUser(initialState)
            alert("Registration Successfull")
        }catch(err){
            alert(err);
        }finally{
            setProcessing(false);
        }
    }
    return <div className="flex flex-col mt-5  ">
                {(!processing)?
                    <form className="flex flex-col m-auto w-96 h-auto p-3 space-y-3" onSubmit={handleSubmit}>
                        <input
                            className="p-2 border rounded"
                            type="text"
                            placeholder="FirstName"
                            value={user.first_name}
                            onChange={(e)=>setUser({...user,first_name:e.target.value})}
                        />
                        <input
                            className="p-2 border rounded"
                            type="text"
                            placeholder="LastName"
                            value={user.last_name}
                            onChange={(e)=>setUser({...user,last_name:e.target.value})}
                        />

                        <input
                            className="p-2 border rounded"
                            type="text"
                            value={user.username}
                            placeholder="Username"
                            onChange={(e)=>setUser({...user,username:e.target.value})}
                        /> 

                        <input
                        className="p-2 border rounded"
                        type="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={(e)=>setUser({...user,password:e.target.value})}
                        /> 
                        <input
                        className="p-2 border rounded"
                        type="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={(e)=>setUser({...user,email:e.target.value})}
                        />
                        <input
                            className="p-2 border rounded"
                            type="text"
                            placeholder="phone"
                            value={user.phone}
                            onChange={(e)=>setUser({...user,phone:e.target.value})}
                        />
                    <Button type="submit" disabled={processing} className="ring-2">Register </Button>
                    </form>:<Spinner />}
           </div>
 }
export default Signup