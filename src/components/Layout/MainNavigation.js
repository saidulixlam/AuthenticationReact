import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import { useCallback, useContext, useEffect } from 'react';
import AuthContext from '../../store/auth-context';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const inactivityTimeout = 5 * 60 * 1000; // 5 minutes
  let timer;

  const resetTimer = () => {
    clearTimeout(timer);
    timer = setTimeout(logoutUser, inactivityTimeout);
  };

  const logoutUser = () => {
    authCtx.logout();
    localStorage.removeItem('token');
    //alert('Log out Succesfull')
    // Clear user session (e.g., remove tokens, clear local storage)
    // Redirect to the login page or perform any other necessary actions
    // Display a logout notification if needed
  };

  const logoutHandler = () => {
    // Perform manual logout when the user clicks the logout button
    clearTimeout(timer); // Clear the auto logout timer
    logoutUser();
  };

  useEffect(() => {
    // Set up event listeners to reset the timer on user activity
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);

    // Initialize the timer
    resetTimer();

    // Clean up the event listeners and timer on component unmount
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, [resetTimer, timer]);


  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && <li>
            <Link to='/auth'>Login</Link>
          </li>}
          {isLoggedIn && (<li>
            <Link to='/profile'>Profile</Link>
          </li>)}
          {isLoggedIn && <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
