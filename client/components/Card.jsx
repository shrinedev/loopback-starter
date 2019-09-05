import styled from 'styled-components';

const Card = styled.div`
  padding: ${({ theme }) => theme.padding};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-bottom: 50px;
`;

export { Card };
