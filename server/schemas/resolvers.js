const { User, Tattoo } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {

    Query: {
        me: async(parent, args, context) => {
            if(context.user) {
                const userData = await User.findOne({_id: context.user._id})
                .select('-__v -password')
                .populate('likedTattoos')
                .populate('personalWork');

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
        
        user: async(parent, {username}) => {
            return User.findOne({username})
            .select('-__v -password')
            .populate('likedTattoos')
            .populate('personalWork');
        },

        tattoo: async(parent, {_id}) => {
            return Tattoo.findOne({_id})
            .select('-__v')
            .populate('comments');
        },

        tattoos: async(parent, {title}) => {
            return Tattoo.find({
                title,
                category: title
            })
            .select('-__v -comments')
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return {token, user}
        },
        
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});

            if(!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const isCorrectPw = await user.isCorrectPassword(password);

            if(!isCorrectPw) {
                throw new AuthenticationError('Incorrect credentials')
            }

            const token = signToken(user);
            return {token, user};
        }
    }
};

module.exports = resolvers;
