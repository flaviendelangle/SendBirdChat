import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { disconnect, sendMessage } from '../../api';
import { Wrapper, Button, Input } from './styles';


export default class InputLine extends PureComponent {
  static propTypes = {
    addMessages: PropTypes.func.isRequired,
    connect: PropTypes.func.isRequired,
    channel: PropTypes.object,
  }

  state = {
    message: '',
  };

  componentDidMount() {
    const {
      connect
    } = this.props;
    connect();
  }

  componentWillUnmount() {
    disconnect();
  }

  onChangeMessage = (event, message) => {
    this.setState(() => ({ message }));
  }

  onInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.submit();
    }
  }

  submit = () => {
    const { channel, addMessages } = this.props;
    const { message } = this.state;
    if (message.length > 0 && channel) {
      sendMessage(channel, message).then((fullMessage, error) => {
        if (!error) {
          addMessages(channel, [fullMessage]);
          this.setState(() => ({ message: '' }));
        }
      });
    }
  }

  render() {
    const { channel } = this.props;
    const { message } = this.state;
    return (
      <Wrapper>
        <Input
          hintText="Send a message to this channel"
          disabled={!channel}
          value={message}
          onChange={this.onChangeMessage}
          onKeyPress={this.onInputKeyPress}
        />
        <Button
          label="Send"
          onClick={this.submit}
          disabled={!channel}
          primary
        />
      </Wrapper>
    );
  }
}
