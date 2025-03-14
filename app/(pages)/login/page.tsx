"use client";
import axios from "axios";
import { useState } from "react";
import {Spinner} from "@radix-ui/themes"
import {Input, Button } from "@heroui/react";
 const Login=()=>{
    const [param,setParam]=useState({password:"",email:""});
    const[processing,setProcessing]=useState(false);

    const handleSubmit=async (e:React.FormEvent)=>{
        e.preventDefault();
        setProcessing(true);
        try{
            const response=await axios.post('/api/users/login',param)

            if(response.status!==200) throw new Error(response.data.error)

            localStorage.setItem("token",response.data.token)
            setParam({password:"",email:""})
            alert("Loged in Successfully")
            window.location.reload();
        }catch(err){
            alert(err)
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