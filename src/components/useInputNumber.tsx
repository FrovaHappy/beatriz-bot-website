import { useEffect, useState } from 'react'
import inputStyle from './Input.module.scss'
import { InputExport } from '@/types/types'
import MaskInput, { OptionsMaskInput } from './MaskInput'
import useSetterTimeOut from './useSetterTimeOut'
type Value = string | null

interface Props extends OptionsMaskInput {
  placeholder?: string
  defaultValue?: `${number}`
  step: number
  min: number
  max: number
}

export default function useInputNumber(props: Props): InputExport<number> {
  const { title, max, min, step, defaultValue = null, placeholder, height, width } = props
  const [value, setValue] = useState<Value>(defaultValue)
  const [valueTimeout, setValueTimeout] = useSetterTimeOut<Value>({ value, setValue, defaultValue })
  const [msgError, setMsgError] = useState<Value>(null)

  const onChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault()
    const m = e.target.value || defaultValue || ''
    const test = Number.parseInt(m) <= max && Number.parseInt(m) >= min
    if (!test) {
      setMsgError(`el numero debe ser mayor a ${min} o menor a ${max}.`)
      return
    }
    if (Number.parseFloat(m) % step !== 0) {
      setMsgError(`el numero debe ser divisible por ${step}.`)
      return
    }
    setMsgError(null)
    setValueTimeout(m)
  }
  const onBlur: React.FocusEventHandler<HTMLInputElement> = e => {
    e.preventDefault()
    if (e.target.value === '') e.target.value = defaultValue || ''
  }
  const Component = (
    <MaskInput options={{ height, title, width }} className={msgError ? inputStyle.error : ''}>
      <input
        className={inputStyle.props}
        type='number'
        step={step}
        min={min}
        max={max}
        value={valueTimeout ?? ''}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
      {msgError ? <span className={inputStyle.error}>{msgError}</span> : undefined}
    </MaskInput>
  )
  return [parseFloat(value ?? ''), Component]
}
