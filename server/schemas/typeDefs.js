const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type User {
        _id: ID
        username: String
        email: String
        bio: String
        likedTattoos: [Tattoo]
        personalWork: [Tattoo]
    }

    type Comment {
        _id: ID
        username: String
        commentBody: String
    }

    type Tattoo {
        _id: ID
        title: String
        username: String
        image: String
        description: String
        likes: Int
        comments: [Comment]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        user(username: String!): User
        tattoo(_id: ID!): Tattoo
        tattoos(title: String): [Tattoo]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addTattoo(title: String!, image: String!, description: String): Tattoo
        likeTattoo(_id: ID!): Tattoo
        unlikeTattoo(_id: ID!): Tattoo
    }
`;

module.exports = typeDefs;