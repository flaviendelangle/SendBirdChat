import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import CircularProgress from 'material-ui/CircularProgress';
import Avatar from 'material-ui/Avatar';

import { Wrapper, Line, LoaderWrapper, ListContent } from './styles';


const formatDate = timestamp => moment(timestamp).format('h:mm:ss a');

export default class Messages extends PureComponent {
  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
      messageId: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
    })),
    channel: PropTypes.object,
    loadMore: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps, prevState, previousHeight) {
    const { messages } = this.props;
    const { messages: oldMessages } = prevProps;
    if (
      oldMessages.length > 0 &&
      messages.length > 0
    ) {
      if (oldMessages[0].messageId < messages[0].messageId) {
        this.node.scrollTop = (this.node.scrollHeight - this.node.offsetHeight);
      } else if (oldMessages[oldMessages.length - 1] !== messages[messages.length - 1]) {
        this.node.scrollTop = this.node.scrollHeight - previousHeight;
      }
    }
  }

  onScroll = () => {
    const { loadMore } = this.props;
    if (this.node.scrollTop === 0) {
      loadMore();
    }
  }

  getSnapshotBeforeUpdate() {
    return this.node.scrollHeight;
  }

  node = null;

  render() {
    const { messages, channel } = this.props;
    return (
      <Wrapper
        onScroll={this.onScroll}
        innerRef={(node) => { this.node = node; }}
      >
        <ListContent>
          {
            channel ?
              messages.map(({
                messageId,
                message,
                _sender: sender,
                createdAt,
              }) => (
                <Line
                  key={messageId}
                  primaryText={message}
                  secondaryText={`${sender.userId} at ${formatDate(createdAt)}`}
                  leftAvatar={<Avatar src={sender.profileUrl} />}
                  disabled
                />
              )) :
              <LoaderWrapper>
                <CircularProgress size={60} thickness={7} />
              </LoaderWrapper>
          }
        </ListContent>
      </Wrapper>
    );
  }
}
