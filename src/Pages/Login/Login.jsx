import React, { useState } from 'react'
import { useLoginMutation } from '../../Redux/Slices/LoginSlices/LoginApi';

const Login = () => {
    const [form, setForm] = useState({
        user_login_id: "",
        user_login_password: ""
    });
    const [
        login, {
            data: loginData,
            error: loginError,
            isLoading: loginIsLoading,
            isSuccess: loginIsSuccess
        }
    ] = useLoginMutation();
    async function handelSubmit(e) {
        e.preventDefault();
        try {
            await login(form).unwrap();
        } catch (error) {

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
                }} />
                <input type="password" placeholder="Password" required value={form.user_login_password} onChange={(e) => {
                    setForm(prev => {
                        return { ...prev, user_login_password: e.target.value }
                    })
                }} />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;