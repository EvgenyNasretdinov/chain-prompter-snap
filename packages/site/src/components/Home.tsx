import { Button, Input, Stack } from '@mui/material';
import { useContext } from 'react';
import styled from 'styled-components';
import { MetamaskActions, MetaMaskContext } from '../hooks';
import {
  connectSnap,
  getSnap,
  getThemePreference,
  shouldDisplayReconnectButton,
} from '../utils';
import {
  ConnectButton,
  InstallFlaskButton,
  ReconnectButton,
} from './Buttons';
import { Card } from './Card';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin-top: 7.6rem;
  margin-bottom: 7.6rem;
  ${({ theme }) => theme.mediaQueries.small} {
    padding-left: 2.4rem;
    padding-right: 2.4rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: auto;
  }
`;

const Heading = styled.h1`
  margin-top: 0;
  margin-bottom: 2.4rem;
  text-align: center;
`;

const Span = styled.span`
  color: ${(props) => props.theme.colors.primary.default};
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 64.8rem;
  width: 100%;
  height: 100%;
  margin-top: 1.5rem;
`;

const ErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.error.muted};
  border: 1px solid ${({ theme }) => theme.colors.error.default};
  color: ${({ theme }) => theme.colors.error.alternative};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 2.4rem;
  margin-bottom: 2.4rem;
  margin-top: 2.4rem;
  max-width: 60rem;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.small} {
    padding: 1.6rem;
    margin-bottom: 1.2rem;
    margin-top: 1.2rem;
    max-width: 100%;
  }
`;

export const Home = () => {
  const [state, dispatch] = useContext(MetaMaskContext);
  const darkMode = getThemePreference()
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
    <Container>
      <Heading>
        Welcome to <Span>Chain Prompter</Span>
      </Heading>
      <CardContainer>
        {state.error && (
          <ErrorMessage>
            <b>An error happened:</b> {state.error.message}
          </ErrorMessage>
        )}
        <Card
          title={'1. Install MetaMask Flask'}
          button={<InstallFlaskButton />}
          disabled={state.isFlask}
          fullWidth={false}
        >
          Snaps is pre-release software only available in MetaMask Flask, a canary distribution for developers with access to upcoming features.
        </Card>
        {!state.installedSnap && (
          <Card
            title={'2. Connect and Install'}
            button={
              <ConnectButton
                onClick={handleConnectClick}
                disabled={!state.isFlask}
              />
            }
            fullWidth={false}
            disabled={!state.isFlask}
          >
            Get started by connecting to and installing Chain Prompter!
          </Card>
        )}
        {shouldDisplayReconnectButton(state.installedSnap) && (
          <Card
            title={'Reconnect'}
            button={
              <ReconnectButton
                onClick={handleConnectClick}
                disabled={!state.installedSnap}
              />
            }
            fullWidth
            disabled={!state.installedSnap}
          >
            While connected to a local running snap this button will always be displayed in order to update the snap if a change is made.
          </Card>
        )}

        <Card
          title={'Reconnect'}
          fullWidth
        >
          <Stack direction='row' justifyContent='space-between' spacing={1}>
            <Input sx={{ color: darkMode ? '#fff' : '#000', fontSize: '1em' }} fullWidth type='text' placeholder='tx hash' />
            <Button
              variant='contained'
              onClick={() => console.log('API')}
              sx={{
                color: darkMode ? '#000' : '#fff',
                background: darkMode ? '#fff' : '#000',
                fontSize: '0.7em',
                fontWeight: '600',
                borderRadius: '0.75rem',
                ':hover': {
                  background: 'transparent'
                },
              }}
            >Translate</Button>
          </Stack>
        </Card>
      </CardContainer>
    </Container>
  );
};
