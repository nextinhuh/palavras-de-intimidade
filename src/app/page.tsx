'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Header from '@/components/Header'
import Grid from '@/components/Grid'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react'
import { useListOfWords } from '@/hooks/listOfWords'
import Fireworks from '@/components/Fireworks'

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [modalTitle, setModalTitle] = useState('')
  const [showFireworks, setShowFireworks] = useState(false)
  const { listOfWords, newCompletedWord, setNewCompletedWord } =
    useListOfWords()

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

  useMemo(() => {
    if (!isOpen) {
      setShowFireworks(false)
    }
  }, [onOpenChange])

  useEffect(() => {
    if (newCompletedWord !== '') {
      const listWordsCompleted = listOfWords.filter((word) => {
        return word.isCompleted === true
      })

      if (listOfWords.length === listWordsCompleted.length) {
        setShowFireworks(true)
      }
      onOpen()
      setModalTitle(newCompletedWord)
      setNewCompletedWord('')
    }
  }, [newCompletedWord])

  return (
    <>
      <Header />

      {showFireworks && <Fireworks />}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {showFireworks
                  ? 'Parabéns você completou o desafio!!'
                  : modalTitle}
              </ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Entendi
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="w-[100%] p-10 flex-col items-center justify-center">
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2 flex items-center justify-center">
            <Grid
              words={wordsList}
              modes={['horizontal', 'vertical', 'reversed']}
              size={10}
            />
          </div>

          <div className="col-span-1">
            <div className="flex flex-col">
              <h3 className="text-2xl mb-4">LISTA DE PALAVRAS</h3>

              {listOfWords.map((word) => {
                return (
                  <p
                    className={`font-bold mb-2 p-2 text-left max-w-xs rounded-md ${
                      word.isCompleted &&
                      'bg-green-400 text-white cursor-pointer'
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
