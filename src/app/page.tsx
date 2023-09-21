'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Grid from '@/components/Grid'
import ModalComplete from '@/components/Modal/ModalComplete'
import { useDisclosure } from '@nextui-org/react'

interface WordSearchGame {
  puzzle: string[][]
  words: string[]
}

export default function Home() {
  const [listOfWords, setListOfWords] = useState([
    { word: 'ECA', isCompleted: true, wordId: 1 },
    { word: 'ISTS', isCompleted: false, wordId: 2 },
    { word: 'SAÚDE', isCompleted: false, wordId: 3 },
    { word: 'CONSENTIMENTO', isCompleted: true, wordId: 4 },
    { word: 'PRESERVATIVO', isCompleted: false, wordId: 5 },
    { word: 'GÊNERO', isCompleted: false, wordId: 6 },
    { word: 'ADOLESCENTE', isCompleted: false, wordId: 7 },
    { word: 'PUBERDADE', isCompleted: false, wordId: 8 },
    { word: 'HORMÔNIOS', isCompleted: false, wordId: 9 },
  ])
  const wordsList: any[] = [
    { word: 'ECA', wordId: 1 },
    { word: 'ISTS', wordId: 2 },
    { word: 'SAUDE', wordId: 3 },
    { word: 'CONSENTIMENTO', wordId: 4 },
    { word: 'PRESERVATIVO', wordId: 5 },
    { word: 'GENERO', wordId: 6 },
    { word: 'ADOLESCENTE', wordId: 7 },
    { word: 'PUBERDADE', wordId: 8 },
    { word: 'HORMONIOS', wordId: 9 },
  ]

  useEffect(() => {
    // isOpen = true
  }, [])

  return (
    <>
      <Header />

      <ModalComplete />

      <div className="w-[100%] p-10 flex-col items-center justify-center">
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2 flex items-center justify-center">
            <Grid
              listWords={listOfWords}
              setListWords={setListOfWords}
              words={wordsList}
              modes={['horizontal', 'vertical', 'reversed']}
              size={15}
            />
          </div>

          <div className="col-span-1">
            <div className="flex flex-col">
              <h3 className="text-2xl mb-4">LISTA DE PALAVRAS</h3>

              {listOfWords.map((word) => {
                return (
                  <p
                    className={`font-bold mb-2 p-2 text-left max-w-xs rounded-md ${
                      word.isCompleted && 'bg-green-400 text-white'
                    }`}
                    key={word.word}
                  >
                    {word.word}
                  </p>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
