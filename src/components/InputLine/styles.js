import styled from 'styled-components';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export const Wrapper = styled.div`
  height: 3rem;
  display: flex;
  align-items: baseline;
  flex-shrink: 0;
`;

export const Input = styled(TextField)`
  flex-grow: 1;
  margin: 0 1rem;
`;

export const Button = styled(RaisedButton)`
  margin: 0 1rem;
`;
