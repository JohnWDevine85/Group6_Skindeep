import React from "react";
import { Link } from 'react-router-dom';
import { Col, Container, Row, Button, Card } from "react-bootstrap";

import Auth from '../../utils/auth'

import './Homepage.css'
// import images from "../../images";

import { useQuery, useMutation } from "@apollo/client";
import { GET_TATTOOS, GET_ME_BASIC } from "../../utils/queries";
import { LIKE_TATTOO, UNLIKE_TATTOO } from '../../utils/mutations';

export const Homepage = () => {
  const [likeTattoo] = useMutation(LIKE_TATTOO);
  const [unlikeTattoo] = useMutation(UNLIKE_TATTOO);

  const { data, loading } = useQuery(GET_TATTOOS);
  const { data: userData, loading: userLoading } = useQuery(GET_ME_BASIC);

  const tattoos = data?.tattoos || [];

  if (loading || userLoading) {
    return <div>Loading...</div>
  }

  const likeToggle = async (tattooId) => {
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
    <Container className='my-5'>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {tattoos.map((tattoo) => (
          <Col className='d-flex justify-content-center'>
            <Card className='p-2'>
              <a href={`/tattoo/${tattoo._id}`}>

                {(!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? (
                  // dev code
                  <Card.Img variant="top" src={`http://localhost:3001/api/image/${tattoo.imageId}`} alt='tattoo' />
                ) : (
                  // production code
                  <Card.Img variant="top" src={`${window.location.hostname}/api/image/${tattoo.imageId}`} alt='tattoo' />
                )}
              </a>

              <Card.Body>
                <Card.Title>
                  {tattoo.title}
                </Card.Title>
                <Row>

                  <p>
                    by <a className='link' href={`/profile/${tattoo.username}`}>{tattoo.username}</a>
                  </p>

                  {Auth.loggedIn() && userData ? (
                    userData.me.likedTattoos.find(id => id === tattoo._id) ? (
                      <Button type='button' className='neon-green-btn' size='sm' onClick={() => likeToggle(tattoo._id)}>
                        Unlike
                      </Button>

                    ) : (

                      <Button type='button' className='neon-pink-btn' size='sm' onClick={() => likeToggle(tattoo._id)}>
                        Like
                      </Button>
                    )
                  ) : (<></>)}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Homepage;
