export const pieceIcons: { [key: string]: string } = {
  p: '♟', n: '♞', b: '♝', r: '♜', q: '♛', k: '♚',
  P: '♙', N: '♘', B: '♗', R: '♖', Q: '♕', K: '♔',
};

export const initialBoardSetup: string[][] = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
];

const isInBounds = (row: number, col: number): boolean => row >= 0 && row < 8 && col >= 0 && col < 8;

const isOpponent = (piece1: string, piece2: string): boolean => {
  return (piece1.toLowerCase() !== piece1 && piece2.toLowerCase() === piece2) ||
         (piece1.toLowerCase() === piece1 && piece2.toLowerCase() !== piece2);
};

const getPossibleKnightMoves = (board: string[][], row: number, col: number, piece: string): [number, number][] => {
  const moves: [number, number][] = [];
  const deltas = [
    [-2, -1], [-2, 1], [-1, -2], [-1, 2],
    [1, -2], [1, 2], [2, -1], [2, 1],
  ];

  deltas.forEach(([dr, dc]) => {
    const [newRow, newCol] = [row + dr, col + dc];
    if (isInBounds(newRow, newCol) && (!board[newRow][newCol] || isOpponent(piece, board[newRow][newCol]))) {
      moves.push([newRow, newCol]);
    }
  });

  return moves;
};

const getPossibleBishopMoves = (board: string[][], row: number, col: number, piece: string): [number, number][] => {
  const moves: [number, number][] = [];
  const directions = [
    [-1, -1], [-1, 1], [1, -1], [1, 1],
  ];

  directions.forEach(([dr, dc]) => {
    let [r, c] = [row + dr, col + dc];
    while (isInBounds(r, c)) {
      if (board[r][c]) {
        if (isOpponent(piece, board[r][c])) {
          moves.push([r, c]);
        }
        break;
      } else {
        moves.push([r, c]);
      }
      r += dr;
      c += dc;
    }
  });

  return moves;
};

const getPossibleRookMoves = (board: string[][], row: number, col: number, piece: string): [number, number][] => {
  const moves: [number, number][] = [];
  const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1],
  ];

  directions.forEach(([dr, dc]) => {
    let [r, c] = [row + dr, col + dc];
    while (isInBounds(r, c)) {
      if (board[r][c]) {
        if (isOpponent(piece, board[r][c])) {
          moves.push([r, c]);
        }
        break;
      } else {
        moves.push([r, c]);
      }
      r += dr;
      c += dc;
    }
  });

  return moves;
};

const getPossibleQueenMoves = (board: string[][], row: number, col: number, piece: string): [number, number][] => {
  return [
    ...getPossibleBishopMoves(board, row, col, piece),
    ...getPossibleRookMoves(board, row, col, piece),
  ];
};

const getPossibleKingMoves = (board: string[][], row: number, col: number, piece: string): [number, number][] => {
  const moves: [number, number][] = [];
  const deltas = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1],
  ];

  deltas.forEach(([dr, dc]) => {
    const [newRow, newCol] = [row + dr, col + dc];
    if (isInBounds(newRow, newCol) && (!board[newRow][newCol] || isOpponent(piece, board[newRow][newCol]))) {
      moves.push([newRow, newCol]);
    }
  });

  return moves;
};

const getPossibleWhitePawnMoves = (board: string[][], row: number, col: number): [number, number][] => {
  const moves: [number, number][] = [];
  const direction = -1; 
  const startRow = 6;

  if (isInBounds(row + direction, col) && board[row + direction][col] === '') {
    moves.push([row + direction, col]);
    if (row === startRow && board[row + 2 * direction][col] === '') {
      moves.push([row + 2 * direction, col]);
    }
  }

  [[direction, -1], [direction, 1]].forEach(([dr, dc]) => {
    const newRow = row + dr;
    const newCol = col + dc;
    if (isInBounds(newRow, newCol) && board[newRow][newCol] && isOpponent(board[row][col], board[newRow][newCol])) {
      moves.push([newRow, newCol]);
    }
  });

  return moves;
};

const getPossibleBlackPawnMoves = (board: string[][], row: number, col: number): [number, number][] => {
  const moves: [number, number][] = [];
  const direction = 1; 
  const startRow = 1;

  if (isInBounds(row + direction, col) && board[row + direction][col] === '') {
    moves.push([row + direction, col]);
    if (row === startRow && board[row + 2 * direction][col] === '') {
      moves.push([row + 2 * direction, col]);
    }
  }

  const captureOffsets = [[direction, -1], [direction, 1]];
  captureOffsets.forEach(([dr, dc]) => {
    const [newRow, newCol] = [row + dr, col + dc];
    if (isInBounds(newRow, newCol) && isOpponent(board[row][col], board[newRow][newCol])) {
      moves.push([newRow, newCol]);
    }
  });

  return moves;
};

export const getPossibleMoves = (board: string[][], row: number, col: number): [number, number][] => {
  const piece = board[row][col];
  if (!piece) return [];

  switch (piece) {
    case 'P':
      return getPossibleWhitePawnMoves(board, row, col);
    case 'p':
      return getPossibleBlackPawnMoves(board, row, col);
    case 'n':
    case 'N':
      return getPossibleKnightMoves(board, row, col, piece);
    case 'b':
    case 'B':
      return getPossibleBishopMoves(board, row, col, piece);
    case 'r':
    case 'R':
      return getPossibleRookMoves(board, row, col, piece);
    case 'q':
    case 'Q':
      return getPossibleQueenMoves(board, row, col, piece);
    case 'k':
    case 'K':
      return getPossibleKingMoves(board, row, col, piece);
    default:
      return [];
  }
};

export const isValidMove = (board: string[][], from: [number, number], to: [number, number]): boolean => {
  const [fromRow, fromCol] = from;
  const [toRow, toCol] = to;
  const possibleMoves = getPossibleMoves(board, fromRow, fromCol);
  return possibleMoves.some(([r, c]) => r === toRow && c === toCol);
};

const findKing = (board: string[][], color: 'white' | 'black'): [number, number] | null => {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if ((color === 'white' && board[row][col] === 'K') || (color === 'black' && board[row][col] === 'k')) {
        return [row, col];
      }
    }
  }
  return null;
};

const isCheck = (board: string[][], color: 'white' | 'black'): boolean => {
  const kingPosition = findKing(board, color);
  if (!kingPosition) return false;
  const [kingRow, kingCol] = kingPosition;

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && ((color === 'white' && piece === piece.toLowerCase()) || (color === 'black' && piece === piece.toUpperCase()))) {
        const possibleMoves = getPossibleMoves(board, row, col);
        if (possibleMoves.some(([r, c]) => r === kingRow && c === kingCol)) {
          return true;
        }
      }
    }
  }
  return false;
};

const isCheckmate = (board: string[][], color: 'white' | 'black'): boolean => {
  if (!isCheck(board, color)) return false;

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && ((color === 'white' && piece === piece.toUpperCase()) || (color === 'black' && piece === piece.toLowerCase()))) {
        const possibleMoves = getPossibleMoves(board, row, col);
        for (const [newRow, newCol] of possibleMoves) {
          const newBoard = board.map(row => [...row]);
          newBoard[newRow][newCol] = piece;
          newBoard[row][col] = '';
          if (!isCheck(newBoard, color)) {
            return false;
          }
        }
      }
    }
  }
  return true;
};

export { isCheck, isCheckmate };
