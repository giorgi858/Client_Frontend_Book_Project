import { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api';
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import LoadingIndicator from '../components/LoadingIndicator';
// import useAuth from '../hooks/useAuth';
const LOGIN_URL = '/api/token/';

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    // const { setAuth } = useAuth()
    const userRef = useRef();   
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const [loading, setLoading] = useState(false);

    const [auth, setAuth] = useState({});

    
    const method='login'

    useEffect(() => {
        userRef.current.focus();
    }, [])
 
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const response = await api.post(LOGIN_URL,
                { username: user, password: pwd }
                )
                console.log('response',response);
                if (method === "login") {
                    localStorage.setItem(ACCESS_TOKEN, response.data.access);
                    localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
                    setAuth({  username: user, password: pwd});

                    navigate("/book")
                } else {
                    navigate("/login")
                }
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        } finally {
            setLoading(false);

        }
    }

    return (
            <div className='loginDiv'>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1 style={{display: 'flex', justifyContent: 'center', alignItems: "center"}}>Sign In</h1>
                <form onSubmit={handleSubmit} className='Login-Form'>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                    {loading && <LoadingIndicator />}
                    <button className='signInBtn'>Sign In</button>
                </form>
                <p className='needAccout'>
                    Need an Account?<br />
                    <span className="line">
                        <Link to='/register'>Sign Up</Link>
                    </span>
                </p>
            </div>
            )
        }

export default Login