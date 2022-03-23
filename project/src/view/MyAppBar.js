import React, { useEffect, useState } from 'react'
import Line from '../UIKit/Line'
import { Link } from 'react-router-dom'
import { clearSessionStorage, getStorageItem } from '../services/Functions'
import LogoutIcon from '@mui/icons-material/Logout'
import Box from '@mui/material/Box'
import './Navigation.css'

export default function MyAppBar  () {
    const [user, setUser] = useState()

    useEffect(() => {
        var _user = JSON.parse(getStorageItem('user'))
        setUser(_user)
    }, [])

    return (< div className='root'
        style={
            { zIndex: -1 }
        } >
        <Line width='100vw' >
            < Link to='/map'
                className='link' >
                <Box component='img'
                    sx={
                        { height: '15vh', width: '25vh', maxHeight: { xs: 233, md: 167 }, maxWidth: { xs: 350, md: 250 } }
                    }
                    alt='The house from the project.'
                    src='./logo4.png' />
            </Link> <Link className='link'
                to='/map' >
                מפה   </Link>   <Link className='link'
                    to='/sign_in' >
                התחברות   </Link>   <Link className='link'
                    to='/users' >
                פרטי משתמשים   </Link> <div className='log_out' onClick={()=>clearSessionStorage()}><Link className='link'
                    to='/sign_in' >   <LogoutIcon />
                </Link>   {
                    user && (< Box component='span' > {user.firstName + ' ' + user.lastName} </Box>)} </div></Line >   </ div>)
}