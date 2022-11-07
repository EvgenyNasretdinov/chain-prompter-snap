import { Icon, Stack } from '@mui/material';
import styled from 'styled-components';
import { Email, Telegram, Twitter } from '@mui/icons-material';

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 2.4rem;
  padding-bottom: 2.4rem;
  border-top: 1px solid ${(props) => props.theme.colors.border.default};
`;

export const Footer = () => {
  return (
    <FooterWrapper>
      <Stack direction="row" spacing="1rem">
        <a target="_blank" href="https://twitter.com/chainprompter">
          <Twitter sx={{ fontSize: '3rem', color: '#ffffff' }} />
        </a>
        <a target="_blank" href="https://t.me/evzhen">
          <Telegram
            target="_blank"
            sx={{ fontSize: '3rem', color: '#ffffff' }}
          />
        </a>
        <a target="_blank" href="mailto:evgeny.nasretdinov@gmail.com">
          <Email target="_blank" sx={{ fontSize: '3rem', color: '#ffffff' }} />
        </a>
        <Icon sx={{ fontSize: '3rem' }}>
          <a href="https://matrix.to/#/@evzhen.:matrix.org" target="_blank">
            <img src="/matrix.svg" />
          </a>
        </Icon>
      </Stack>
    </FooterWrapper>
  );
};
