import React, { useState } from 'react';
import { pieceIcons, initialBoardSetup, isValidMove, getPossibleMoves, isCheck, isCheckmate } from '../logic/chessLogic';
import { toast } from 'react-hot-toast';

interface ChessBoardProps {
  onMove: (move: string) => void;
  onIllegalMove: () => void;
  turn: 'white' | 'black';
  setTurn: (turn: 'white' | 'black') => void;
  setCapturedPieces: (capturedPieces: { white: string[]; black: string[] }) => void;
  capturedPieces: { white: string[]; black: string[] };
}


const ChessBoard: React.FC<ChessBoardProps> = ({ onMove, onIllegalMove, setTurn, turn, setCapturedPieces, capturedPieces }:ChessBoardProps) => {
  const [board, setBoard] = useState<string[][]>(initialBoardSetup);
  const [selectedPiece, setSelectedPiece] = useState<[number, number] | null>(null);
  const [highlightedSquares, setHighlightedSquares] = useState<[number, number][]>([]);

  const handleSquareClick = (row: number, col: number) => {
    if (selectedPiece) {
        const [fromRow, fromCol] = selectedPiece;
        const piece = board[fromRow][fromCol];
        const targetPiece = board[row][col];

        if ((turn === 'white' && piece !== piece.toUpperCase()) || (turn === 'black' && piece !== piece.toLowerCase())) {
            setSelectedPiece(null);
            setHighlightedSquares([]);
            onIllegalMove();
            return;
        }

        
        const newBoard = board.map((r) => [...r]);
        newBoard[row][col] = piece;
        newBoard[fromRow][fromCol] = '';

       
        if (isValidMove(board, [fromRow, fromCol], [row, col])) {
            if (!isCheck(newBoard, turn)) {
                if (targetPiece) {
                    const updatedCapturedPieces = { ...capturedPieces };
                    updatedCapturedPieces[turn === 'white' ? 'black' : 'white'].push(targetPiece);
                    setCapturedPieces(updatedCapturedPieces);
                }

                setBoard(newBoard);
                setHighlightedSquares([]);
                
                if (isCheck(newBoard, turn === 'white' ? 'black' : 'white')) {
                    toast.success('Check');
                    if (isCheckmate(newBoard, turn === 'white' ? 'black' : 'white')) {
                        toast.success(`Checkmate! ${turn.charAt(0).toUpperCase() + turn.slice(1)} wins!`);
                    }
                }

                onMove(`${String.fromCharCode(97 + fromCol)}${8 - fromRow} -> ${String.fromCharCode(97 + col)}${8 - row}`);
                setTurn(turn === 'white' ? 'black' : 'white'); 
            } else {
                onIllegalMove(); 
            }
        } else {
            onIllegalMove(); 
        }

        setSelectedPiece(null);
    } else {
        const piece = board[row][col];
        if ((turn === 'white' && piece && piece === piece.toUpperCase()) || (turn === 'black' && piece && piece === piece.toLowerCase())) {
            setSelectedPiece([row, col]);
            setHighlightedSquares(getPossibleMoves(board, row, col));
        }
    }
};


  return (
    <div className="grid grid-cols-8 gap-0 text-3xl">
      {board.map((row, rowIndex) =>
        row.map((piece, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`w-16 h-16 flex items-center justify-center border ${
              selectedPiece && selectedPiece[0] === rowIndex && selectedPiece[1] === colIndex
                ? 'bg-yellow-300'
                : highlightedSquares.some(([r, c]) => r === rowIndex && c === colIndex)
                ? 'bg-green-300'
                : (rowIndex + colIndex) % 2 === 0
                ? 'bg-gray-300'
                : 'bg-gray-500'
            }`}
            onClick={() => handleSquareClick(rowIndex, colIndex)}
          >
            {piece && pieceIcons[piece]}
          </div>
        ))
      )}
    </div>
  );
};

export default ChessBoard;
