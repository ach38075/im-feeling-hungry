import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom"
import './css/NavBar.css'
import { LogoutButton } from './LogoutButton'
import { RefreshContext } from '../context/RefreshContext';

export function NavBar() {
    const [username, setUsername] = useState('');
    const { refresh } = useContext(RefreshContext);
    const [loginVisible, setLoginVisible] = useState(true);
    const [logoutVisible, setLogoutVisible] = useState(false);

    useEffect(() => {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {                 // if user is logged in
            setUsername(storedUsername);
            setLogoutVisible(true);         // display username and Logout button
            setLoginVisible(false);         // hide Login button
      } else {
            setUsername('');                // user not logged in
            setLogoutVisible(false);        // hide Logout button
            setLoginVisible(true);          // show Login button
      }
    }, [refresh]);

          // DEBUGGING
          const debug = () => {
            const saved = localStorage.getItem("savedRecipes");
            const recipeArray = saved ? JSON.parse(saved) : [];
            console.log("Saved Recipes Array:", recipeArray);
        };

    return (
        <div className="container">
            <Link to="/">
                <button>Home</button>
            </Link>
            <Link to="/login">
                {loginVisible && (
                    <button>Login</button>
                )}
            </Link>
            {logoutVisible && (
                <div className='user_display'>
                    <h4 className ='user_greeting'>
                        {username ? 'Welcome back, ' + username : ''}
                    </h4>
                    <Link to="/savedRecipes">
                        <button onClick={debug}>Saved Recipes</button>
                    </Link>
                    <Link to="/login">
                        <LogoutButton />
                    </Link>
                </div>
            )}
            
        </div>
    )
}
