import React from 'react';
import { Switch, Route } from "react-router-dom";

import Home from '../pages/Home';
import CreatePost from '../pages/CreatePost';
import NewsPage from '../pages/NewsPage';

function Main(props){

    return (
      <Switch>
        <Route path="/create-post">
          <CreatePost />
        </Route>
        <Route path="/news/:id">
          <NewsPage />
        </Route>

        <Route path="/">
          <Home />
        </Route>
      </Switch>
    );

}

export default Main;
