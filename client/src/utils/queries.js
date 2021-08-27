import { gql } from '@apollo/client'

export const GET_USER = gql`
query user($username: String!) {
    user(username: $username) {
        _id
        username
        email
        bio
        likedTattoos {
            _id
            title
            username
            imageId
        }
        personalWork {
            _id
            title
            imageId
        }
    }
}
`;

export const GET_ME_BASIC = gql`
query {
    me {
        _id
        username
        email
        likedTattoos{
            _id
        }
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
        likedTattoos {
            _id
            title
            username
            imageId
        }
        personalWork {
            _id
            title
            imageId
        }
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
query tattoos($title: String) {
    tattoos(title: $title) {
        _id
        title
        username
        imageId
        description
        likes
        createdAt
    }
}
`;
