import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_TATTOO } from '../utils/queries';

import CommentList from '../components/Comments/CommentList.jsx'

import Auth from '../utils/auth'
import { Col, Container, Row, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';


// import ReactionList from '../components/ReactionList';
// import ReactionForm from '../components/ReactionForm';

const SingleTattoo = () => {
    const { id: tattooId } = useParams();

    const { loading, data } = useQuery(GET_TATTOO, {
        variables: { id: tattooId }
    });

    const tattoo = data?.tattoo || {};

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <Container>
            <Row>
                <Col xs='12' md='6'>
                    {/* Tattoo image */}
                    <p>There will be an image here</p>
                </Col>

                <Col>
                    <Row>

                        <Col xs='6'>
                            <p>{tattoo.description}</p>
                            {/* user stuff, description*/}
                        </Col>

                        <Col xs='6' className='text-end'>
                            <p>
                                user picture
                            </p>
                            <p>
                                <Link to={`/profile/${tattoo.username}`} className='link'>
                                    {tattoo.username}
                                </Link>
                            </p>
                            <Button type='button' className='neon-btn mx-2' size='sm'>Comment</Button>
                            <Button type='button' className='neon-btn mx-2' size='sm'>Like</Button>
                        </Col>
                    </Row>

                    <div className='mt-3'>
                        <h3>Comments</h3>
                        {tattoo.comments.length > 0 && <CommentList comments={tattoo.comments} />}
                    </div>
                </Col>
            </Row>
        </Container>

    )
}

export default SingleTattoo;