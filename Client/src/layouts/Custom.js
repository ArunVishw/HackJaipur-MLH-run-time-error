import React from "react";
import { Container, Row} from "shards-react";


const CustomLayout = ({children}) => (
    <Container fluid>
        <Row>
            {children}
        </Row>
    </Container>
);

export default CustomLayout;
