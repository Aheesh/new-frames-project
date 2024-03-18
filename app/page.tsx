import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Road',
    },
    {
      label: 'Woods',
    },
    {
      label: 'Cave',
    },
    {
      action: 'link',
      label: 'TODO',
      target: 'https://www.google.com',
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/frame-1-forest.webp`,
    aspectRatio: '1:1',
  },
  state: { serialized: { frame: "start" } },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'HyperFrames!',
  description: 'Time is a flat circle.',
  openGraph: {
    title: 'HyperFrames!',
    description: 'Time is a flat circle.',
    images: [`${NEXT_PUBLIC_URL}/frame-1-forest.webp`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>HyperFrames!</h1>
      <a href="https://docs.base.org/building-with-base/guides/hyperframes">Click here to learn how to make this!</a>
    </>
  );
}
