import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../Util/accountAPI";

const SignUpPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await signUp(formData);
            console.log("User added to the database");
            navigate(`/login`);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const formFields = [
        { label: "First Name", name: "firstName", placeholder: "Enter first name" },
        { label: "Last Name", name: "lastName", placeholder: "Enter last name" },
        { label: "Email", name: "email", placeholder: "Enter email", type: "email" },
        { label: "Password", name: "password", placeholder: "Enter password", type: "password" }
    ];

    return (
        <div className="container">
            <h3 className="title">Sign up</h3>
            <form onSubmit={handleSubmit} className="form">
                {formFields.map(({ label, name, placeholder, type = "text" }) => (
                    <div key={name} className="form-group">
                        <label htmlFor={name} className="label">{label}</label>
                        <input
                            id={name}
                            required
                            type={type}
                            placeholder={placeholder}
                            name={name}
                            value={formData[name]}
                            onChange={handleChange}
                            className="input"
                        />
                    </div>
                ))}
                <button type="submit">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUpPage;