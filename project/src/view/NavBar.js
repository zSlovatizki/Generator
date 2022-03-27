import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom'
import { clearSessionStorage, getStorageItem } from '../services/Functions'
import './Navigation.css'
import AccountCircle from '@mui/icons-material/AccountCircle';

const pages = ['מפה', 'פרטי משתמשים', 'הודעות'];
const pagesUrl = ['map', 'users', 'message'];


const ResponsiveAppBar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [user, setUser] = useState()
    const [anchorEl, setAnchorEl] = useState(null);

    React.useEffect(() => {
        var _user = JSON.parse(getStorageItem('user'))
        setUser(_user)
    }, [])

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }
    return (
        <AppBar position="fixed" className="appBar">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="img"
                        sx={{ height: '12vh', width: '22vh', display: { xs: 'none', md: 'flex' } }}
                        src='./logo4.png'
                    />
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            className="menu"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page, index) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Link className='link'
                                        to={`/${pagesUrl[index]}`} >{page}
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="img"
                            sx={{ height: '12vh', width: '22vh', display: { xs: 'flex', md: 'none' } }}
                            src='./logo4.png'
                        >
                        </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                        {pages.map((page, index) => (
                            <MenuItem key={page}>
                                <Link className='linkMenu'
                                    to={`/${pagesUrl[index]}`}>{page}
                                </Link>
                            </MenuItem>
                        ))}
                    </Box>
                    <Box>
                        {
                            user && (< Box component='span' > {user.firstName} </Box>)
                        }
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem
                                onClick={handleClose}
                            > <Link className='link'
                                to='/sign_up' >הרשמה
                                </Link></MenuItem>
                            <MenuItem
                                onClick={handleClose}
                            ><Link className='link'
                                to='/sign_in' onClick={() => clearSessionStorage()}>התנתקות
                                </Link></MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
