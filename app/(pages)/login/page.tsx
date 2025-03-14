"use client";
import axios from "axios";
import { useState } from "react";
import {Spinner} from "@radix-ui/themes"
import {Input, Button } from "@heroui/react";
import { addToast } from "@heroui/react";
import { setTimeout } from "timers";
 const Login=()=>{

    const [param,setParam]=useState({password:"",email:""});
    const[processing,setProcessing]=useState(false);
    const [isError,setIsError]=useState(false);

    const handleSubmit=async (e:React.FormEvent)=>{
        e.preventDefault();
        setProcessing(true);
        try{
            const response=await axios.post('/api/users/login',param)

            if(response.status!==200) throw new Error(response.data.error)

            localStorage.setItem("token",response.data.token)
            setParam({password:"",email:""})
             addToast({
                title: "login state",
                description: "Log in successful",
                color: "success",
              })
            
           setTimeout(()=>window.location.reload(),5000)  
        }catch(err){
            alert(err)
            addToast({
                title: "login error",
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
        </form>:<Spinner />}  
        </div>
    </div>
}
export default Login