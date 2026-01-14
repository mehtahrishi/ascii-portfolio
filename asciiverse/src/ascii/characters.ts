export type CharacterState = 'idle' | 'happy' | 'talking' | 'surprised';

export interface CharacterFrames {
  [key: string]: string[];
}

export const YOU: CharacterFrames = {
  idle: [
    "   ░████████░   ",
    " ░██░  o o   ██░ ",
    " ░██░   ▄    ██░ ",
    "   ░████████░   ",
  ],
  happy: [
    "   ░████████░   ",
    " ░██░  ^ ^   ██░ ",
    " ░██░   ▄    ██░ ",
    "   ░████████░   ",
  ],
  talking: [
    "   ░████████░   ",
    " ░██░  o o   ██░ ",
    " ░██░   O    ██░ ",
    "   ░████████░   ",
    "   ░████████░   ",
    " ░██░  o o   ██░ ",
    " ░██░   o    ██░ ",
    "   ░████████░   ",
  ]
};

export const NPC: CharacterFrames = {
  idle: [
    "    ▄▄▄▄▄▄▄     ",
    "   █       █    ",
    "   █  - -  █    ",
    "   █   _   █    ",
    "    ▀▀▀▀▀▀▀     ",
  ],
  talking: [
    "    ▄▄▄▄▄▄▄     ",
    "   █       █    ",
    "   █  - -  █    ",
    "   █   O   █    ",
    "    ▀▀▀▀▀▀▀     ",
    "    ▄▄▄▄▄▄▄     ",
    "   █       █    ",
    "   █  - -  █    ",
    "   █   _   █    ",
    "    ▀▀▀▀▀▀▀     ",
  ],
  happy: [
    "    ▄▄▄▄▄▄▄     ",
    "   █       █    ",
    "   █  ^ ^  █    ",
    "   █   _   █    ",
    "    ▀▀▀▀▀▀▀     ",
  ]
};
