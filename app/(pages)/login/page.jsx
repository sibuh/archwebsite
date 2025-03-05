"use client";
 const Login=()=>{
    const handleChange=()=>{}
    return <div>
        <form>
            <input
            type="email"
            placeholder="Email"
            onChange={handleChange}
            />
            <input
                type="password"
                 placeholder="Password"
                 onChange={handleChange}
            /> 
        </form>
    </div>
}
export default Login