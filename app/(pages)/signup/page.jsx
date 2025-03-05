"use client";
import {Button,Spinner} from "@radix-ui/themes"


import { useState } from "react";

 const Signup= () => {
    const[user,setUser]=useState<FormData>({
        first_name:"",
        last_name:"",
        username:"",
        password:"",
        email:"",
        phone:""
    });
    const [processing,setProcessing]=useState(false);

    const handleSubmit=async (e)=>{
        e.preventDefault();
        setProcessing(true);
        try{
            const res =await fetch("/app/users/signup",{
                method:'POST',
                body:data
            })
            if (!res.ok) throw new Error("Registration failed")
            alert("Registration Successfull")
        }catch(err){
            alert(err);
        }finally{
            setProcessing(false);
        }
    }
    return <div>
            {!processing&&
                <form className="flex flex-col " onSubmit={handleSubmit}>
                    <input
                        className="w-full p-2 border rounded"
                        type="text"
                        placeholder="FirstName"
                        onChange={setUser({...user,first_name:e.target.value})}
                     />
                      <input
                        className="w-full p-2 border rounded"
                        type="text"
                        placeholder="LastName"
                        onChange={setUser({...user,last_name:e.target.value})}
                     />

                    <input
                        className="w-full p-2 border rounded"
                        type="text"
                        placeholder="Username"
                        onChange={setUser({...user,username:e.target.value})}
                    /> 

                    <input
                     className="w-full p-2 border rounded"
                     type="password"
                     placeholder="Password"
                     onChange={setUser({...user,password:e.target.value})}
                    /> 
                    <input
                    className="w-full p-2 border rounded"
                    type="email"
                    placeholder="Email"
                    onChange={setUser({...user,email:e.target.value})}
                    />
                    <input
                        className="w-half p-2 border rounded"
                        type="text"
                        placeholder="phone"
                        onChange={setUser({...user,phone:e.target.value})}
                    />
                 <Button type="submit" disabled={processing}>Register {processing&&<Spinner />} </Button>
                </form>
                
                }
           </div>
}
export default Signup