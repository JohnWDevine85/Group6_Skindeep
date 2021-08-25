import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_TATTOO } from '../utils/queries';

import Auth from '../utils/auth'

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
        <div>
            <div>
                {/* Tattoo image */}
            </div>

            <div>
                <div>
                    {/* user stuff, like, add comment */}
                </div>
                <div>
                    {/* description */}
                </div>
                <div>
                    {/* comments */}
                </div>
            </div>
        </div>
    )
}

export default SingleTattoo;