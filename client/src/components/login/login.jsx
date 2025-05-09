import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "../../css/loginAndRegister.css";
import * as apiService from "../../apiService.js";

function Login() {
    const navigate = useNavigate(); 
    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const data = await apiService.fetchData(`users?username=${user.username}&website=${user.password}`);
            if (data.length == 0) {
                throw "משתמש לא מורשה!"
            }
            localStorage.setItem('currentUser', JSON.stringify(data[0]));
            alert(`זיהוי בהצלחה!`);
            navigate(`/home/users/${data[0].id}`); 
        }
        catch (error) {
            alert(`שגיאה במהלך זיהוי המשתמש: ${error.message}`);
        }
    }

    return (
        <div className="login">
            <form onSubmit={handleLogin}  >
                <input
                    type="text"
                    placeholder="userName"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    required
                />
                <input
                    type="password"
                    placeholder='Password'
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    required
                />
                <button type="submit" className="connect">Login</button>
            </form>
            <Link to="/register">Sign up</Link>
        </div>
    );
}
export default Login;