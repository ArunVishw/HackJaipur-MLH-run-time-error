import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  Button
} from "shards-react";
import { Store } from "../../flux";

const UserAccountDetails = ({ title }) => {

  const { name, email, organization } = Store.getUserData();
  const [username, setName] = useState(name);
  const [useremail, setEmail] = useState(email);
  const [userorganization, setOrganization] = useState(organization);

  useEffect(() => {
    Store.on("userDataChanged", () => {
      const { newname, newemail, neworganization } = Store.getUserData();
      setName(newname);
      setEmail(newemail);
      setOrganization(neworganization);
    });
  }, []); 

  return(
    <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">"Account Info"</h6>
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Form>
                <Row form>
                  <Col md="6" className="form-group">
                    <label htmlFor="Name">Name</label>
                    <FormInput
                      id="Name"
                      placeholder="name"
                      value={username}
                      onChange={() => {}}
                    />
                  </Col>
                </Row>
                <Row form>
                  <Col md="6" className="form-group">
                    <label htmlFor="feEmail">Email</label>
                    <FormInput
                      type="email"
                      id="feEmail"
                      placeholder="Email Address"
                      value={useremail}
                      onChange={() => {}}
                      autoComplete="email"
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <label htmlFor="fePassword">Password</label>
                    <FormInput
                      type="password"
                      id="fePassword"
                      placeholder="Password"
                      value="EX@MPL#P@$$w0RD"
                      onChange={() => {}}
                      autoComplete="current-password"
                    />
                  </Col>
                </Row>
                <FormGroup>
                  <label htmlFor="Organization">Organization</label>
                  <FormInput
                    id="Organization"
                    placeholder="Organization"
                    value={userorganization}
                    onChange={() => {}}
                  />
                </FormGroup>
                <Button theme="accent">Update Account</Button>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
}


export default UserAccountDetails;
