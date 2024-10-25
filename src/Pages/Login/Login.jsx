import React, { useEffect, useState } from "react";
import { useLoginMutation } from "../../Redux/Slices/LoginSlices/LoginApi";
import { useNavigate } from "react-router-dom";
import { Session } from "../../Utils/Session";
import { toastAlert, toastError } from "../../Utils/ToastUtil";
import TextField from "@mui/material/TextField";
import { Eye, EyeSlash, Lock, User } from "@phosphor-icons/react";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [form, setForm] = useState({
    user_login_id: "",
    user_login_password: "",
  });
  const navigate = useNavigate();
  const [
    login,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
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

  const [showPassword, setShowPassword] = useState(false);




  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <div className="authWrapper">
        <div className="authWrapperIn">
          <div className="authBg">
            <img src="/assets/images/login/login.gif" className="authImg" />
          </div>
          <div className="authForm">
            <div className="authFormBox">
              <div className="authBrand">
                <img
                  src="/assets/images/logo/monogram.png"
                  width={90}
                  height={90}
                />
                <h4>Welcome back!</h4>
                <p>Login to your account</p>
              </div>
              <div className="authInputs">
                <form onSubmit={handelSubmit}>
                  <div className="authFormGroup">
                    <span className="authFormIcon">
                      <User />
                    </span>
                    <TextField
                      placeholder="Username"
                      required
                      variant="outlined"
                      value={form.user_login_id}
                      onChange={(e) => {
                        setForm((prev) => {
                          return { ...prev, user_login_id: e.target.value };
                        });
                      }}
                      autoComplete="username"
                    />
                  </div>
                  <div className="authFormGroup">
                    <span className="authFormIcon">
                      <Lock />
                    </span>
                    <FormControl variant="outlined">
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              onMouseUp={handleMouseUpPassword}
                              edge="end"
                            >
                              {showPassword ? <EyeSlash /> : <Eye />}
                            </IconButton>
                          </InputAdornment>
                        }
                        placeholder="Password"
                        value={form.user_login_password}
                        required
                        onChange={(e) => {
                          setForm((prev) => {
                            return {
                              ...prev,
                              user_login_password: e.target.value,
                            };
                          });
                        }}
                      />
                    </FormControl>
                  </div>
                  <div className="text-center">
                    <Button color="primary" variant="contained" type="submit">
                      Sign In
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Login;
