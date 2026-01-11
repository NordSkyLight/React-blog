import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export const Login = ({ setIsLoggetIn, setUserName }) => {
    const navigate = useNavigate();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginChange = (e) => {
        setLogin(e.target.value)
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    
    const handleLogIn = (e) => {
        e.preventDefault();
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('userName', login);
        setUserName(login);
        setIsLoggetIn(true);
        navigate('/');
    };
    return (
        <h1>
            <form className="loginForm" onSubmit={handleLogIn}>
                <h2 className="loginTitle">Авторизация</h2>
                <div>
                    <input onChange={handleLoginChange} type="text" placeholder="Логин" required />
                </div>
                <div>
                    <input onChange={handlePasswordChange} type="password" placeholder="Пароль" required />
                </div>
                <div>
                    
                        <button className="addPostBtn" type="submit">Войти</button>
                    
                </div>
            </form>
        </h1>
    );
};
