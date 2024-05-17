import { useState, useEffect } from "react";
import {setUser} from "../store/userSlice";
import { useDispatch } from "react-redux";
import { autoLogin } from "../api/internal";

function useAutoLogin(){
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
     // IIFE
     (async function autoLoginApiCall(){
        const response = await autoLogin();
        if(response.status === 200){
            const user = {
                _id: response.data.user._id,
                email: response.data.user.email,
                username: response.data.user.username,
                auth: response.data.auth
            }
            dispatch(setUser(user));
        }
        setLoading(false);
     })();  
    }, []);

    return loading;
}
export default useAutoLogin;