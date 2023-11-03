import React from 'react';
import "./Leftside.css";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import TagIcon from "@mui/icons-material/Tag";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from 'react-redux';

const LeftSidebar = () => {
    const dispatch = useDispatch();

    const logout = () => {
        localStorage.removeItem("veryfication token");
        localStorage.removeItem("user");
        dispatch({
            type: "LOGOUT"
        })
    }
    const user = useSelector(state => state.userReducer.user.name);
    const user2 = useSelector(state => state.userReducer.user);
    // console.log(user);
    // console.log(user2);

    return (

        <div className=" d-flex justify-content-between  flex-column mt-3 " style={{ height: '100vh' }}>


            <div className="mt-6 d-flex flex-column gap-3 " >
                <div className="text-center">
                    <img
                        src="/twitter-logo.png"
                        alt="Twitter Logo"
                        width={"40px"}
                        className="ml-md-3"
                    />
                </div>
                {user ?
                    <>
                        <Link to="/" className='link'>
                            <div className="d-flex align-items-center gap-3 px-2 py-1 rounded-pill border border-dark-subtle icons">
                                <HomeIcon fontSize="large" />
                                <p >Home</p>
                            </div>
                        </Link>
                        <Link to="/explore" className='link'>
                            <div className="d-flex align-items-center gap-3 px-2  py-1 rounded-pill border border-dark-subtle icons">
                                <TagIcon fontSize="large" />
                                <p>Explore</p>
                            </div>
                        </Link>
                        <Link to="/profile" className='link'>
                            <div className="d-flex align-items-center gap-3 px-2  py-1 rounded-pill border border-dark-subtle icons">
                                <PersonIcon fontSize="large" />
                                <p>Profile</p>
                            </div>
                        </Link>
                    </>
                    : ""}

                {!user2 ?
                    <>
                        <Link to="/login" className='link'>
                            <div className="d-flex align-items-center gap-3 px-2  py-1 rounded-pill border border-dark-subtle icons">
                                <PersonIcon fontSize="large" />
                                <p>Login</p>
                            </div>
                        </Link>
                        <Link to="/register" className='link'>
                            <div className="d-flex align-items-center gap-3 px-2  py-1 rounded-pill border border-dark-subtle icons">
                                <PersonIcon fontSize="large" />
                                <p>Register</p>
                            </div>
                        </Link>
                    </>
                    : ""}
            </div>


            <div className="d-flex justify-content-between">

                {user ?
                    <>
                        <div>
                            <p className="fw-bold">user</p>
                            <p className="fw-bold">@username</p>
                        </div>
                        <div>

                            <Link to="login">
                                <button className="btn btn-danger px-4 py-1 text-white rounded-pill" onClick={logout}>
                                    Logout
                                </button>
                            </Link>
                        </div>
                    </>
                    : ""}



            </div>
        </div>


    )
}

export default LeftSidebar;