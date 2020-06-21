import React from "react";
import CustomFileUpload from "../components/components-overview/CustomFileUpload";

import {
    ListGroup,
    ListGroupItem,
    Row,
    Col,
    Form,
    FormInput,
    FormGroup,
    FormCheckbox,
    FormSelect,
    Button,
    Container
} from "shards-react";
import PageTitle from "../components/common/PageTitle";


const CandidateRegistration = () => (
    <Container fluid className="main-content-container px-4 pb-4">
        <Row noGutters className="page-header py-4">
            <PageTitle title="Candidate Registration" subtitle="Fill up details" md="12" className="ml-sm-auto mr-sm-auto" />
        </Row>
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
                                        type="text"
                                        placeholder="John Doe"
                                    />
                                </Col>
                                <Col md="6">
                                    <label htmlFor="College">College</label>
                                    <FormInput
                                        id="College"
                                        type="text"
                                        placeholder="MIT"
                                    />
                                </Col>
                            </Row>

                            <Row form>
                                <Col md="6" className="form-group">
                                    <label htmlFor="Degree">Degree</label>
                                    <FormInput
                                        id="Degree"
                                        type="text"
                                        placeholder="B. Tech"
                                    />
                                </Col>
                                <Col md="6">
                                    <label htmlFor="Branch">Branch</label>
                                    <FormInput
                                        id="Branch"
                                        type="text"
                                        placeholder="CSE"
                                    />
                                </Col>
                            </Row>

                            <Row form>
                                <Col md="6" className="form-group">
                                    <label htmlFor="schNo">Scholar Number Provided by Institute</label>
                                    <FormInput
                                        id="schNo"
                                        type="text"
                                        placeholder="1234567"
                                    />
                                </Col>
                                <Col md="6">
                                    <label htmlFor="yearOfPassout">Year of Passout</label>
                                    <FormInput
                                        id="yearOfPassout"
                                        type="text"
                                        placeholder="XXXX"
                                    />
                                </Col>
                            </Row>

                            <Row form>
                                <Col md="6" className="form-group">
                                    <label htmlFor="cgpa">C.G.P.A.</label>
                                    <FormInput
                                        id="cgpa"
                                        type="text"
                                        placeholder="10.0"
                                    />
                                </Col>
                                <Col md="6">
                                    <label htmlFor="email">Email ID</label>
                                    <FormInput
                                        id="email"
                                        type="email"
                                        placeholder="johndoe@gmail.com"
                                    />
                                </Col>
                            </Row>

                            <FormGroup>
                                <label htmlFor="feInputAddress">Address</label>
                                <FormInput id="feInputAddress" placeholder="1234 Main St" />
                            </FormGroup>

                            <FormGroup>
                                <label htmlFor="feInputAddress2">Address 2</label>
                                <FormInput
                                    id="feInputAddress2"
                                    placeholder="Apartment, Studio or Floor"
                                />
                            </FormGroup>

                            <Row form>
                                <Col md="6" className="form-group">
                                    <label htmlFor="feInputCity">City</label>
                                    <FormInput id="feInputCity" />
                                </Col>
                                <Col md="4" className="form-group">
                                    <label htmlFor="feInputState">State</label>
                                    <FormSelect id="feInputState">
                                        <option>Choose...</option>
                                        <option>...</option>
                                    </FormSelect>
                                </Col>
                                <Col md="2" className="form-group">
                                    <label htmlFor="feInputZip">Zip</label>
                                    <FormInput id="feInputZip" />
                                </Col>
                                <Col md="12" className="form-group">
                                    <FormCheckbox>
                                        {/* eslint-disable-next-line */}I agree with your{" "}
                                        <a href="#">Privacy Policy</a>.
                                </FormCheckbox>
                                </Col>
                            </Row>
                            <strong className="text-muted d-block mb-2">
                                Upload your Resume
                        </strong>
                            <CustomFileUpload />
                            <Button type="submit">Submit Application</Button>
                        </Form>
                    </Col>
                </Row>
            </ListGroupItem>
        </ListGroup>
    </Container>
);

export default CandidateRegistration;
