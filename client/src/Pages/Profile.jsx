
import React,{useState} from 'react';
import LeftSidebar from '../Component/Leftsidebar/LeftSidebar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RightSide from '../Component/RightSidebar/RightSide';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import axios from 'axios';
import { BASE_URL } from '../config';
import { useSelector } from 'react-redux';





const Profile = () => {
    const [currentuser, setCurrentuserr] = useState();

    const { user } = useSelector(state => state.userReducer);
    // console.log(user);
    
    const verifyuser = {
        headers: {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem("veryfication token")
        }
    }

    const userprofile = axios.get(`${BASE_URL}/auth/user/${user._id}`,verifyuser);
    console.log(userprofile);

    return (
        <div>

            <Container>

                <Row>
                    {/* ------------------------------------------------ */}
                    <Col xs={6} md={3}  >
                        <LeftSidebar />
                    </Col>
                    {/* ------------------------------------------------ */}
                    <Col xs={6} md={6} style={{ borderLeft: "1px solid black", borderRight: "1px solid black" }} >
                        <div className="d-flex justify-content-between align-items-center px-3 py-2">
                            <h2 className="fw-bolder fs-3">
                                Profile
                            </h2>
                            <StarBorderPurple500Icon />
                        </div>

                        <div>
                            <div>
                                
                            </div>
                        </div>
                    </Col>
                    {/* ------------------------------------------------------- */}
                    <Col xs={6} md={3}>
                        <RightSide />
                    </Col>
                    {/* ------------------------------------------------------- */}

                </Row>
            </Container>
        </div>
    )
}

export default Profile;