import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';
import Swal from 'sweetalert2';
import { AuthContext } from '../ContextApi/AuthProvider';
import useTitle from '../Sheared/Title';

const Login = () => {
  useTitle("Login")
 const navigate = useNavigate()
 const location = useLocation();
 const from = location.state?.from?.pathname || "/"

  const [disabled, setDisabled] = useState(true);

  //firbase context api start
  const { signIn } = useContext(AuthContext)
  //firbase context api end

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, [])



  const handeLogin = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password)
    signIn(email, password)
      .then(result => {
        const user = result.user;
        console.log(user)
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: 'Login Successful',
          showConfirmButton: false,
          timer: 1500
        })
        navigate(from,{replace:true});
      })
  }

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value) == true) {
      setDisabled(false)
    }

    else {
      setDisabled(true)
    }
  }


  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col md:flex-row-reverse">
          <div className="text-center md:w-1/2 lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
          <div className="card  md:w-1/2 max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handeLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              {/* Captcha start */}
              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input type="text" onBlur={handleValidateCaptcha} name='captcha' placeholder="type the captcha above" className="input input-bordered" required />
           <input type="checkbox" checked="checked" className="checkbox checkbox-xs mt-4" />    </div>

              {/* Captcha end */}

              <div className="form-control mt-6">
                <input disabled={disabled} className="btn btn-primary" type='submit' value="Login" />
              </div>
            </form>
            <p><small>New Here?</small> <Link to="/register">Create an account</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;