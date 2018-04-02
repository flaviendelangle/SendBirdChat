import React, { PureComponent } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Login from './components/Login';
import ChatRoom from './components/ChatRoom';
import { Provider } from './context';
import { connect, init, joinPublicChannel, loadPreviousMessages } from './api';

import './style.css';


const USERNAME = 'username';

const createChannel = (channel, query) => ({
  channel,
  query,
  messages: [],
});

export default class App extends PureComponent {
  constructor() {
    super();
    init(this.onMessage);
  }

  state = {
    username: localStorage.getItem(USERNAME) || '',
    current: '',
    channels: {},
    participants: [],
    isLoading: false,
  }

  onMessage = (channel, message) => {
    this.onMessages(channel, [message]);
  }

  onMessages = (channel, messages, query) => {
    const { channels, current } = this.state;
    if (channel === channels[current].channel) {
      this.setState((prevState) => {
        const oldData = prevState.channels[current];
        return {
          channels: {
            ...prevState.channels,
            [current]: {
              ...oldData,
              messages: [...messages, ...oldData.messages],
              query: query || oldData.query,
            },
          },
        };
      });
    }
  }

  onRequestMoreMessages = () => {
    const { isLoading } = this.state;
    const channel = this.getChannel();
    const { query } = channel;
    if (query && query.hasMore && !isLoading) {
      this.setState(() => ({ isLoading: true }));
      loadPreviousMessages(channel, query).then((result) => {
        if (result.channel === this.getChannel()) {
          this.setState((prevState) => {
            const oldData = prevState.channels[prevState.current];
            return {
              isLoading: false,
              channels: {
                ...prevState.channels,
                [prevState.current]: {
                  ...oldData,
                  messages: [...oldData.messages, ...result.messages],
                  query: query || oldData.query,
                },
              },
            };
          });
        }
      });
    }
  }

  onRequestChannelChange = (current, currentChannel, currentQuery) => {
    const q = currentQuery || this.state.channels[current].query;
    loadPreviousMessages(currentChannel, q).then(({ channel, messages, query }) => {
      this.setState(prevState => ({
        current,
        channels: {
          ...prevState.channels,
          [current]: {
            channel,
            query,
            messages,
          },
        },
      }));
    });
  }

  getChannel = () => {
    const { channels, current } = this.state;
    return channels[current];
  }

  changeUsername = (username) => {
    this.setState(() => ({ username }));
    localStorage.setItem(USERNAME, username);
  }

  connect = () => {
    const { username } = this.state;
    return connect(username)
      .then(joinPublicChannel)
      .then(({ channel, query, participants }) => {
        this.setState(() => ({
          participants,
          current: 'public_channel',
          channels: {
            public_channel: createChannel(channel, query),
            ...participants.reduce((result, el) => ({
              ...result,
              [el.userId]: createChannel(null, null),
            }), {}),
          },
        }));
        return loadPreviousMessages(channel, query);
      })
      .then(({ channel, messages, query }) => {
        this.onMessages(channel, messages, query);
      });
  }

  logout = () => {
    this.setState(() => ({
      username: '',
      channel: null,
      channelId: '',
      channels: [],
      participants: [],
    }));
  }

  render() {
    const { username } = this.state;
    return (
      <MuiThemeProvider>
        <Provider value={this.state}>
          {
            username ?
              <ChatRoom
                connect={this.connect}
                addMessages={this.onMessages}
                loadMore={this.onRequestMoreMessages}
                switchChannel={this.onRequestChannelChange}
                logout={this.logout}
              /> :
              <Login changeUsername={this.changeUsername} />
          }
        </Provider>
      </MuiThemeProvider>
    );
  }
}
