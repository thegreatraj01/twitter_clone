import React from 'react';
import LeftSidebar from '../Component/Leftsidebar/LeftSidebar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RightSide from '../Component/RightSidebar/RightSide';
import MainTweet from '../Component/MainTweet/MainTweet';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Login from './Login';
import Timeline from '../Component/Timelinetweet/Timeline';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';




const Home = () => {

  const user = useSelector(state => state.userReducer.user.name);
  //  console.log(user);

  return (
    <div>
      {user ?
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
                                Home 
                            </h2>
                            <StarBorderPurple500Icon />
                        </div>
              <MainTweet />
              <Timeline />
            </Col>

            {/* ------------------------------------------------------- */}
            <Col xs={6} md={3}>
              <RightSide />
            </Col>
            {/* ------------------------------------------------------- */}

          </Row>
        </Container>
        :
        <Login />}


    </div>
  )
}

export default Home;