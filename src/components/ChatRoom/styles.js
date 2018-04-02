import styled from 'styled-components';
import Paper from 'material-ui/Paper';


export const Page = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled(Paper)`
  height: 90%;
  width: 45rem;
  display: flex;
`;

export const SidePannel = styled.div`
  flex-shrink: 0;
  width 15rem;
  display: flex;
  flex-direction: column;
  background: #B0BEC5;
`;

export const Content = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  background: #CFD8DC !important;
`;
