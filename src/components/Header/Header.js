import "./Header.css";

export const Header = () => {
  return (
    <header className="Blog-header">
      <nav className="Blog-header__nav">
        <ul className="Blog-header__nav-list">
          <li className="Blog-header__nav-list-item">
            <p className="Blog-header__nav-list-p">Home</p>
          </li>
          <li className="Blog-header__nav-list-item">
            <p className="Blog-header__nav-list-p">About</p>
          </li>
          <li className="Blog-header__nav-list-item">
            <p className="Blog-header__nav-list-p">Contact</p>
          </li>
        </ul>
      </nav>
    </header>
  );
};
