import SendBird from 'sendbird';


const CONFIG = {
  app_id: 'F0534805-DB42-481D-8DB5-B35BD8931026',
  api_token: '9e4b2323264f680e4126b34dbcdb55567a700698',
  api_url: 'https://api.sendbird.com',
  publicChannel: 'public',
};

const MESSAGE_AMOUNT = 25;

let sb = null;

export const init = (onMessage) => {
  sb = new SendBird({
    appId: CONFIG.app_id,
  });

  const ChannelHandler = new sb.ChannelHandler();
  ChannelHandler.onMessageReceived = onMessage;
  sb.addChannelHandler('unique_handle', ChannelHandler);
};

export const connect = username => new Promise((resolve) => {
  sb.connect(username, resolve);
});

export const disconnect = () => new Promise((resolve) => {
  sb.connect(() => resolve());
});

export const joinPublicChannel = () => new Promise((resolve, reject) => {
  sb.OpenChannel.getChannel(CONFIG.publicChannel, (channel, error) => {
    if (error) {
      reject(error);
    } else {
      channel.enter((error2) => {
        if (error2) {
          reject(error2);
        } else {
          const query = channel.createPreviousMessageListQuery();
          resolve({ channel, query });
        }
      });
    }
  });
});

export const loadPreviousMessages = (channel, query) => new Promise((resolve, reject) => {
  query.load(MESSAGE_AMOUNT, true, (messages, error) => {
    if (error) {
      reject(error);
    } else {
      resolve({ channel, query, messages });
    }
  });
});

export const sendMessage = (channel, ...content) => new Promise((resolve) => {
  channel.sendUserMessage(...content, resolve);
});
