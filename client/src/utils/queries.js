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
            image
        }
        personalWork {
            _id
            title
            image
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
            image
        }
        personalWork {
            _id
            title
            image
        }
    }
}
`;

export const GET_TATTOO = gql`
query tattoo($_id: ID!) {
    tattoo(_id: $_id) {
        _id
        title
        username
        image
        description
        likes
        comments {
            _id
            username
            commentBody
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
        image
        description
        likes
    }
}
`;
