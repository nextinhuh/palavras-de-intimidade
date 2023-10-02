'use client'

import { useEffect, useState } from 'react'
import HashLoader from 'react-spinners/HashLoader'

import { compareStrings, randomChar, range, shuffleArray } from '../utils'
import {
  Point,
  Direction,
  UP,
  DOWN,
  LEFT,
  RIGHT,
  LEFT_UP,
  RIGHT_UP,
  LEFT_DOWN,
  RIGHT_DOWN,
  Table,
  TableVerify,
  GridProps,
  WordProps,
  WordCompletedProps,
} from '../utils/types'
import { useListOfWords } from '@/hooks/listOfWords'

export default function Grid({ words, size, modes }: GridProps) {
  const { listOfWords, setListOfWords } = useListOfWords()
  const [table, setTable] = useState<Table>([])
  const [wordCompletedList, setWordCompletedList] =
    useState<WordCompletedProps[]>(words)
  const [letterSelectedList, setLetterSelectedList] = useState<TableVerify>([])

  function handleCreateTable() {
    const points: Point[] = []
    const availableDirections = [
      UP,
      DOWN,
      LEFT,
      LEFT_UP,
      LEFT_DOWN,
      RIGHT,
      RIGHT_UP,
      RIGHT_DOWN,
    ].filter((direction) =>
      direction.modes.every((mode) => modes.includes(mode)),
    )

    const tableCreated: Table = range(0, 25 - 1).map((y) =>
      range(0, size - 1).map((x) => {
        points.push([x, y])

        return {
          char: randomChar(),
          wordId: 0,
          isWord: false,
        }
      }),
    )

    words.forEach(async (word) => {
      if (/^[A-Za-z]+$/.test(word.word)) {
        createWord(
          word.word.toUpperCase(),
          word.wordId,
          tableCreated,
          size,
          shuffleArray(points),
          availableDirections,
        )
      }
    })

    const tableVerify = tableCreated.map((col) => {
      return col.map((row) => {
        return {
          isWord: row.isWord,
          isCorrect: false,
          char: row.char,
          wordId: row.wordId,
        }
      })
    })

    setTable(tableCreated)
    setLetterSelectedList(tableVerify)
  }

  useEffect(() => {
    handleCreateTable()

    const wordCompletedListCleaned = wordCompletedList.map((word) => {
      return {
        wordId: word.wordId,
        isCompleted: false,
      }
    })

    setWordCompletedList([...wordCompletedListCleaned])
  }, [])

  function handleLetterClick(x: number, y: number) {
    if (letterSelectedList[x][y].isWord) {
      letterSelectedList[x][y].isCorrect = true
      const listWord: WordProps[] = []

      letterSelectedList.forEach((row) => {
        row.forEach((letter) => {
          words.forEach((word) => {
            if (letter.isCorrect && letter.wordId === word.wordId) {
              listWord.push({
                word: letter.char,
                wordId: letter.wordId,
              })
            }
          })
        })
      })

      if (listWord.length > 0) {
        const neWordCompletedList = wordCompletedList.map((wordCompleted) => {
          const writedWord = filterLetter(listWord, wordCompleted.wordId)

          words.forEach((word) => {
            if (
              wordCompleted.wordId === word.wordId &&
              compareStrings(writedWord, word.word) &&
              !wordCompleted.isCompleted
            ) {
              const newListWords = listOfWords.map((wordComplete: any) => {
                if (wordComplete.wordId === word.wordId) {
                  wordComplete.isCompleted = true
                  return wordComplete
                }
                return wordComplete
              })

              setListOfWords([...newListWords])

              wordCompleted.isCompleted = true
            }
          })

          return wordCompleted
        })

        setWordCompletedList([...neWordCompletedList])
      }

      setLetterSelectedList([...letterSelectedList])
    }
  }

  function filterLetter(listWord: WordProps[], wordId: number) {
    let writeWord = ''

    listWord.forEach((word) => {
      if (word.wordId === wordId) {
        writeWord += word.word
      }
    })

    return writeWord
  }

  return (
    <>
      {table.length > 0 ? (
        <div className="grid grid-cols-25 gap-1">
          {table.map((row, index) => (
            <div className="" key={index}>
              {row.map((letter, col) => (
                <p
                  className={`text-lg text-center cursor-pointer font-bold border-1 mb-2 p-1 rounded-md hover:bg-slate-300 ${
                    letterSelectedList[index][col].isCorrect
                      ? 'red bg-green-400'
                      : 'black border-black'
                  }`}
                  style={{
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    color: letterSelectedList[index][col].isCorrect
                      ? 'white'
                      : 'black',
                  }}
                  key={col}
                  onClick={() => handleLetterClick(index, col)}
                >
                  {letter.char}
                </p>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <HashLoader
            color={'#380099'}
            size={120}
            loading={true}
            aria-label="Loading Spinner"
            data-testid="loader"
            speedMultiplier={1}
          />
        </div>
      )}
    </>
  )
}

function createWord(
  word: string,
  wordId: number,
  table: Table,
  size: number,
  points: Point[],
  availableDirections: Direction[],
) {
  for (let pointIndex = 0; pointIndex < points.length; pointIndex += 1) {
    const [x, y] = points[pointIndex]

    const directions = shuffleArray(availableDirections.map((d) => d.direction))

    for (
      let directionIndex = 0;
      directionIndex < directions.length;
      directionIndex += 1
    ) {
      const [xd, yd] = directions[directionIndex]

      const xEnd = x + (word.length - 1) * xd
      const yEnd = y + (word.length - 1) * yd

      if (yEnd > size - 1 || yEnd < 0 || xEnd > size - 1 || xEnd < 0) {
        continue
      }

      let isValid = true
      const positions: Point[] = []

      for (
        let col = x, row = y, i = 0;
        i < word.length;
        col += xd, row += yd, i += 1
      ) {
        if (table[row][col]?.isWord && table[row][col].char !== word[i]) {
          isValid = false
          break
        }

        positions.push([col, row])
      }

      if (!isValid) {
        continue
      }

      positions.forEach(([x, y], index) => {
        table[y][x] = {
          char: word[index],
          wordId,
          isWord: true,
        }
      })

      return
    }
  }
}
