import logo from "./logo.svg";
import "./App.css";
// import NavBar from "./components/NavBar/NavBar.jsx";
// import Drawer from "./components/Drawer/Drawer.jsx";

import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { useQuery } from '@apollo/client'
import { GET_TATTOO } from './utils/queries'

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function Image() {
  const { loading, data } = useQuery(GET_TATTOO, {
    variables: { _id: '6125523163938b08d764def2' }
  });

  const tattoo = data?.tattoo || {};
  if (tattoo.imageData) {
    return <img src={`data:${tattoo.imageContent};base64, ${tattoo.imageData}`}></img>
  }
  return <div>loading...</div>
}

function App() {


  return (
    <ApolloProvider client={client}>
      <Image></Image>

    </ApolloProvider>
  );

}

export default App;
