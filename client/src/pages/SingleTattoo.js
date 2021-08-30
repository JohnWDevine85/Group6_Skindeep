import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME_BASIC, GET_TATTOO } from '../utils/queries';

import CommentList from '../components/Comments/CommentList.jsx'

import Auth from '../utils/auth'
import { Col, Container, Row, Button, Image } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { LIKE_TATTOO, UNLIKE_TATTOO } from '../utils/mutations';


const SingleTattoo = () => {
    const [likeTattoo] = useMutation(LIKE_TATTOO);
    const [unlikeTattoo] = useMutation(UNLIKE_TATTOO);

    const { id: tattooId } = useParams();

    const { data: userData, loading: userLoading } = useQuery(GET_ME_BASIC);

    const { loading, data } = useQuery(GET_TATTOO, {
        variables: { id: tattooId }
    });

    const tattoo = data?.tattoo || {};

    if (loading || userLoading) {
        return <div>Loading...</div>
    }

    const likeToggle = async () => {
        if (userData.me.likedTattoos.find(id => id === tattooId)) {
            try {
                const res = await unlikeTattoo({ variables: { tattooId } })
            } catch (err) {
                console.error('Failed to unlike tattoo', err)
            }
        } else {
            try {
                const res = await likeTattoo({ variables: { tattooId } })
            } catch (err) {
                console.error('Failed to unlike tattoo', err)
            }
        }
        window.location.reload();
    }
    return (
        <Container className='my-3'>
            <h2 className='my-3'>{tattoo.title}</h2>

            <Row>
                <Col xs='12' lg='6' className='text-center mb-4'>
                    {(!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? (
                        // dev code
                        <Image src={`http://localhost:3001/api/image/${tattoo.imageId}`} alt='tattoo' rounded fluid></Image>

                    ) : (
                        // production code
                        <Image src={`${window.location.hostname}/api/image/${tattoo.imageId}`} alt='tattoo' rounded fluid></Image>
                    )}
                </Col>

                <Col>
                    <Row>

                        <Col xs='6'>
                            <p>{tattoo.description}</p>
                        </Col>

                        <Col xs='6' className='text-center'>

                            <Row className='d-flex justify-content-center'>

                                <div className='rounded-circle d-flex justify-content-center align-items-center' style={{ backgroundColor: "gray", height: '7rem', width: '7rem' }}>
                                    <p>
                                        User Image
                                    </p>
                                </div>
                            </Row>

                            <Row>
                                <Link to={`/profile/${tattoo.username}`} className='link mt-2'>
                                    {tattoo.username}
                                </Link>
                            </Row>

                            <Row>
                                {Auth.loggedIn() && userData ? (
                                    <div className='my-3'>
                                        <Button type='button' className='neon-pink-btn mx-2' size='sm'>Comment</Button>
                                        {userData.me.likedTattoos.find(id => id === tattoo._id) ? (
                                            <Button type='button' className='neon-green-btn' size='sm' onClick={() => likeToggle()}>
                                                Unlike
                                            </Button>

                                        ) : (

                                            <Button type='button' className='neon-pink-btn' size='sm' onClick={() => likeToggle()}>
                                                Like
                                            </Button>
                                        )}
                                    </div>
                                ) : (<></>)}
                            </Row>

                        </Col>
                    </Row>

                    {tattoo.commentCount ? (
                        <div className='mt-1'>
                            <h3>Comments</h3>
                            {tattoo.commentCount > 0 && <CommentList comments={tattoo.comments} />}
                        </div>
                    ) : (
                        <div className='mt-3'>
                            <h3>No Comments</h3>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>

    )
}

export default SingleTattoo;