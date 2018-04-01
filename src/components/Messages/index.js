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

  componentDidUpdate(prevProps) {
    if (
      prevProps.messages.length > 0 &&
      this.props.messages.length > 0 &&
      prevProps.messages[0].messageId < this.props.messages[0].messageId
    ) {
      this.node.scrollTop = (this.node.scrollHeight - this.node.offsetHeight);
    }
  }

  onScroll = () => {
    const { loadMore } = this.props;
    if (this.node.scrollTop === 0) {
      loadMore();
    }
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
