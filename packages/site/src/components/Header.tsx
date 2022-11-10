import { Stack } from '@mui/material';
import { useContext } from 'react';
import styled from 'styled-components';
import { MetamaskActions, MetaMaskContext } from '../hooks';
import { connectSnap, getSnap } from '../utils';
import { HeaderButtons } from './Buttons';
// import { SnapLogo } from './SnapLogo';

const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2.4rem;
  background-color: ${(props) => props.theme.colors.header.default};
  border-bottom: 0px solid ${(props) => props.theme.colors.border.default};
`;

const Title = styled.p`
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: bold;
  margin: 0;
  margin-left: 1.2rem;
  ${({ theme }) => theme.mediaQueries.small} {
    display: none;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 25px;
  width: 50px;
  height: 50px;
  overflow: hidden;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Header = () => {
  const [state, dispatch] = useContext(MetaMaskContext);

  const handleConnectClick = async () => {
    try {
      await connectSnap();
      const installedSnap = await getSnap();

      dispatch({
        type: MetamaskActions.SetInstalled,
        payload: installedSnap,
      });
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };
  return (
    <HeaderWrapper>
      <Stack direction="row" alignItems="center">
        <LogoWrapper>
          <img src="/logo.png" width="100%" loading="lazy" />
        </LogoWrapper>
        <Title>Chain Prompter ✺</Title>
      </Stack>
      <RightContainer>
        {/* <Toggle
          onToggle={handleToggleClick}
          defaultChecked={getThemePreference()}
        /> */}
        <HeaderButtons state={state} onConnectClick={handleConnectClick} />
      </RightContainer>
    </HeaderWrapper>
  );
};
