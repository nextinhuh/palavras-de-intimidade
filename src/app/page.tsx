'use client'

import { useState } from 'react'
import Grid from '@/components/Grid'
import Header from '@/components/Header'
import WordSearch from '@/components/Grid2'

interface WordSearchGame {
  puzzle: string[][]
  words: string[]
}

export default function Home() {
  const [rowsColumns, setRowsColumns] = useState(10) // numero de linhas e colunas
  const [numberOfWords, setNumberOfWords] = useState(0)
  const [startGame, setStartGame] = useState(true)
  const [newList, setNewList] = useState([])
  const wordsList: string[] = [
    'ECA',
    'ISTS',
    'SAUDE',
    'CONSENTIMENTO',
    'PRESERVATIVO',
    'GENERO',
    'ADOLESCENTE',
    'PUBERDADE',
    'HORMONIOS',
  ]

  const listOfWords = [
    'ECA',
    'ISTS',
    'SAÚDE',
    'CONSENTIMENTO',
    'PRESERVATIVO',
    'GÊNERO',
    'ADOLESCENTE',
    'PUBERDADE',
    'HORMÔNIOS',
  ]

  function handleEnterClick() {
    let count = 0

    // The Fisher-Yates algorith
    const shuffledWords = [...listOfWords]
    for (let i = shuffledWords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = shuffledWords[i]
      shuffledWords[i] = shuffledWords[j]
      shuffledWords[j] = temp
    }

    const objectArray: any = []
    const words = shuffledWords.filter(
      (word) => word.length < rowsColumns && count++ < numberOfWords,
    )

    words.forEach((word, index) => {
      objectArray[index] = { id: index, name: word, completed: false }
    })

    console.log(objectArray)
    setNewList(objectArray)
  }
  return (
    <>
      <Header />

      <div className="w-[100%] p-10 flex-col items-center justify-center">
        <div className="grid grid-cols-4 gap-2">
          <div className="col-span-3 flex items-center justify-center border-2 border-cyan-400 rounded-lg">
            <WordSearch
              words={wordsList}
              modes={['horizontal', 'vertical', 'reversed']}
              size={23}
            />
          </div>

          <div className="col-span-1 border-2 border-cyan-400 p-4 rounded-lg">
            <h3 className="text-large mb-4">Lista de palavras</h3>

            {listOfWords.map((word) => {
              return <p key={word}>{word}</p>
            })}
          </div>
        </div>
      </div>
    </>
  )
}
