import { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { BsExclamationCircle } from "react-icons/bs";
import { FaRegCircleCheck } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [details, setDetails] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });

    const [submitted, setSubmitted] = useState(false);

    const login = (e) => {
        const { name, value } = e.target;
        setDetails((prev) => ({
            ...prev, [name]: value
        }));
    };

    const validate = () => {
        let valid = true;
        let newErrors = {};

        if (details.email.trim() === "") {
            newErrors.email = "Email cannot be blank";
            valid = false;
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) {
            newErrors.email = "Enter a valid email";
            valid = false;
        }

        if (details.password.trim() === "") {
            newErrors.password = "Password cannot be blank";
            valid = false;
        }
        else if (details.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
            valid = false;
        }

        setErrors(newErrors);

        return valid;
    }

    const show = (data) => {
        data.preventDefault();
        setSubmitted(true);
         console.log("Password:", details.password);
    console.log("Password length:", details.password.length);

        const isValid = validate();

        if (isValid) {
            navigate("/dashboard");
        }

    }
    return (
        <>
            <div className="Container fluid box">
                <form className="login" onSubmit={show}>
                    <h1>Log In</h1>
                    <div>
                        <label htmlFor="email"> Email</label>
                        <div className="mail">
                            <MdOutlineEmail className="icon" />
                            <input type="email"
                                name="email"
                                id="email"
                                onChange={(e) => login(e)}
                                placeholder="abc@gmail.com"
                                value={details.email}
                                className={submitted ? (errors.email ? "error_border" : "success_border") : ""} />

                            {submitted &&
                                (errors.email ? (
                                    <BsExclamationCircle className="failure" />
                                ) : (
                                    <FaRegCircleCheck className="success" />
                                ))
                            }
                        </div>
                        <div className="error">{errors.email}</div>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <div className="pass">
                            <FaLock className="icon" />
                            <input type="password"
                                name="password"
                                id="password"
                                onChange={(e) => login(e)}
                                placeholder="Password here"
                                value={details.password}
                                className={submitted ? (errors.password ? "error_border" : "success_border") : ""} />

                            {submitted &&
                                (errors.password ? (
                                    <BsExclamationCircle className="failure" />
                                ) : (
                                    <FaRegCircleCheck className="success" />
                                ))
                            }
                        </div>



                        <div className="error">{errors.password}</div>
                    </div>
                    <button type='submit'  onClick={() => console.log("BUTTON CLICKED")}>Submit</button>
                </form>
            </div>
        </>
    )
}

export default Login;