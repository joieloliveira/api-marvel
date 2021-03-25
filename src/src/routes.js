import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import Home from './pages/Home';
import PageHeroes from './pages/PageHeroes';

function Routes(){

    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/pageheroes/:id" exact component={PageHeroes}></Route>
                <Redirect from='*' to='/' />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;