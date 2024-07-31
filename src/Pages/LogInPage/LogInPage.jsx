import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../Util/accountAPI";

const LogInPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginRequest = {
            email: email,
            password: password,
        };
        try {
            const data = await login(loginRequest);
            console.log("data", data.user);
            console.log("succesvol ingelogd");
            if (data.status !== 404) {
                localStorage.setItem("agenda_token", data.token);
                localStorage.setItem("agenda_first_name", data.user.firstName);
                localStorage.setItem("agenda_last_name", data.user.lastName);
                localStorage.setItem("agenda_id", data.user.id);
                navigate(`/`);
            } else {
                localStorage.setItem("agenda_id", "1");
                localStorage.setItem("agenda_first_name", "User");
                // navigate(`/`);
            }
        } catch (error) {
            console.error("Error:", error);
            // add error message here
            // navigate(`/`);
        }
    };

    return (
        <div className="login-container">
            <h3>Login</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        required
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={handleChangeEmail}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        required
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={handleChangePassword}
                    />
                </div>
                <div className="button-group">
                    <button type="submit">Login</button>
                    <button type="button" onClick={() => navigate(`/signup`)}>
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LogInPage;
