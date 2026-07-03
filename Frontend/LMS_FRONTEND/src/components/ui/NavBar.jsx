import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
function NavBar() {
  return (
    <div className='h-[12vh] w-full flex items-center justify-between px-9'>
    <h1>EduSmart</h1>
    <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
   </Avatar>
    </div>
  )
}

export default NavBar

