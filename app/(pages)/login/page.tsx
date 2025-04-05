"use client";
import axios from "axios";
import { useState } from "react";
import {Spinner} from "@heroui/react"
import {Input, Button } from "@heroui/react";
import { addToast } from "@heroui/react";
import { setTimeout } from "timers";
 const Login=()=>{

    const [param,setParam]=useState({password:"",email:""});
    const[processing,setProcessing]=useState(false);
    const [err,setErr]=useState('');

    const handleSubmit=async (e:React.FormEvent)=>{
        e.preventDefault();
        setProcessing(true);
        try{
            const response=await axios.post('/api/users/login',param)

            if(response.status!==200) throw new Error(response.data.error)

            localStorage.setItem("token",response.data.token)
            setParam({password:"",email:""})
             addToast({
                title: "User Login",
                description: "Log in successful",
                color: "success",
              })
            
           setTimeout(()=>window.location.reload(),5000)  
        }catch(error){
            console.log("error",error)
            setErr('Failed to log in')
            addToast({
                title: "User Login",
                description: "Failed to log in",
                color: "danger",
                timeout:5000,
                radius:"md"
              })
        }finally{
            setProcessing(false)
        }

    }
    return <div className="grid justify-items-center mt-4">
        <div>
            <p>Login</p>
        </div>
        <div>
        {!processing? <form className="space-y-3 flex flex-col w-96 h-auto" onSubmit={handleSubmit}>
            <div>
                <p>{err}</p>
            </div>
            <Input 
                label="Email" 
                type="email"
                className="p-2 border rounded"

                onChange={(e)=>setParam({...param,email:e.target.value})}
            />
            <Input
                className="p-2 border rounded"
                type="password"
                placeholder="Password"
                onChange={(e)=>setParam({...param,password:e.target.value})}

            /> 
            <Button color="primary" type="submit">Login</Button>
        </form>:<Spinner classNames={{label: "text-foreground mt-4"}} label="simple" variant="simple" />}  
        </div>
    </div>
}
export default Login