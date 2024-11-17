export interface IGameBoard {
  gameBoard: Array<Array<string>>;
  evaluateCurrentState?: () => number;
  getPossibleMoves: () => [number, number][];
  getWinner: () => any;
  draw: () => void;
}
