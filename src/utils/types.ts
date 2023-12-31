export type Mode = 'horizontal' | 'vertical' | 'diagonal' | 'reversed'

export type Point = [number, number]

export interface Direction {
  direction: Point
  modes: Mode[]
}

export const UP: Direction = {
  direction: [0, -1],
  modes: ['reversed', 'vertical'],
}

export const DOWN: Direction = {
  direction: [0, 1],
  modes: ['vertical'],
}

export const LEFT: Direction = {
  direction: [-1, 0],
  modes: ['reversed', 'horizontal'],
}

export const LEFT_UP: Direction = {
  direction: [-1, -1],
  modes: ['reversed', 'diagonal'],
}

export const LEFT_DOWN: Direction = {
  direction: [-1, 1],
  modes: ['reversed', 'diagonal'],
}

export const RIGHT: Direction = {
  direction: [1, 0],
  modes: ['horizontal'],
}

export const RIGHT_UP: Direction = {
  direction: [1, -1],
  modes: ['diagonal'],
}

export const RIGHT_DOWN: Direction = {
  direction: [1, 1],
  modes: ['diagonal'],
}

export interface WordProps {
  word: string
  wordId: number
}

export interface GridProps {
  words: WordProps[]
  size: number
  modes: Mode[]
  debug?: boolean
  highlightWords?: boolean
}

export interface Letter {
  char: string
  wordId: number
  isWord: boolean
}

export type Table = Letter[][]

export interface VerifyLetter {
  isCorrect: boolean
  isWord: boolean
  wordId: number
  char: string
}

export type TableVerify = VerifyLetter[][]

export interface WordCompletedProps {
  wordId: number
  isCompleted?: boolean
}
