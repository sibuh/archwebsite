"use client";
import axios from "axios";
import { useState } from "react";
import {Button,Spinner} from "@radix-ui/themes"
 const Login=()=>{
    const [param,setParam]=useState({password:"",email:""});
    const[processing,setProcessing]=useState(false);

    const handleSubmit=async (e:React.FormEvent)=>{
        e.preventDefault();
        setProcessing(true);
        try{
            const response=await axios.post('/api/users/login',param)
            const data=response.data
            if(data.status!==200) throw new Error("Login Failed")
            alert("Loged in Successfully")
        }catch(err){
            alert(err)
        }finally{
            setProcessing(false)
        }

    }
    return <div className="grid justify-items-center">
        <div><p>Login</p></div>
        <div>
        {processing?<p></p>: <form className="space-y-3 flex flex-col" onSubmit={handleSubmit}>
            <input
            className="p-2 border rounded"
            type="email"
            placeholder="Email"
            onChange={(e)=>setParam({...param,email:e.target.value})}
            />
            <input
                className="p-2 border rounded"
                type="password"
                placeholder="Password"
                onChange={(e)=>setParam({...param,password:e.target.value})}
            /> 
            <Button type="submit">{processing?<Spinner />:<p>Login</p>} </Button>
        </form>}  
        </div>
    </div>
}
export default Login