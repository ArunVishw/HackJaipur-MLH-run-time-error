
import React, { useEffect } from "react";
import { Container, Row, Col } from "shards-react";

import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import MainSidebar from "../components/layout/MainSidebar/MainSidebar";
import { Store } from "../flux";

const DefaultLayout = ({children}) => {
  useEffect(() => {
    const url = "http://localhost:5000/api/admin/authenticateUser";
    const params = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'text/plain'
      }
    };

    fetch(url, params)
      .then(res => res.json())
      .then(
        (data) => {
          Store.updateUserData(data);
        },
        (error) => {
          console.log(error, "Error Here");
        }
      );
  });

    return(
      <Container fluid>
        <Row>
          <MainSidebar />
          <Col
            className="main-content p-0"
            lg={{ size: 10, offset: 2 }}
            md={{ size: 9, offset: 3 }}
            sm="12"
            tag="main"
          >
            <MainNavbar />
            {children}
          </Col>
        </Row>
      </Container>
    );
}

export default DefaultLayout;
