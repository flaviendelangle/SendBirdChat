import styled from 'styled-components';
import Paper from 'material-ui/Paper';


export const Page = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Form = styled(Paper)`
  height: 17rem;
  width: 25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-content: space-evenly;
  align-items: center;
  padding: 2rem;
  background: #CFD8DC !important;
`;
