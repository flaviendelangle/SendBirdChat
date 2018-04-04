import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

import { joinOneToOneChannel } from '../../api';

import Wrapper from './styles';


const TAB_CODE = 9;

export default class Participants extends PureComponent {
  static propTypes = {
    participants: PropTypes.arrayOf(PropTypes.object).isRequired,
    current: PropTypes.string,
    channels: PropTypes.objectOf(PropTypes.object),
    switchChannel: PropTypes.func.isRequired,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyPress);
  }

  onKeyPress = (event) => {
    const { current, channels } = this.props;
    if (event.keyCode === TAB_CODE) {
      const channelIds = Object.keys(channels);
      if (channelIds.length > 1) {
        const index = channelIds.indexOf(current);
        const newChannelId = channelIds[(index + 1) % channelIds.length];
        this.goToChannel(newChannelId);
      }
    }
  }

  goToChannel = (channelId) => {
    const { switchChannel, channels } = this.props;
    const newChannel = channels[channelId];
    if (newChannel.channel) {
      switchChannel(channelId, newChannel);
    } else {
      joinOneToOneChannel(channelId).then(({ channel, query }) => {
        switchChannel(channelId, channel, query);
      });
    }
  }

  render() {
    const { participants } = this.props;
    return (
      <Wrapper>
        <ListItem
          key="public_channel"
          primaryText="Public channel"
          leftAvatar={<Avatar src="" />}
          onClick={() => this.goToChannel('public_channel')}
        />
        { participants.map(el => (
          <ListItem
            key={el.userId}
            primaryText={el.userId}
            leftAvatar={<Avatar src={el.profileUrl} />}
            onClick={() => this.goToChannel(el.userId)}
          />
        ))}
      </Wrapper>
    );
  }
}
