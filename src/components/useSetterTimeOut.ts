/* eslint-disable react-hooks/exhaustive-deps */
import { State } from '@/types/types'
import { useEffect, useState } from 'react'

interface Props<T> {
  time?: number
  value: T
  setValue(value: T): void
  deps?: any[]
}
export default function useSetterTimeOut<T = any>({ value, setValue, time = 100, deps = [] }: Props<T>) {
  const [controller, setController] = useState<T>(value)
  useEffect(() => {
    const resolve = setTimeout(() => {
      setValue(controller)
    }, time)
    return () => {
      clearTimeout(resolve)
    }
  }, [controller, ...deps])
  return [controller, setController] as State<T>
}
