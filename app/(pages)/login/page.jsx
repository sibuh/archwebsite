"use client";
 const Login=()=>{
    const handleChange=()=>{}
    return <div>
        <form>
            <input
            type="text"
            placeholder="Email"
            onChange={handleChange}
            />
            <input
                type="text"
                 placeholder="Password"
                 onChange={handleChange}
            /> 
        </form>
    </div>
}
export default Login