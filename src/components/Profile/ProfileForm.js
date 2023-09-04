import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';

const ProfileForm = () => {
  const newPasswordRef = useRef();
  const ctx = useContext(AuthContext);

  function submitHandler(e) {
    e.preventDefault();

    const enteredNewPassord = newPasswordRef.current.value;
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAUCboRWtRYqoJfilnJXv_ws_eNYSV3-wI',
    {
      method: 'POST',
      body: JSON.stringify({
        idToken: ctx.token,
        password: enteredNewPassord,
        returnSecureToken: false
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res=>{
      console.log(res);
    })
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password'minLength='7' id='new-password' ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
