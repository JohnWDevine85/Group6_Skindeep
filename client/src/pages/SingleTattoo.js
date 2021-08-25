import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_TATTOO } from '../utils/queries';

import CommentList from '../components/Comments/CommentList.jsx'

import Auth from '../utils/auth'

import Button from 'react-bootstrap/Button'

// import ReactionList from '../components/ReactionList';
// import ReactionForm from '../components/ReactionForm';

const SingleTattoo = () => {
    const { id: tattooId } = useParams();

    const { loading, data } = useQuery(GET_TATTOO, {
        variables: { _id: tattooId }
    });

    const tattoo = data?.tattoo || {};

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className='d-flex justify-content-center'>
            {console.log(tattoo)}
            <div>
                {/* Tattoo image */}
                <p>There will be an image here</p>
            </div>

            <div>
                <div>
                    
                    {/* user stuff, description*/}
                </div>
                <div>
                    <Button type='button' className='neon-btn mx-2' size='sm'>Comment</Button>
                    <Button type='button' className='neon-btn mx-2' size='sm'>Like</Button>
                    {/* buttons */}
                </div>
                <div>
                    {tattoo.comments.length > 0 && <CommentList comments={tattoo.comments}/>}
                    {/* comments */}
                </div>
            </div>
        </div>
    )
}

export default SingleTattoo;