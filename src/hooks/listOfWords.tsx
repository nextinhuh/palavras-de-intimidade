'use client'

import { WordCompletedProps } from '@/utils/types'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

interface ListOfWordsContextData {
  listOfWords: { word: string; isCompleted: boolean; wordId: number }[]
  setListOfWords: (
    listOfWords: { word: string; isCompleted: boolean; wordId: number }[],
  ) => void
  newCompletedWord: string
  setNewCompletedWord: (word: string) => void
}

interface ListOfWordsProviderProps {
  children?: any
}

const ListOfWordsContext = createContext<ListOfWordsContextData>(
  {} as ListOfWordsContextData,
)

export function ListOfWordsProvider({ children }: ListOfWordsProviderProps) {
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true)
  const [newCompletedWord, setNewCompletedWord] = useState<string>('')
  const [prevListOfWords, setPrevListOfWords] = useState([
    { word: 'ECA', isCompleted: false, wordId: 1 },
    { word: 'ISTS', isCompleted: false, wordId: 2 },
    { word: 'SAÚDE', isCompleted: false, wordId: 3 },
    { word: 'CONSENTIMENTO', isCompleted: false, wordId: 4 },
    { word: 'PRESERVATIVO', isCompleted: false, wordId: 5 },
    { word: 'GÊNERO', isCompleted: false, wordId: 6 },
    { word: 'ADOLESCENTE', isCompleted: false, wordId: 7 },
    { word: 'PUBERDADE', isCompleted: false, wordId: 8 },
    { word: 'HORMÔNIOS', isCompleted: false, wordId: 9 },
  ])
  const [listOfWords, setListOfWords] = useState([
    { word: 'ECA', isCompleted: false, wordId: 1 },
    { word: 'ISTS', isCompleted: false, wordId: 2 },
    { word: 'SAÚDE', isCompleted: false, wordId: 3 },
    { word: 'CONSENTIMENTO', isCompleted: false, wordId: 4 },
    { word: 'PRESERVATIVO', isCompleted: false, wordId: 5 },
    { word: 'GÊNERO', isCompleted: false, wordId: 6 },
    { word: 'ADOLESCENTE', isCompleted: false, wordId: 7 },
    { word: 'PUBERDADE', isCompleted: false, wordId: 8 },
    { word: 'HORMÔNIOS', isCompleted: false, wordId: 9 },
  ])

  useEffect(() => {
    if (!isFirstRender) {
      if (listOfWords !== prevListOfWords) {
        listOfWords.forEach((word) => {
          prevListOfWords.forEach((prevWord) => {
            if (
              prevWord.wordId === word.wordId &&
              prevWord.isCompleted !== word.isCompleted
            ) {
              prevWord.isCompleted = word.isCompleted
              setNewCompletedWord(prevWord.word)
            }
          })
        })

        setPrevListOfWords([...prevListOfWords])
      }
    } else {
      setIsFirstRender(false)
    }
  }, [listOfWords])

  return (
    <ListOfWordsContext.Provider
      value={{
        listOfWords,
        setListOfWords,
        newCompletedWord,
        setNewCompletedWord,
      }}
    >
      {children}
    </ListOfWordsContext.Provider>
  )
}

export function useListOfWords(): ListOfWordsContextData {
  const context = useContext(ListOfWordsContext)

  if (!context) {
    throw new Error('userAuth must be used within an AuthProvider')
  }

  return context
}
