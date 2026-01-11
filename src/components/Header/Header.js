import { NavLink } from "react-router-dom";
import "./Header.css";
import LogoutIcon from '@mui/icons-material/Logout';

export const Header = ({ isLoggedIn, setIsLoggetIn, userName }) => {
  const handleLogOut = () => {
    localStorage.setItem('isLoggedIn', false);
    setIsLoggetIn(false);
  }
  return (
    <header className="Blog-header">
      {
        isLoggedIn ?
        <nav className="Blog-header__nav">
          Добро пожаловать, {userName}
          <ul className="ac">
            <li className="ai">
              <NavLink to="/" className="aa">Home</NavLink>
            </li>
            <li className="ai">
              <p className="aa">About</p>
            </li>
            <li className="ai">
              <NavLink to="/login" className="aa" onClick={handleLogOut} ><LogoutIcon />Выход</NavLink>
            </li>
          </ul>
        </nav>

        : 'Добро пожаловать, гость!'
      }
      
    </header>
  );
};
