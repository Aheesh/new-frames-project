//Query Batchswap , display the token that will be swapped for the DEGEN amount selected in previous frame.

import dotenv from 'dotenv';
dotenv.config();
import { NextRequest, NextResponse } from 'next/server';
import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { getHyperFrame } from '../../hyperframes';
import { BalancerSDK, Network, SwapType } from '@balancer-labs/sdk';
import { DEGEN_ADDR, PLAYER_A_ADDR, POOL_ID } from '../../config';
import { ethers } from 'ethers';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  console.log('api/swapTx/route.ts : Approve endpoint');

  let accountAddress: string | undefined = '';
  let text: string | undefined = '';

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  } else {
    return new NextResponse('Message not valid', { status: 500 });
  }

  let state; // = { frame: 'start' };

  try {
    state = JSON.parse(decodeURIComponent(message.state?.serialized));
  } catch (e) {
    console.error(e);
  }

  const frame = state.frame;
  console.log('api/swapTx/route.ts :state =>', message.state);
  console.log('api/swapTx/route.ts :frame =>', frame);

  if (!frame) {
    return new NextResponse('Frame not found', { status: 404 });
  }

  // There should always be a button number
  if (!message?.button) {
    return new NextResponse('Button not found', { status: 404 });
  }

  //QueryBatchSwap to get the expected amount of tokens Out for confirmation
  const providerApiKey = process.env.BASE_PROVIDER_API_KEY;

  const sdk = new BalancerSDK({
    network: Network.BASE,
    rpcUrl: `https://base-mainnet.g.alchemy.com/v2/${providerApiKey}`,
  });

  const tokenIn = DEGEN_ADDR;
  const tokenOut = PLAYER_A_ADDR; //TODO should be based on the option selected

  const swaps = [
    {
      poolId: POOL_ID,
      assetInIndex: 0,
      assetOutIndex: 1,
      amount: String(1e18), //TODO get the amount from the user
      userData: '0x',
    },
  ];
  const assets = [tokenIn, tokenOut];

  const queryInfo = await sdk.swaps.queryBatchSwap({
    kind: SwapType.SwapExactIn,
    swaps,
    assets,
  });
  console.log('queryInfo', queryInfo);
  const absValue = Math.abs(Number(ethers.utils.formatEther(queryInfo[1])));
  console.log('queryInfo', absValue);

  return new NextResponse(getHyperFrame(frame as string, text || 'approve', message?.button));
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
