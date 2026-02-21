// This file contains all GraphQL types for User
import { gql } from "graphql-tag";

const userSchema = gql`
    # Object type - represents the User model
    type User {
        _id: ID!
        username: String!
        email: String!
        created_at: String!
        updated_at: String!
    }

    # AuthPayload type - represents authentication response
    type AuthPayload {
        user: User!
        token: String
    }

    # Query type - represents the collection of operations to fetch data
    type Query {
        login(username: String!, password: String!): AuthPayload!
    }

    # Mutation type - represents the operations to modify data
    type Mutation {
        signup(username: String!, email: String!, password: String!): AuthPayload!
    }
`;

export default userSchema;
