import { OnTransactionHandler } from '@metamask/snap-types';

const CHAIN_PROMPTER_API_ENDPOINT = 'https://hrtx-svfl63fyhq-lm.a.run.app'

export const onTransaction: OnTransactionHandler = async ({ transaction, chainId }) => {
  const {to, data} = transaction

  const response = await fetch(`${CHAIN_PROMPTER_API_ENDPOINT}/chainId/${chainId.split(':')[1]}/txData`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        to,
        data
      }
      )
    })

    if (!response.ok) {
      throw new Error(
        `Unable to fetch from Chain Prompter "${chainId}": ${response.status} ${response.statusText}.`,
        )
    }

    const output = await response.text()

  return {
    insights: {
      output
    }
  }
};
