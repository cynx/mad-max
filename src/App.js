import React, { Component } from 'react';
import { Header, Icon, Segment, Grid, Button } from 'semantic-ui-react';
import './App.css';


class App extends Component {


    login() {
        this.props.auth.login();
    }

  render() {

    return (
        <div className="app">
            <Grid columns={4} centered padded className='height-100' verticalAlign='middle'>
                <Grid.Row >
                    <Grid.Column >
                        <Segment raised textAlign='center'>
                            <Header as='h2' icon textAlign='center'>
                                <Icon name='road' circular />
                                <Header.Content>
                                    Mad Max
                                </Header.Content>
                            </Header>
                            <Button onClick={this.login.bind(this)} content='PLAY' icon='right arrow' labelPosition='right' primary size="large"/>

                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
  }
}

export default App;
