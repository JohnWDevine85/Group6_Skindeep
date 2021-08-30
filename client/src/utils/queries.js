import { gql } from '@apollo/client'

export const GET_USER = gql`
query user($username: String!) {
    user(username: $username) {
        _id
        username
        email
        bio
        likedTattoos
        personalWork
    }
}
`;

export const GET_ME_BASIC = gql`
query {
    me {
        _id
        username
        email
        likedTattoos
    }
}
`;

export const GET_ME = gql`
query {
    me {
        _id
        username
        email
        bio
        likedTattoos 
        personalWork 
    }
}
`;

export const GET_TATTOO = gql`
query tattoo($id: ID!) {
    tattoo(_id: $id) {
        _id
        title
        username
        imageId
        description
        likes
        commentCount
        
        comments {
            _id
            username
            commentBody
            createdAt
        }
    }
}
`;

export const GET_TATTOOS = gql`
query tattoos($_id: ID) {
    tattoos(_id: $_id) {
        _id
        title
        username
        imageId
        likes
        createdAt
    }
}
`;
