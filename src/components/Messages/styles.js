import styled from 'styled-components';
import { List, ListItem } from 'material-ui/List';

export const Wrapper = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  flex-direction: column-reverse;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const ListContent = styled(List)`
  display: flex;
  flex-direction: column-reverse;
  flex-grow: 1;
  flex-shrink: 1;
`;

export const Line = styled(ListItem)`
`;

export const LoaderWrapper = styled.div`
  align-self: center;
  flex-grow: 1;
  display: flex;
  align-items: center;
`;
