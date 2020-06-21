import React, { useEffect } from "react";
import {
  Container,
  Row,
  Card,
  ListGroup,
  ListGroupItem,
  FormInput,
  Col,
  Button,
} from "shards-react";

import PageTitle from "../components/common/PageTitle";
import { Store } from "../flux";

const Dashboard = () => {

  useEffect(() => {
    console.log("WORKING");
    const url = "http://localhost:5000/api/admin/authenticateUser";
    const params = {
        method: 'POST', 
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'text/plain'
        }
    }
    fetch(url,params)
    .then(res=>res.json())
    .then(
        (data) => {
          console.log(data);
          Store.updateUserData(data);
        },
        (error) => {
          console.log(error,"Error Here");
        }
      );
  }, []);
  return(
    <Container fluid className="main-content-container px-4 pb-4">
      <Row noGutters className="page-header py-4">
        <PageTitle title="Take Interview" subtitle="Overview" md="12" className="ml-sm-auto mr-sm-auto" />
      </Row>
      <Row>
        <Col lg="11">
          <Card small className="mb-4">
            <ListGroup flush>
              <ListGroupItem className="px-30">
                <Row>
                  <Col md="6" className="form-group">
                    <label htmlFor="feEmailAddress">Enter email id of candidate</label>
                    <FormInput
                      id="feEmailAddress"
                      type="email"
                      placeholder="Email"
                    />
                  </Col>
                </Row>
                <Button type="submit">Join Interview</Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  )
};

export default Dashboard;

