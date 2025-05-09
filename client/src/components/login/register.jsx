import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "../../css/loginAndRegister.css";
import * as apiService from "../../apiService.js";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    password: '',
    verify_password: ''
  });

  async function handleAddUser(e) {
    e.preventDefault();
    if (user.password !== user.verify_password) {
      alert("הסיסמאות אינן תואמות, אנא נסה שוב.");
      return;
    }

    const newUser = {
      username: user.username,
      website: user.password,
      name: '',
      email: '',
      phone: '',
      address: {
        street: '',
        suite: '',
        city: '',
      },
    };

    try {
      const data = await apiService.fetchData(`users?username=${user.username}`);
      if (data.length > 0) {
        alert("שם משתמש זה כבר קיים, אנא בחר שם אחר.");
        return;
      }
      const createdUser = await apiService.addData('users', newUser);
      localStorage.setItem('currentUser', JSON.stringify(createdUser));

      alert("נא מלא פרטים מלאים להרשמה מיטבית המשתמש נוצר בהצלחה!!");
      navigate("/fullRegister");
    } catch (error) {
      alert(` ביצירת משתמש קרתה שגיאה: ${error.message}`);
    }
  }

  return (
    <div className="login">
      <form onSubmit={handleAddUser}>
        <input
          type="text"
          placeholder="username"
          value={user.username}
          javascript
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="verify-password"
          value={user.verify_password}
          onChange={(e) => setUser({ ...user, verify_password: e.target.value })}
          required
        />
        <button type="submit" className="connect">Sign Up</button>
      </form>
      <Link to="/login">log in</Link>
    </div>
  );
}
export default Register;