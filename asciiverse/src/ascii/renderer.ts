import type { CharacterFrames, CharacterState } from './characters';

/**
 * Calculates the height of a character based on its 'idle' state.
 * Assumes all frames have uniform height equal to the idle block.
 */
export function getCharacterHeight(frames: CharacterFrames): number {
    return frames['idle'] ? frames['idle'].length : 0;
}

/**
 * Retrieves the specific lines for a single frame of animation.
 * Validates boundaries to prevent crashes.
 */
export function getFrameLines(
    frames: CharacterFrames,
    state: CharacterState,
    frameIndex: number
): string[] {
    const height = getCharacterHeight(frames);
    if (height === 0) return ["Error: No idle frame"];

    const sequence = frames[state] || frames['idle'];
    const totalFrames = Math.floor(sequence.length / height);

    // Wrap frameIndex
    const currentFrame = frameIndex % totalFrames;

    const start = currentFrame * height;
    const end = start + height;

    return sequence.slice(start, end);
}
