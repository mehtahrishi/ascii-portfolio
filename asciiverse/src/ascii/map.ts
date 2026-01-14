// Logic for map layout and station positioning
export interface StationNode {
    id: string;
    x: number;
    y: number;
    unlocked: boolean;
}

export const initialMapLayout: StationNode[] = [
    { id: 'SUMMARY', x: 5, y: 5, unlocked: true },
    // ...
];
