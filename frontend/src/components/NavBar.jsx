import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import './css/NavBar.css'
import { LogoutButton } from './LogoutButton'

export function NavBar() {
    const [username, setUsername] = useState('');

    useEffect(() => {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }, []);

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
