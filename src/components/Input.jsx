import React, { useId } from 'react'
//since we are binding the hook thingy we'll use arrow funcn for better presentation

const Input =React.forwardRef((
    {
        label,
        type="text",
        className="",
        ...otherProps
    }
    ,ref
)=>{
const id=useId(); 
return(
    <div className='w-full'>
        {
        label&& <label className='block mb-1' htmlFor={id}>{label}</label>
        }
        <input type={type}
         className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
         ref={ref} 
         {...otherProps}
         id={id}/>
    </div>
)
})

export default Input