import React from "react";
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
import { Form } from "reactstrap";

const Dashboard = () => {
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
                <Form method="GET" action="http://localhost:5000/api/joinInterview/admin">
                  <Row>
                    <Col md="6" className="form-group">
                      <label htmlFor="feEmailAddress">Enter email id of candidate</label>
                      <FormInput
                        id="feEmailAddress"
                        type="email"
                        placeholder="Email"
                        name="email"
                      />
                    </Col>
                  </Row>
                  <Button type="submit">Join Interview</Button>
                </Form>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  )
};

export default Dashboard;

