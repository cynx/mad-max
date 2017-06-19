import React, { Component } from 'react';
import logo from './logo.svg';
import './Home.css';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            profile:''
        };
    }

    componentWillMount(){
        const {userProfile,getProfile} = this.props.auth;
        if (!userProfile){
            getProfile((err,profile)=>{
                this.setState({profile});
            });
        } else {
            this.setState({profile: userProfile});
        }
    }

    render() {
        const { profile } = this.state;

        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <p>
                    Access Token : {profile.sub}
                </p>
            </div>
        );
    }
}

export default Home;
