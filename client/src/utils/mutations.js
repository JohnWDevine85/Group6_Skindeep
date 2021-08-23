import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation addUser($username: String!, $password: String!, $email: String!, $bio: String) {
    addUser(username: $username, password: $password, email: $email, bio: $bio) {
        token
        user {
            _id
            username
            email
            bio
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
mutation likeTattoo($_id: ID!) {
    likeTattoo(_id: $_id) {
        _id
        title
        username
        image
        description
        likes
    }
}
`;