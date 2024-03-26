'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import welcome from './welcome.json'
import { Canvas, Layer } from '@/types/Canvas.types'
import { State } from '@/types/types'

const HomeContext = createContext<State<Canvas> | null>(null)
const ShapeModifyContext = createContext<State<Layer | null> | null>(null)

export function useCanvasCtx() {
  const c = useContext(HomeContext)
  if (!c) throw new Error('this Canvas context is not available in this instance')
  return c
}
export function useShapeModifyCtx() {
  const c = useContext(ShapeModifyContext)
  if (!c) throw new Error('this Canvas context is not available in this instance')
  return c
}

export default function Context({ children }: React.PropsWithChildren) {
  const [canvas, setCanvas] = useState(null as unknown as Canvas)
  const [shapeModify, setShapeModify] = useState<Layer | null>(null)
  useEffect(() => {
    const restoreCanvas = JSON.parse(window.localStorage.getItem('canvas') ?? 'null') ?? welcome
    setCanvas(restoreCanvas)
  }, [])
  useEffect(() => {
    if (!canvas) return
    console.log(canvas)
    window.localStorage.setItem('canvas', JSON.stringify(canvas))
  }, [canvas])
  if (!canvas) return <>building component</>
  return (
    <HomeContext.Provider value={[canvas, setCanvas]}>
      <ShapeModifyContext.Provider value={[shapeModify, setShapeModify]}>{children}</ShapeModifyContext.Provider>
    </HomeContext.Provider>
  )
}
