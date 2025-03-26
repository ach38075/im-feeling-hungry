import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom"
import './css/NavBar.css'
import { LogoutButton } from './LogoutButton'
import { RefreshContext } from '../context/RefreshContext';

export function NavBar() {
    const [username, setUsername] = useState('');
    const { refresh } = useContext(RefreshContext);

    useEffect(() => {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      } else {
        setUsername('');
      }
    }, [refresh]);

    return (
        <div className="container">
            <Link to="/">
                <button>Home</button>
            </Link>
            <Link to="/login">
                <button>Login</button>
            </Link>
            <div className='user_display'>
                <h4 className ='user_greeting'>
                    {username ? 'Welcome back, ' + username : ''}
                </h4>
                <Link to="/login">
                    <LogoutButton />
                </Link>
            </div>
            
        </div>
    )
}
