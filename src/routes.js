import React from 'react';
import { Route, BrowserRouter, Redirect, Switch} from 'react-router-dom';
import App from './App';
import Callback from './callback/Callback';
import Auth from './auth/Auth';
import history from './history';
import Home from "./Home";

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth.handleAuthentication();
    }
};

const  PrivateRoute = ({component: Component, authed, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => authed() === true
                ? <Component {...props} />
                : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
        />
    )
};

const notFound = ({location}) => (
    <div>The Page {location.pathname} is not found</div>
);

export const makeMainRoutes = () => {
    return (
        <BrowserRouter history={history} >
            <div>
                <Switch>
                    <Route exact path="/" render={(props) => <App auth={auth} {...props} />} />
                    <PrivateRoute
                        authed={auth.isAuthenticated}
                        path="/home"
                        component={Home}

                    />
                    <Route path="/callback" render={(props) => {
                        handleAuthentication(props);
                        return <Callback {...props} />
                    }}/>
                    <Route component={notFound}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
};
