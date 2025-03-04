"use client";

 const Signup= () => {
    const handleChange=()=>{}
    return <div>
                <form className="flex flex-col ">
                    <input
                        className="w-full p-2 border rounded"
                        type="text"
                        placeholder="FirstName"
                        onChange={handleChange}
                     />
                      <input
                        className="w-full p-2 border rounded"
                        type="text"
                        placeholder="LastName"
                        onChange={handleChange}
                     />

                    <input
                        className="w-full p-2 border rounded"
                        type="text"
                        placeholder="Username"
                        onChange={handleChange}
                    /> 

                    <input
                     className="w-full p-2 border rounded"
                     type="text"
                     placeholder="Password"
                     onChange={handleChange}
                    /> 
                    <input
                    className="w-full p-2 border rounded"
                    type="text"
                    placeholder="Email"
                    onChange={handleChange}
                    />
                    <input
                        className="w-half p-2 border rounded"
                        type="text"
                        placeholder="phone"
                        onChange={handleChange}
                    />
                </form>
           </div>
}
export default Signup