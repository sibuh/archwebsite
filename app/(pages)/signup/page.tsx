"use client";
import {Spinner} from "@radix-ui/themes"
import {Input, Button,addToast } from "@heroui/react";
import axios from "axios";


import { useState } from "react";

 const Signup= () => {
    const initialState={
        first_name:"",
        last_name:"",
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
            addToast({
            title:"Registration",
            description:"Registration Successfull",
            color:"success"
           })
        }catch(err){
            addToast({
                title:"User Registration",
                description:"User Registration Failed",
                color:"danger"
            });
        }finally{
            setProcessing(false);
        }
    }
    return <div className="flex flex-col mt-5  ">
                {(!processing)?
                    <form className="flex flex-col m-auto w-96 h-auto p-3 space-y-3" onSubmit={handleSubmit}>
                        <Input
                            className="p-2 border rounded"
                            type="text"
                            label="FirstName"
                            value={user.first_name}
                            onChange={(e)=>setUser({...user,first_name:e.target.value})}
                        />
                        <Input
                            className="p-2 border rounded"
                            type="text"
                            placeholder="LastName"
                            value={user.last_name}
                            onChange={(e)=>setUser({...user,last_name:e.target.value})}
                        />

                        <Input
                        className="p-2 border rounded"
                        type="password"
                        label="Password"
                        value={user.password}
                        onChange={(e)=>setUser({...user,password:e.target.value})}
                        /> 
                        <Input
                        className="p-2 border rounded"
                        type="email"
                        label="Email"
                        value={user.email}
                        onChange={(e)=>setUser({...user,email:e.target.value})}
                        />
                        <Input
                            className="p-2 border rounded"
                            type="text"
                            label="phone"
                            value={user.phone}
                            onChange={(e)=>setUser({...user,phone:e.target.value})}
                        />
                    <Button type="submit" disabled={processing} color="primary" >Register </Button>
                    </form>:<Spinner />}
           </div>
 }
export default Signup