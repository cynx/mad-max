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

const  PrivateRoute = ({component: Component, authed, auth, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => authed() === true
                ? <Component auth={auth} {...props} />
                : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
        />
    )
};

const  LoginRoute = ({component: Component, authed, auth, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => authed() === false
                ? <Component auth={auth} {...props} />
                : <Redirect to={{pathname: '/home', state: {from: props.location}}} />}
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
                    <LoginRoute
                        authed={auth.isAuthenticated}
                        path="/"
                        component={App}
                        auth={auth}
                        exact

                    />
                    <PrivateRoute
                        authed={auth.isAuthenticated}
                        path="/home"
                        component={Home}
                        auth={auth}

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
