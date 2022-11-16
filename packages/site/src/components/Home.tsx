// import { Button, Input, Stack } from '@mui/material';
import { useContext } from 'react';
import styled from 'styled-components';
import { MetamaskActions, MetaMaskContext } from '../hooks';
import { connectSnap, getSnap } from '../utils';
import { ConnectButton, InstallFlaskButton } from './Buttons';
import { Card } from './Card';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  // margin-top: 7.6rem;
  margin-bottom: 7.6rem;
  ${({ theme }) => theme.mediaQueries.small} {
    padding-left: 2.4rem;
    padding-right: 2.4rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: auto;
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6rem;
  // margin-bottom: 7.6rem;
  // min-width: 100vw;
  // min-height: 100vh;
  width: 100vw;
  height: 75vh;
  ${({ theme }) => theme.mediaQueries.small} {
    padding-left: 2.4rem;
    padding-right: 2.4rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: auto;
  }
`;

const Heading = styled.h1`
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: center;
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
      {/* <LogoWrapper>
        <img
          src='/ChP-logo.jpeg'
          width='100%'
          // height='100%'
          loading="lazy"
        />
      </LogoWrapper> */}
      <PageContainer>
        ﹀\_︿╱﹀╲/╲︿_/︺\_︿╱▔︺\/\︹▁╱﹀▔╲︿_/︺▔╲▁︹_/
        <Heading>
          {/* Welcome to <Span>Chain Prompter</Span> */}
          Welcome<Span>!</Span>
        </Heading>
        ﹀▔\⁄﹀\╱﹀▔︺\︹▁︿╱\╱﹀▔╲︿_︿︹_/▔﹀\_︿╱
        <CardContainer>
          <Card
            title={
              'Chain Prompter is here to help you understand blockchain transactions! 🌱'
            }
            fullWidth={true}
          >
            The idea is to make blockchain accessible for everyone. You don't
            need to understand coding or math, to be able to interact with
            blockchain Dapps and to know what logic is running underneath. Even
            on a new Smart contracts, that don't have a propper documentation
            yet, you should be able to understand a high-level concept of what
            the code is about to do.
            <br />
            <br />
            With the help of GPT-3 and our own models, we are capable of
            translating and summarizing the programming code into human's text.
            By parsing transaction data, we are able to know what interaction
            with the SC is going to happen, and, when the AI can describe us the
            programming code, we can describe the user what will happen (or
            happend) on the onchain layer.
            <br />
            <br />
            Scroll down to try it yourself! ⬇️ ⬇️ ⬇️
          </Card>
        </CardContainer>
      </PageContainer>

      <CardContainer>
        {state.error && (
          <ErrorMessage>
            <b>An error happened:</b> {state.error.message}
          </ErrorMessage>
        )}
        <Card
          title={'1. Install MetaMask Flask'}
          button={<InstallFlaskButton disabled={state.isFlask} />}
          disabled={state.isFlask}
          fullWidth={false}
        >
          Snaps is pre-release software only available in MetaMask Flask, a
          canary distribution for developers with access to upcoming features.
        </Card>
        <Card
          title={'2. Connect and Install'}
          button={
            <ConnectButton
              onClick={handleConnectClick}
              disabled={!state.isFlask || state.installedSnap}
            />
          }
          fullWidth={false}
          disabled={!state.isFlask || Boolean(state.installedSnap)}
        >
          Get started by connecting to and installing Chain Prompter snap! After
          installing, try to execute a transaction and checkout Chain Prompter
          tab in transaction insights!
        </Card>
        {/* <Card title={'[SOON]Translate transaction hash on mainnet'} fullWidth>
          <Stack direction="row" justifyContent="space-between" spacing={1}>
            <Input
              sx={{ color: darkMode ? '#fff' : '#000', fontSize: '1em' }}
              fullWidth
              type="text"
              placeholder="tx hash"
            />
            <Button
              variant="contained"
              onClick={() => console.log('API')}
              sx={{
                color: darkMode ? '#000' : '#fff',
                background: darkMode ? '#fff' : '#000',
                fontSize: '0.7em',
                fontWeight: '600',
                borderRadius: '0.75rem',
                ':hover': {
                  background: 'transparent',
                },
              }}
            >
              Translate
            </Button>
          </Stack>
        </Card> */}
      </CardContainer>
    </Container>
  );
};
