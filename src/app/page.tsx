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
import Confettis from '@/components/Confettis'
import { TypeAnimation } from 'react-type-animation'

export default function Home() {
  const confettisRef = useRef<any>()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [isReady, setIsReady] = useState(false)
  const [modalData, setModalData] = useState({
    word: '',
    description: '',
  })
  const [showFireworks, setShowFireworks] = useState(false)
  const { listOfWords, newCompletedWord, setNewCompletedWord } =
    useListOfWords()

  const wordsList: any[] = [
    { word: 'ECA', wordId: 1 },
    { word: 'ISTS', wordId: 2 },
    { word: 'HPV', wordId: 3 },
    { word: 'SIFILIS', wordId: 4 },
    { word: 'SEXUALIDADE', wordId: 5 },
    { word: 'SAUDE', wordId: 6 },
    { word: 'CONSENTIMENTO', wordId: 7 },
    { word: 'PRESERVATIVO', wordId: 8 },
    { word: 'GENERO', wordId: 9 },
    { word: 'PUBERDADE', wordId: 10 },
  ]

  function handleIsReady() {
    setIsReady(!isReady)
  }

  useMemo(() => {
    if (!isOpen) {
      setShowFireworks(false)
    }
  }, [onOpenChange])

  useEffect(() => {
    if (newCompletedWord.word !== '') {
      const listWordsCompleted = listOfWords.filter((word) => {
        return word.isCompleted === true
      })

      if (listOfWords.length === listWordsCompleted.length) {
        setShowFireworks(true)
        confettisRef?.current?.startAnimation()
      }
      onOpen()
      setModalData(newCompletedWord)
      setNewCompletedWord({
        word: '',
        description: '',
      })
    }
  }, [newCompletedWord])

  return (
    <>
      <Header />

      <Confettis ref={confettisRef} />

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {showFireworks
                  ? 'Parabéns você completou o desafio!!'
                  : modalData.word}
              </ModalHeader>
              <ModalBody>
                <p>{modalData.description}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={() => {
                    confettisRef?.current?.stopAnimation()
                    onClose()
                  }}
                >
                  Entendi
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {!isReady ? (
        <div className="w-[100%] min-h-[300px] p-10 flex flex-col items-center justify-center">
          <TypeAnimation
            className="flex items-center justify-center text-3xl"
            sequence={[
              'Oi, tudo bem?!',
              800,
              'Preparei uma lista de palavras especial para você!',
              1500,
              'Está preparado para esse desafio?',
              1500,
            ]}
            wrapper="div"
            speed={50}
            repeat={0}
            deletionSpeed={70}
          />

          <Button className="mt-10" onClick={handleIsReady} color="success">
            Vamos lá!
          </Button>
        </div>
      ) : (
        <div className="w-[100%] min-h-[300px] p-10 flex-col items-center">
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
      )}
    </>
  )
}
