const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type User {
        _id: ID
        username: String
        email: String
        likedTattoos: [Tattoo]
    }

    type Tattoo {
        _id: ID
        title: String
        username: String
        category: [String]
        description: String
        likeCount: Int
        comments: [Comment]
    }

    type Comment {
        _id: ID
        username: String
        tattooId: ID
        commentText: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        user(username: String!): User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;