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
