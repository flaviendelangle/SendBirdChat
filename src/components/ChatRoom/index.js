import React from 'react';
import PropTypes from 'prop-types';

import InputLine from '../InputLine';
import Messages from '../Messages';
import ChannelPicker from '../ChannelPicker';
import { Consumer } from '../../context';
import { Page, Wrapper } from './styles';


const ChatRoom = ({
  history,
  updateChannel,
  addMessages,
  loadMore,
}) => (
  <Page>
    <Consumer>
      {({ username, channel, messages }) => (
        <Wrapper zDepth={2}>
          <ChannelPicker username={username} />
          <Messages
            messages={messages}
            channel={channel}
            loadMore={loadMore}
          />
          <InputLine
            username={username}
            channel={channel}
            history={history}
            updateChannel={updateChannel}
            addMessages={addMessages}
          />
        </Wrapper>
      )}
    </Consumer>
  </Page>
);

ChatRoom.propTypes = {
  history: PropTypes.object.isRequired,
  updateChannel: PropTypes.func.isRequired,
  addMessages: PropTypes.func.isRequired,
  loadMore: PropTypes.func.isRequired,
};

export default ChatRoom;
