import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom"
import './css/NavBar.css'
import { LogoutButton } from './LogoutButton'
import { RefreshContext } from '../context/RefreshContext';

export function NavBar() {
    const [username, setUsername] = useState('');
    const { refresh } = useContext(RefreshContext);
    const [loginVisible, setLoginVisible] = useState(true);
    const [logoutVisible, setLogoutVisible] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

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

    const loadSavedRecipes = () => {
        if (location.pathname === '/savedRecipes') {    // if already on SavedRecipes page
            navigate('/'); // first navigate away
            setTimeout(() => navigate('/savedRecipes'), 0); // then back
        } else {
            navigate('/savedRecipes');
        }
    }

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

                    <button onClick={() => {
                        debug();
                        loadSavedRecipes();
                    }}>
                        Saved Recipes
                    </button>

                    <Link to="/login">
                        <LogoutButton />
                    </Link>
                </div>
            )}
            
        </div>
    )
}
