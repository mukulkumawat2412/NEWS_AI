import React from 'react'
import { Avatar,Menu,Divider,Text } from '@mantine/core'
import { Link, useNavigate } from 'react-router-dom'
import { User,Bookmark,Book,LogOut,Mail } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { signout } from '../redux/slices/authSlice.jsx'

function ProfileDropdown() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSignOut = ()=>{
        dispatch(signout())
        navigate("/login")
    }


  return (
    
    <div>
    <Menu shadow="md" width={300}>
      <Menu.Target>
        <Avatar className="cursor-pointer" />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Profile</Menu.Label>

        <Link to={"/profile"}>
          
          <Menu.Item leftSection={<User size={16} />}>Profile</Menu.Item>
        </Link>
        <Menu.Item
          leftSection={<Bookmark size={16} />}
        
        >
          Bookmarks
        </Menu.Item>
        <Menu.Item leftSection={<Book size={16} />} >
          Reading History
        </Menu.Item>

        <Divider />
        <Menu.Item onClick={handleSignOut}
          leftSection={<LogOut size={16} />}
          color="red"
          
        >
          Sign Out
          
        </Menu.Item>
        <Text leftSection={<Mail size={16} />} ml={20} size="sm">
       
        </Text>
      </Menu.Dropdown>
    </Menu>
  </div>




  )
}

export default ProfileDropdown

