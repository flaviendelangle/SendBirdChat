import React from 'react';
import PropTypes from 'prop-types';
import ActionExit from 'material-ui/svg-icons/action/exit-to-app';
import IconButton from 'material-ui/IconButton';

import { Wrapper, Profil } from './styles';


const ActionBar = ({ username, logout }) => (
  <Wrapper>
    <Profil>{ `Logged as ${username}` }</Profil>
    <IconButton
      tooltip="Leave this application"
      onClick={logout}
    >
      <ActionExit />
    </IconButton>
  </Wrapper>
);

ActionBar.propTypes = {
  username: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
}

export default ActionBar;
