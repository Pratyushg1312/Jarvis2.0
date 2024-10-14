import React, { useEffect, useState } from 'react'
import { useLoginMutation } from '../../Redux/Slices/LoginSlices/LoginApi';
import { useNavigate } from 'react-router-dom';
import { Session } from '../../Utils/Session';
import { toastAlert, toastError } from '../../Utils/ToastUtil';

const Login = () => {
    const [form, setForm] = useState({
        user_login_id: "",
        user_login_password: ""
    });
    const navigate = useNavigate();
    const [
        login, {
            data: loginData,
            error: loginError,
            isLoading: loginIsLoading,
            isSuccess: loginIsSuccess
        }
    ] = useLoginMutation();
    useEffect(() => {
        if (loginIsSuccess) {
            sessionStorage.setItem("token", loginData?.token);
            setTimeout(() => {
                sessionStorage.removeItem("token");
                navigate("/login");
            }, Session); // 10 hours

            navigate("/");
        }
    }, [loginIsSuccess]);
    async function handelSubmit(e) {
        e.preventDefault();
        try {
            await login(form).unwrap();
            toastAlert("Login Successful");
        } catch (error) {
            console.error(error);
            toastError("Invalid Credentials");
        }
    }
    return (
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={handelSubmit}>
                <input type="text" placeholder="Username" required value={form.user_login_id} onChange={(e) => {
                    setForm(prev => {
                        return { ...prev, user_login_id: e.target.value }
                    })
                }}
                    autoComplete="username" />
                <input type="password" placeholder="Password" required value={form.user_login_password} onChange={(e) => {
                    setForm(prev => {
                        return { ...prev, user_login_password: e.target.value }
                    })
                }}

                    autoComplete="password" />
                {/* {loginError && <p className='form-error'>{loginError.data.error}</p>} */}
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;