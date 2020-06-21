/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";

import PageTitle from "../components/common/PageTitle";

const LiveInterviews = (props) => { 

    const candidates = [
        {
            name: "Arun",
            email: "arunv8991@gmail.com",
            institute: "MANIT",
            branch: "CSE",
            cgpa: "10"
        },
        {
            name: "Arun",
            email: "arunv8991@gmail.com",
            institute: "MANIT",
            branch: "CSE",
            cgpa: "10"
        },
        {
            name: "Arun",
            email: "arunv8991@gmail.com",
            institute: "MANIT",
            branch: "CSE",
            cgpa: "10"
        },
        {
            name: "Arun",
            email: "arunv8991@gmail.com",
            institute: "MANIT",
            branch: "CSE",
            cgpa: "10"
        },
        {
            name: "Arun",
            email: "arunv8991@gmail.com",
            institute: "MANIT",
            branch: "CSE",
            cgpa: "10"
        },
    ];
    const [data, setData] = useState(candidates);
    const tableBody = [];
    data.forEach((candidate, index) => {
        tableBody.push(
        <tr>
            <td>{index + 1}</td>
            <td>{candidate.name}</td>
            <td>{candidate.email}</td>
            <td>{candidate.institute}</td>
            <td>{candidate.branch}</td>
            <td>{candidate.cgpa}</td>
        </tr>
    )});


    useEffect(() => {
        const url = "/api/admin/liveInterviews";
        const params = {
            method: 'GET',
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
                    setData(data);
                },
                (error) => {
                    console.log(error, "Error Here");
                }
            );
    });

    return(
        <Container fluid className="main-content-container px-4">
            {/* Page Header */}
            <Row noGutters className="page-header py-4">
                <PageTitle sm="4" title="View Live Interviews" subtitle="" className="text-sm-left" />
            </Row>

            {/* Default Light Table */}
            <Row>
                <Col>
                    <Card small className="mb-4">
                        <CardHeader className="border-bottom">
                            <h6 className="m-0">Live Interviews</h6>
                        </CardHeader>
                        <CardBody className="p-0 pb-3">
                            <table className="table mb-0">
                                <thead className="bg-light">
                                    <tr>
                                        <th scope="col" className="border-0">#</th>
                                        <th scope="col" className="border-0">Name</th>
                                        <th scope="col" className="border-0">Email</th>
                                        <th scope="col" className="border-0">Institute</th>
                                        <th scope="col" className="border-0">Branch</th>
                                        <th scope="col" className="border-0">CGPA</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableBody}
                                </tbody>
                            </table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default LiveInterviews;
