import "./style.scss"
import loginimage from "../assets/Loginimage.png"
import logologin from "../assets/logo.png"
import lvlogo from "../assets/lv-logo-white.png"
import { useNavigate } from 'react-router-dom';

const Login = () => {
   const navigate = useNavigate();

  const handleLogin = () => {
    console.log('click');
    navigate('/home');

  }
  return (
    <div className="login-container">
      <div className="left-pane">
        <img src={lvlogo} alt="LatentView" className="lv-logo" />
        <img src={loginimage} alt="Graph Visual" className="illustration" />
      </div>
      <div className="right-pane">
        <div className="login-content">
            <div className="mb-25">
          <img
            src={logologin}
            alt="Sales Cockpit Icon"
            className="login-icon"
          />
          <h2>Sales Cockpit Generator</h2>
          </div>
          <div className="mb-26">
          <p className="subtext">
            Login using your Official Mail ID to access the <br /> Sales Cockpit Generator Platform
          </p>
          </div>
          <div>
          <button className="google-btn"  onClick={handleLogin}>
            <img
              src="https://img.icons8.com/color/16/google-logo.png"
              alt="Google"
             
            />
            Continue with Google
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
