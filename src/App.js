import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Login from './components/Login';
import ChatRoom from './components/ChatRoom';
import { Provider } from './context';
import { init, loadPreviousMessages } from './api';

import './style.css';

export default class App extends PureComponent {
  constructor() {
    super();
    init(this.onMessage);
  }

  state = {
    username: 'toto',
    channel: null,
    messages: [],
    isLoading: false,
  }

  onMessage = (channel, message) => {
    this.onMessages(channel, [message]);
  }

  onMessages = (channel, messages, query) => {
    if (channel === this.state.channel) {
      this.setState(prevState => ({
        messages: [...messages, ...prevState.messages],
        query: query || prevState.query,
      }));
    }
  }

  onRequestMoreMessages = () => {
    const { channel, query, isLoading } = this.state;
    if (query.hasMore && !isLoading) {
      this.setState(() => ({ isLoading: true }));
      loadPreviousMessages(channel, query).then((result) => {
        if (result.channel === this.state.channel) {
          this.setState(prevState => ({
            isLoading: false,
            messages: [...prevState.messages, ...result.messages],
          }));
        }
      });
    }
  }

  changeUsername = (username) => {
    this.setState(() => ({ username }));
  }

  updateChannel = (channel) => {
    this.setState(() => ({ channel, messages: [] }));
  }

  render() {
    return (
      <MuiThemeProvider>
        <BrowserRouter>
          <Switch>
            <Provider value={this.state}>
              <Route
                path="/login"
                render={props => (
                  <Login changeUsername={this.changeUsername} {...props} />
                )}
              />
              <Route
                path="/chat"
                render={props => (
                  <ChatRoom
                    updateChannel={this.updateChannel}
                    addMessages={this.onMessages}
                    loadMore={this.onRequestMoreMessages}
                    {...props}
                  />
                )}
              />
            </Provider>
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}
