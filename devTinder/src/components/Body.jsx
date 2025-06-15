import { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";
import { addUser, removeUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store)=>store.user);
  const fetchUser = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/profile/view",
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
    } catch (error) {
      if(error.status === 401 ){
        return navigate("/login");
      }
    }
  };
  useEffect(() => {
    // TODO: if interval server error then redirect to error page
    // if user is unauthorized redirect to login page
    fetchUser();
  },[]);
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
