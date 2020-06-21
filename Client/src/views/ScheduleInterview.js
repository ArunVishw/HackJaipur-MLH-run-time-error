import React from "react";
import {
    Container,
    Row,
    Card,
    ListGroup,
    ListGroupItem,
    FormInput,
    Col,
    Button
} from "shards-react";

import PageTitle from "../components/common/PageTitle";
import CustomFileUpload from "../components/components-overview/CustomFileUpload";

const ScheduleHiring = () => (
    <Container fluid className="main-content-container px-4 pb-4">
        <Row noGutters className="page-header py-4">
            <PageTitle title="Schedule Interviews" subtitle="Overview" md="12" className="ml-sm-auto mr-sm-auto" />
        </Row>
        <Row>
            <Col lg="11">
                <Card small className="mb-4">
                    <ListGroup flush>
                        <ListGroupItem className="px-30">
                            <strong className="text-muted d-block mb-2">Upload Excel File</strong>
                            <CustomFileUpload />
                            <strong className="text-muted d-block mb-2">Campus Drive/Hiring Name</strong>
                            <FormInput
                                id="hiringName"
                                type="text"
                                placeholder="MIT"
                            />
                            <br />
                            <Row>
                                <Button type="submit">Submit Details</Button>
                            </Row>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </Container>
);

export default ScheduleHiring;

