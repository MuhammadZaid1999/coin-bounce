import { useState } from "react";
import TextInput from "../../components/TextInput/TextInput";
import styles from "./Signup.module.css";
import signupSchema from "../../schemas/signupSchema";
import {useFormik} from "formik";
import { signup } from "../../api/internal";
import { setUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Signup(){

    const [error, setError] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignup = async () => {
        const data = {
            name: values.name,
            username: values.username,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword
        }

        const response = await signup(data);
        if(response.status === 201){
            // set user
            const user = {
                _id: response.data.user._id,
                email: response.data.user.email,
                username: response.data.user.username,
                auth: response.data.auth
            }
            dispatch(setUser(user));

            // redirect homepage
            navigate("/");
        }
        else if(response.code === 'ERR_BAD_REQUEST'){
            // display error message
            setError(response.response.data.message);
        }  
    }

    const {values, touched, handleBlur, handleChange, errors} = useFormik({
        initialValues: {
            name: "",
            username: "",
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: signupSchema
    })

    return(
        <div className={styles.signupWrapper}>
            <div className={styles.signupHeader}>Create an Account</div>
            <TextInput 
                type="text" 
                name="name"
                value={values.name}
                onChange = {handleChange}
                onBlur={handleBlur}
                placeholder="name"
                error={errors.name && touched.name ? 1 : undefined}
                errormessage = {errors.name}
            />
            <TextInput 
                type="text" 
                name="username"
                value={values.username}
                onChange = {handleChange}
                onBlur={handleBlur}
                placeholder="username"
                error={errors.username && touched.username ? 1 : undefined}
                errormessage = {errors.username}
            />
            <TextInput 
                type="email" 
                name="email"
                value={values.email}
                onChange = {handleChange}
                onBlur={handleBlur}
                placeholder="email"
                error={errors.email && touched.email ? 1 : undefined}
                errormessage = {errors.email}
            /> 
            <TextInput 
                type="password" 
                name="password"
                onBlur={handleBlur}
                onChange = {handleChange}
                placeholder="password"
                error={errors.password && touched.password ? 1 : undefined}
                errormessage = {errors.password}
            />
            <TextInput 
                type="password" 
                name="confirmPassword"
                onBlur={handleBlur}
                onChange = {handleChange}
                placeholder="confirmPassword"
                error={errors.confirmPassword && touched.confirmPassword ? 1 : undefined}
                errormessage = {errors.confirmPassword}
            />

            <button 
                className={styles.signupButton} 
                onClick={handleSignup}
                disabled={
                    !values.name ||
                    !values.username ||
                    !values.password ||
                    !values.confirmPassword ||
                    !values.email ||
                    errors.name ||
                    errors.username ||
                    errors.password ||
                    errors.confirmPassword ||
                    errors.email 
                }
            >
                Sign Up
            </button>

            <span>
                Already have an account? 
                <button 
                    className={styles.login} 
                    onClick={() => navigate("/login")}
                >
                    Login
                </button>
            </span>
            {error != "" ? <p className={styles.errorMessage}>{error}</p> : ""}
        </div>
    )


}

export default Signup;