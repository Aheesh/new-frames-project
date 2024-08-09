export type HyperFrame = {
  frame: string;
  1: string | ((text: string) => string) | (() => string);
  2?: string | ((text: string) => string) | (() => string);
  3?: string | ((text: string) => string) | (() => string);
  4?: string | ((text: string) => string) | (() => string);
};

const frames: Record<string, HyperFrame> = {};

export function addHyperFrame(label: string, frame: HyperFrame) {
  frames[label] = frame;
}

export function getHyperFrame(frame: string, text: string, button: number) {
  console.log('hyperframes.ts : frame =>', frame);
  const currentFrame = frames[frame];
  console.log('hyperframes.ts : currentFrame =>', currentFrame);
  const nextFrameIdOrFunction = currentFrame[button as keyof HyperFrame];
  console.log('hyperframes.ts : nextFrameIdOrFunction =>', nextFrameIdOrFunction);

  let nextFrameId: string;
  if (typeof nextFrameIdOrFunction === 'function') {
    nextFrameId = nextFrameIdOrFunction(text);
  } else {
    nextFrameId = nextFrameIdOrFunction as string;
  }

  if (!frames[nextFrameId]) {
    throw new Error(`Frame not found: ${nextFrameId}`);
  }

  return frames[nextFrameId].frame;
}
