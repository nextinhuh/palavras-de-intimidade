'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface ListOfWordsContextData {
  listOfWords: { word: string; isCompleted: boolean; wordId: number }[]
  setListOfWords: (
    listOfWords: { word: string; isCompleted: boolean; wordId: number }[],
  ) => void
  newCompletedWord: { word: string; description: string }
  setNewCompletedWord: (newWord: { word: string; description: string }) => void
}

interface ListOfWordsProviderProps {
  children?: any
}

const ListOfWordsContext = createContext<ListOfWordsContextData>(
  {} as ListOfWordsContextData,
)

export function ListOfWordsProvider({ children }: ListOfWordsProviderProps) {
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true)
  const [newCompletedWord, setNewCompletedWord] = useState({
    word: '',
    description: '',
  })
  const [prevListOfWords, setPrevListOfWords] = useState([
    {
      word: 'ECA',
      isCompleted: false,
      wordId: 1,
      description:
        'O Estatuto da Criança e do Adolescente, Lei Federal nº 8.069, de 13 de julho de 1990, define as crianças e os adolescentes como sujeitos de direitos, em condição vulnerável de desenvolvimento, que precisam de proteção integral e prioritária por parte da família, sociedade e do Estado (BRASIL, 2021).',
    },
    {
      word: 'ISTS',
      isCompleted: false,
      wordId: 2,
      description:
        'As Infecções Sexualmente Transmissíveis (ISTs) são causadas por vírus, bactérias ou outros microrganismos. Elas são transmitidas, principalmente, por meio do contato sexual (oral, vaginal, anal) sem o uso de camisinha masculina ou feminina, com uma pessoa que esteja infectada (BRASIL, 2023).',
    },
    {
      word: 'HPV',
      isCompleted: false,
      wordId: 3,
      description:
        'O HPV (sigla em inglês para Papilomavírus Humano) é um vírus que infecta pele ou mucosas (oral, genital ou anal), tanto de homens quanto de mulheres, provocando verrugas anogenitais (região genital e no ânus) e câncer, a depender do tipo de vírus (BRASIL, 2023). Existe vacina contra o HPV, está disponível de forma gratuita no SUS.',
    },
    {
      word: 'SÍFILIS',
      isCompleted: false,
      wordId: 4,
      description:
        'É uma doença infecciosa causada pela bactéria Treponema pallidum. A sífilis manifesta-se inicialmente como uma pequena ferida nos órgãos sexuais (cancro duro) e com ínguas (caroços) nas virilhas, que surgem entre a 2ª ou 3ª semana após a relação sexual desprotegida com pessoa infectada. A ferida e as ínguas não doem, não coçam, não ardem e não apresentam pus. Após um certo tempo, a ferida desaparece sem deixar cicatriz, dando à pessoa a falsa impressão de estar curada. Se a doença não for tratada, continua a avançar no organismo, surgindo manchas em várias partes do corpo (inclusive nas palmas das mãos e solas dos pés), queda de cabelos, cegueira, doença do coração, paralisias. Caso ocorra em grávidas, poderá causar aborto/natimorto ou má formação do feto (BRASIL, 2023).',
    },
    {
      word: 'SEXUALIDADE',
      isCompleted: false,
      wordId: 5,
      description:
        'diz respeito a com quem alguém se relaciona. Uma pessoa pode se relacionar apenas com indivíduos do mesmo sexo, sendo considerada homossexual, ou se relacionar com pessoas do sexo oposto, sendo heterossexual, e, até mesmo, se relacionar com ambos, neste caso, bissexual (UNICEF, 2023).',
    },
    {
      word: 'SAUDE',
      isCompleted: false,
      wordId: 6,
      description:
        'A Organização Mundial de Saúde (OMS) define saúde como “um estado de completo bem-estar físico, mental e social e não somente ausência de afecções e enfermidades”.',
    },
    {
      word: 'CONSENTIMENTO',
      isCompleted: false,
      wordId: 7,
      description:
        'É um substantivo masculino que expressa a ação de consentir, e significa dar permissão ou licença para que determinado ato seja praticado.',
    },
    {
      word: 'PRESERVATIVO',
      isCompleted: false,
      wordId: 8,
      description:
        'O preservativo ou camisinha é uma capa de borracha (látex) que, ao ser colocada, evita a transmissão de infecções sexualmente transmissíveis (IST) e do vírus causador da aids, o HIV. A camisinha pode também evitar a gravidez, agindo assim como um eficiente método contraceptivo (BRASIL, 2008).',
    },
    {
      word: 'GÊNERO',
      isCompleted: false,
      wordId: 9,
      description:
        'O conceito de identidade de gênero está atrelado ao relacionamento da pessoa com seu próprio corpo. Existem pessoas que nascem biologicamente mulheres, por exemplo, mas não se identificam com esse gênero desde a infância, o que gera um conflito interno (UNCEF, 2023).',
    },
    {
      word: 'PUBERDADE',
      isCompleted: false,
      wordId: 10,
      description:
        'É um processo de transformações corporais, fundamental, que acontece na adolescência, para que deixemos de ter formas de criança e passemos a ter formas de adulto (UNICAM, 2023).',
    },
  ])
  const [listOfWords, setListOfWords] = useState([
    { word: 'ECA', isCompleted: false, wordId: 1 },
    { word: 'ISTS', isCompleted: false, wordId: 2 },
    { word: 'HPV', isCompleted: false, wordId: 3 },
    { word: 'SIFILIS', isCompleted: false, wordId: 4 },
    { word: 'SEXUALIDADE', isCompleted: false, wordId: 5 },
    { word: 'SADÚDE', isCompleted: false, wordId: 6 },
    { word: 'CONSENTIMENTO', isCompleted: false, wordId: 7 },
    { word: 'PRESERVATIVO', isCompleted: false, wordId: 8 },
    { word: 'GÊNERO', isCompleted: false, wordId: 9 },
    { word: 'PUBERDADE', isCompleted: false, wordId: 10 },
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
              setNewCompletedWord({
                word: prevWord.word,
                description: prevWord.description,
              })
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
