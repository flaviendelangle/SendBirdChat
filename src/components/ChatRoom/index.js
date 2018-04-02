import React from 'react';
import PropTypes from 'prop-types';

import InputLine from '../InputLine';
import Messages from '../Messages';
import ActionBar from '../ActionBar';
import Participants from '../Participants';
import { Consumer } from '../../context';
import { Page, Wrapper, Content, SidePannel } from './styles';


const ChatRoom = ({
  addMessages,
  loadMore,
  connect,
  logout,
  switchChannel,
}) => (
  <Page>
    <Consumer>
      {({
          username,
          participants,
          current,
          channels,
        }) => {
        const data = current ?
          channels[current] :
          { messages: [], channel: null };
        const { channel, messages } = data;
        return (
          <Wrapper zDepth={2}>
            <SidePannel>
              <ActionBar
                username={username}
                logout={logout}
              />
              <Participants
                participants={participants}
                current={current}
                channels={channels}
                switchChannel={switchChannel}
              />
            </SidePannel>
            <Content>
              <Messages
                messages={messages}
                channel={channel}
                loadMore={loadMore}
              />
              <InputLine
                channel={channel}
                addMessages={addMessages}
                connect={connect}
              />
            </Content>
          </Wrapper>
        );
      }}
    </Consumer>
  </Page>
);

ChatRoom.propTypes = {
  connect: PropTypes.func.isRequired,
  addMessages: PropTypes.func.isRequired,
  loadMore: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  switchChannel: PropTypes.func.isRequired,
};

export default ChatRoom;
