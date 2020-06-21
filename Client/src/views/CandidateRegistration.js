import React from "react";
import CustomFileUpload from "../components/components-overview/CustomFileUpload";


import {
    ListGroup,
    ListGroupItem,
    Row,
    Col,
    Form,
    FormInput,
    Button,
    Container
} from "shards-react";
import PageTitle from "../components/common/PageTitle";

const path = "http://recruitify-mlh-hackjaipur.herokuapp.com/api/candidate/registration";

const CandidateRegistration = () => (
    <Container fluid className="main-content-container px-4 pb-4">
        <Row noGutters className="page-header py-4">
            <PageTitle title="Candidate Registration" subtitle="Fill up details" md="12" className="ml-sm-auto mr-sm-auto" />
        </Row>
        <ListGroup flush>
            <ListGroupItem className="p-3">
                <Row>
                    <Col>
                        <Form method="POST" action={path}>
                            <Row form>
                                <Col md="6" className="form-group">
                                    <label htmlFor="Name">Name</label>
                                    <FormInput
                                        id="Name"
                                        type="text"
                                        placeholder="John Doe"
                                        name="name"
                                    />
                                </Col>
                                <Col md="6">
                                    <label htmlFor="Institue">Institute</label>
                                    <FormInput
                                        id="Institue"
                                        type="text"
                                        placeholder="MIT"
                                        name="institute"
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
                                        name="degree"
                                    />
                                </Col>
                                <Col md="6">
                                    <label htmlFor="Branch">Branch</label>
                                    <FormInput
                                        id="Branch"
                                        type="text"
                                        placeholder="CSE"
                                        name="branch"
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
                                        name="scholar"
                                    />
                                </Col>
                                <Col md="6">
                                    <label htmlFor="admin">JOB ID</label>
                                    <FormInput
                                        id="admin"
                                        type="text"
                                        placeholder="ssdfmlf2308cxd8f0sf3"
                                        name="admin"
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
                                        name="cgpa"
                                    />
                                </Col>
                                <Col md="6">
                                    <label htmlFor="email">Email ID</label>
                                    <FormInput
                                        id="email"
                                        type="email"
                                        placeholder="johndoe@gmail.com"
                                        name="email"
                                    />
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
