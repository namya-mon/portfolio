'use client'
import { useState, useEffect } from 'react'

type CellState = {
  revealed: boolean
  hasMine: boolean
  flagged: boolean
  adjacentMines: number
}

export default function Minesweeper() {
  const [board, setBoard] = useState<CellState[][]>([])
  const [gameOver, setGameOver] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [boardSize, setBoardSize] = useState({ rows: 10, cols: 10 })
  const [mineCount, setMineCount] = useState(15)

  useEffect(() => {
    initializeBoard()
  }, [])

  const initializeBoard = () => {
    setGameOver(false)
    setGameWon(false)
    
    // Create empty board
    const newBoard: CellState[][] = Array(boardSize.rows).fill(null).map(() => 
      Array(boardSize.cols).fill(null).map(() => ({
        revealed: false,
        hasMine: false,
        flagged: false,
        adjacentMines: 0
      }))
    )

    // Place mines randomly
    let minesPlaced = 0
    while (minesPlaced < mineCount) {
      const row = Math.floor(Math.random() * boardSize.rows)
      const col = Math.floor(Math.random() * boardSize.cols)
      
      if (!newBoard[row][col].hasMine) {
        newBoard[row][col].hasMine = true
        minesPlaced++
      }
    }

    // Calculate adjacent mines
    for (let row = 0; row < boardSize.rows; row++) {
      for (let col = 0; col < boardSize.cols; col++) {
        if (!newBoard[row][col].hasMine) {
          let count = 0
          for (let r = Math.max(0, row-1); r <= Math.min(boardSize.rows-1, row+1); r++) {
            for (let c = Math.max(0, col-1); c <= Math.min(boardSize.cols-1, col+1); c++) {
              if (newBoard[r][c].hasMine) count++
            }
          }
          newBoard[row][col].adjacentMines = count
        }
      }
    }

    setBoard(newBoard)
  }

  const revealCell = (row: number, col: number) => {
    if (gameOver || gameWon || board[row][col].revealed || board[row][col].flagged) return

    const newBoard = [...board]
    
    if (newBoard[row][col].hasMine) {
      // Game over - reveal all mines
      for (let r = 0; r < boardSize.rows; r++) {
        for (let c = 0; c < boardSize.cols; c++) {
          if (newBoard[r][c].hasMine) newBoard[r][c].revealed = true
        }
      }
      setBoard(newBoard)
      setGameOver(true)
      return
    }

    // Reveal empty cells recursively
    const revealEmptyCells = (r: number, c: number) => {
      if (r < 0 || r >= boardSize.rows || c < 0 || c >= boardSize.cols || 
          newBoard[r][c].revealed || newBoard[r][c].flagged) return

      newBoard[r][c].revealed = true

      if (newBoard[r][c].adjacentMines === 0) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr !== 0 || dc !== 0) revealEmptyCells(r + dr, c + dc)
          }
        }
      }
    }

    revealEmptyCells(row, col)
    setBoard(newBoard)

    // Check if player won
    checkWinCondition(newBoard)
  }

  const toggleFlag = (row: number, col: number, e: React.MouseEvent) => {
    e.preventDefault() // Prevent context menu
    if (gameOver || gameWon || board[row][col].revealed) return

    const newBoard = [...board]
    newBoard[row][col].flagged = !newBoard[row][col].flagged
    setBoard(newBoard)
  }

  const checkWinCondition = (currentBoard: CellState[][]) => {
    let unrevealedSafeCells = 0
    for (let row = 0; row < boardSize.rows; row++) {
      for (let col = 0; col < boardSize.cols; col++) {
        if (!currentBoard[row][col].revealed && !currentBoard[row][col].hasMine) {
          unrevealedSafeCells++
        }
      }
    }
    if (unrevealedSafeCells === 0) {
      setGameWon(true)
    }
  }

  const getCellColor = (adjacentMines: number) => {
    const colors = [
      'text-transparent', // 0
      'text-blue-600',    // 1
      'text-green-600',   // 2
      'text-red-600',     // 3
      'text-purple-800',  // 4
      'text-yellow-600',  // 5
      'text-cyan-600',    // 6
      'text-black',       // 7
      'text-gray-600'     // 8
    ]
    return colors[adjacentMines]
  }

  return (
    <div className="w-full h-full p-4 overflow-auto">
      <h1 className="text-xl font-bold mb-4">Minesweeper</h1>
      
      <div className="flex gap-4 mb-4">
        <button 
          onClick={initializeBoard}
          className="px-3 py-1 bg-gray-300 border border-gray-500 hover:bg-gray-400"
        >
          New Game
        </button>
        
        {gameOver && <div className="text-red-600 font-bold">Game Over!</div>}
        {gameWon && <div className="text-green-600 font-bold">You Won!</div>}
      </div>
      
      <div className="inline-block border-2 border-gray-400">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                onClick={() => revealCell(rowIndex, colIndex)}
                onContextMenu={(e) => toggleFlag(rowIndex, colIndex, e)}
                className={`w-8 h-8 flex items-center justify-center border border-gray-300 cursor-pointer
                  ${cell.revealed ? 'bg-gray-200' : 'bg-gray-300 hover:bg-gray-400'}
                  ${gameOver && cell.hasMine ? 'bg-red-200' : ''}
                `}
              >
                {cell.revealed ? (
                  cell.hasMine ? (
                    <span>💣</span>
                  ) : (
                    <span className={`${getCellColor(cell.adjacentMines)} font-bold`}>
                      {cell.adjacentMines > 0 ? cell.adjacentMines : ''}
                    </span>
                  )
                ) : cell.flagged ? (
                  <span>🚩</span>
                ) : null}
              </div>
            ))}
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-sm">
        <p>Left-click to reveal a cell</p>
        <p>Right-click to place/remove flag</p>
      </div>
    </div>
  )
}