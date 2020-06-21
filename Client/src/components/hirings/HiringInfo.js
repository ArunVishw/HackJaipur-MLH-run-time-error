import React, { Fragment } from "react";

import {
    Col,
    Card,
    CardBody,
    Badge
} from "shards-react";

export default function HiringInfo({post}) {
    return (
            <Fragment>
                <Col lg="3" md="6" sm="12" className="mb-4" key={post.to}>
                    <Card small className="card-post card-post--1">
                        <div
                            className="card-post__image"
                            style={{ backgroundImage: `url(${post.backgroundImage})` }}
                        >
                            <Badge
                                pill
                                className={`card-post__category bg-${post.categoryTheme}`}
                            >
                                {post.category}
                            </Badge>
                            <div className="card-post__author d-flex">
                                <p
                                    className="card-post__author-avatar card-post__author-avatar--small"
                                    style={{ backgroundImage: `url('${post.authorAvatar}')` }}
                                >
                                    Written by {post.author}
                                </p>
                            </div>
                        </div>
                        <CardBody>
                            <h5 className="card-title">
                                <p className="text-fiord-blue">
                                    {post.title}
                                </p>
                            </h5>
                            <p className="card-text d-inline-block mb-3">{post.body}</p>
                            <span className="text-muted">{post.date}</span>
                        </CardBody>
                    </Card>
                </Col>
        </Fragment>
    );
}
