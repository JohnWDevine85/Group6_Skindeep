import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client'
import { GET_USER } from '../utils/queries';

import { Col, Container, Row } from 'react-bootstrap';
import TattooSlide from "../components/TattooSlide/TattooSlide";

const Profile = () => {
    const { username } = useParams();

    const { loading, data: userData } = useQuery(GET_USER, {
        variables: { username }
    })

    const user = userData?.user || {};

    if (loading) {
        return <div>Loading...</div>
    }
    console.log('user', user)

    return (
        <Container className='my-5'>
            <Row>
                <Col xs={2} className='text-center'>
                    <div className='rounded-circle d-flex justify-content-center align-items-center mb-2' style={{ backgroundColor: "gray", height: '10rem', width: '10rem' }}>
                        <p>
                            User Image
                        </p>
                    </div>
                    <p>{user.username}</p>
                </Col>
                {user.bio ? (
                    <Col>

                        <h2>Bio</h2>
                        <p>{user.bio}</p>
                    </Col>

                ) : (
                    <></>
                )}
            </Row>
            <h2 className='my-3'>Liked Tattoos</h2>
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">

                {user.likedTattoos.map(tattooId => {
                    return <TattooSlide tattooId={tattooId}></TattooSlide>
                })}
            </Row>
        </Container>
    )
}

export default Profile;