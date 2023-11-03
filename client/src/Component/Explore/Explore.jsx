
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RightSide  from '../RightSidebar/RightSide';
import LeftSidebar from '../Leftsidebar/LeftSidebar';

const Explore = () => {
    return (
        <div>
            <Container>

                <Row>
                    {/* ------------------------------------------------ */}
                    <Col xs={6} md={3}  >
                        <LeftSidebar />
                    </Col>
                    {/* ------------------------------------------------ */}
                    <Col xs={6} md={6} style={{ borderLeft: "1px groove ", borderRight: "1px groove" }} >



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

export default Explore;