import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    setIsLoading(true);
    let url;
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAUCboRWtRYqoJfilnJXv_ws_eNYSV3-wI';

    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAUCboRWtRYqoJfilnJXv_ws_eNYSV3-wI';
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json(); // Parse the response JSON when it's successful
        } else {
          const data = await res.json();
          console.log(data);
          let errorMessage = 'Authentication Failed';
          throw new Error(errorMessage);
        }
      })
      .then((data) => {
        console.log(data); // Log data in both cases
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email'
            id='email'
            required
            ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Sending request...</p>}
          <button

            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;