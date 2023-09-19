'use client'

import generate, { WordSearch } from '@/utils/generator'
import { useEffect, useState } from 'react'

type GridProps = {
  wordList: string[]
}

export default function Grid({ wordList }: GridProps) {
  const [puzzle, setPuzzle] = useState<WordSearch>()
  const [letterMatrix, setLetterMatrix] = useState<string[][]>([])

  useEffect(() => {
    if (puzzle) {
      const letterList = puzzle.getGrid()
      const matrix: any = []
      let i
      let k

      for (i = 0, k = -1; i < letterList.length; i++) {
        if (i % 10 === 0) {
          k++
          matrix[k] = []
        }

        matrix[k].push(letterList[i])
      }

      setLetterMatrix(matrix)
    }
  }, [puzzle])

  useEffect(() => {
    let isMounted = true

    async function fetchData() {
      const test = await generate({
        words: wordList,
        diagonals: false,
        height: 10,
        width: 10,
        maxLength: 10,
        minLength: 3,
      })

      if (isMounted) {
        setPuzzle(test)
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="items-center justify-center border-2 rounded-lg p-4">
      <div className="grid grid-cols-30 gap-2">
        {letterMatrix?.length > 0 &&
          letterMatrix.map((row, rowIndex) => (
            <div key={rowIndex}>
              {row.map((letter, colIndex) => (
                <p className="text-white text-lg text-center" key={colIndex}>
                  {letter}
                </p>
              ))}
            </div>
          ))}
      </div>
    </div>
  )
}
