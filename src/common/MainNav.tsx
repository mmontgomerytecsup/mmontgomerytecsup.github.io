import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function MainNav() {
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUsername(parsed.username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUsername(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top bg-dark" >
      <div className="container">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/game">Game</Link>
            </li>
            {!username && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            )}
          </ul>

          {username && (
            <div className="d-flex align-items-center ms-auto">
              <span className="me-3">Hello, <strong>{username}</strong></span>
              <button
                className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default MainNav;
