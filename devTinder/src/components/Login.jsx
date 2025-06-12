import { useState } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";
const Login = () => {
    const [emailId,setEmailId] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = async()=>{
        try {
            const res = await axios.post(BASE_URL+"/login",{
                emailId,
                password
            },{withCredentials:true});
            dispatch(addUser(res.data));
            navigate("/")
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='flex justify-center my-10'>
            <div className="card card-border bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center">Login</h2>
                    <div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Email ID</legend>
                            <input type="text" className="input" value={emailId} onChange={(e)=>setEmailId(e.target.value)}/>
                        </fieldset>
                    </div>
                    <div className='pb-4'>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Password</legend>
                            <input type="text" className="input" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        </fieldset>
                    </div>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login