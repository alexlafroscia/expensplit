import styled from 'react-emotion';
import { lighten } from 'polished';

export default styled('div')`
  background: white;
  border-radius: 3px;
  box-shadow: 3px 3px 5px ${lighten(0.3, 'black')};
  padding: 10px;
`;
