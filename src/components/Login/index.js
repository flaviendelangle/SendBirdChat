import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { Page, Form } from './styles';


export default class Login extends PureComponent {
  static propTypes = {
    changeUsername: PropTypes.func.isRequired,
  };

  state = {
    username: '',
  };

  onUsernameChange = (event, username) => {
    this.setState(() => ({ username }));
  }

  onLogin = () => {
    const { changeUsername } = this.props;
    const { username } = this.state;
    if (username.length > 0) {
      changeUsername(username);
    }
  }

  render() {
    return (
      <Page>
        <Form zDepth={3}>
          <TextField hintText="Username" onChange={this.onUsernameChange} />
          <RaisedButton
            label="Login"
            onClick={this.onLogin}
            primary
          />
        </Form>
      </Page>
    );
  }
}
