import React from 'react'
import { IoIosAlert } from "react-icons/io";

function ErrorText({text}: {text: string}) {
  return (
    <span className='text-[12px] whitespace-pre-line flex text-red-700 '><IoIosAlert className='mr-1' size={16} />{text}</span>
  )
}

export default ErrorText