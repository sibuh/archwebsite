"use client";

 const Signup= () => {
    const handleChange=()=>{}
    return <div>
                <form>
                    <input
                        type="text"
                        placeholder="FirstName"
                        onChange={handleChange}
                     />
                      <input
                        type="text"
                        placeholder="LastName"
                        onChange={handleChange}
                     />

                    <input
                        type="text"
                        placeholder="Username"
                        onChange={handleChange}
                    /> 

                    <input
                     type="text"
                     placeholder="Password"
                     onChange={handleChange}
                    /> 
                    <input
                    type="text"
                    placeholder="Email"
                    onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder="phone"
                        onChange={handleChange}
                    />
                </form>
           </div>
}
export default Signup