import { Icon, Stack } from '@mui/material';
import styled from 'styled-components';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import EmailIcon from '@mui/icons-material/Email';

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
          <TwitterIcon sx={{ fontSize: '3rem', color: '#ffffff' }} />
        </a>
        <a target="_blank" href="https://t.me/evzhen">
          <TelegramIcon
            target="_blank"
            sx={{ fontSize: '3rem', color: '#ffffff' }}
          />
        </a>
        <a target="_blank" href="mailto:evgeny.nasretdinov@gmail.com">
          <EmailIcon
            target="_blank"
            sx={{ fontSize: '3rem', color: '#ffffff' }}
          />
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
