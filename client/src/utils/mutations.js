import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation addUser($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, password: $password, email: $email ) {
        token
        user {
            _id
            username
            email
          
        }
    }
}
`;

export const LOGIN = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}
`;

export const ADD_TATTOO = gql`
mutation addTattoo($title: String!, $image: String!, $description: String) {
    addTattoo(title: $title, image: $image, description: $description) {
        _id
        title
        username
        image
        description
        likes
    }
}
`;

export const LIKE_TATTOO = gql`
mutation likeTattoo($tattooId: ID!) {
    likeTattoo(tattooId: $tattooId) {
        _id
        likes
    }
}
`;

export const UNLIKE_TATTOO = gql`
mutation unlikeTattoo($tattooId: ID!) {
    unlikeTattoo(tattooId: $tattooId) {
        _id
        likes
    }
}
`;

export const ADD_COMMENT = gql`
mutation addComment($tattooId: ID!, $commentBody: String!) {
    addComment(tattooId: $tattooId, commentBody: $commentBody) {
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

export const REMOVE_TATTOO = gql`
mutation removeTattoo($tattooId: ID!){
    removeTattoo(tattooId: $tattooId) {
        _id
        username
        email
        bio
        likedTattoos{
            _id
            title
            username
            image
            likes
        }
        personalWork{
            _id
            title
            username
            image
            likes
        }
    }
}
`;