const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type User {
        _id: ID
        username: String
        email: String
        bio: String
        likedTattoos: [ID]
        personalWork: [ID]
    }

    type Comment {
        _id: ID
        username: String
        commentBody: String
        createdAt: String
    }

    type Tattoo {
        _id: ID
        title: String
        username: String
        imageId: String
        description: String
        likes: Int
        comments: [Comment]
        commentCount: Int
        createdAt: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        user(username: String!): User
        tattoo(_id: ID!): Tattoo
        tattoos(_id: ID): [Tattoo]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addTattoo(title: String!, image: String!, description: String): Tattoo
        removeTattoo(tattooId: ID!): User
        likeTattoo(tattooId: ID!): Tattoo
        unlikeTattoo(tattooId: ID!): Tattoo
        addComment(tattooId: ID!, commentBody: String!): Tattoo
    }
`;

module.exports = typeDefs;