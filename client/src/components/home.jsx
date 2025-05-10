import { Outlet, Link } from "react-router-dom";
import '../css/home.css';

function Home() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const handleLogout = () => {
    localStorage.setItem('currentUser', JSON.stringify());
  };

  return (
    <div className="home">
      <div className="header">
        ברוכים הבאים! {currentUser?.username}
      </div>

      <div className="menu">
        <Link to="/login" replace={true} onClick={handleLogout}>Logout</Link>
        <Link to="Info">Info</Link>
        {/* <Link to="Albums">Albums</Link> */}
        <Link to="Posts">Posts</Link>
        <Link to="Todos">Todos</Link>
      </div>

      {/* תוכן עמוד הבית */}
      <div className="main-content">
        <Outlet context={currentUser} />
      </div>
    </div>
  );
}
export default Home;