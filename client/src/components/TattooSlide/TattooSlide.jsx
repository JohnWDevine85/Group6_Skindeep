import { useQuery } from "@apollo/client";
import { GET_TATTOOS } from "../../utils/queries";

import { Col, Card } from "react-bootstrap";

const TattooSlide = ({ tattooId }) => {

    console.log(tattooId)
    const { loading, data } = useQuery(GET_TATTOOS, {
        variables: { _id: tattooId }
    })

    const tattoo = data?.tattoos || {};

    if (loading) {
        return <div>Loading...</div>
    }


    return (
        <Col className='d-flex justify-content-center align-items-center'>
            <Card key={tattooId}>

                <a href={`/tattoo/${tattoo[0]._id}`}>

                    {(!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? (
                        // dev code
                        <Card.Img className="d-block w-100" src={`http://localhost:3001/api/image/${tattoo[0].imageId}`} alt='tattoo' />
                    ) : (
                        // production code
                        <Card.Img className="d-block w-100" src={`${window.location.hostname}/api/image/${tattoo[0].imageId}`} alt='tattoo' />
                    )}
                </a>

            </Card>
        </Col>
    )
}

export default TattooSlide;