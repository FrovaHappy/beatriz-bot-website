/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react'
import inputStyle from './Input.module.scss'
import MaskInput, { OptionsMaskInput } from './MaskInput'
import useSetterTimeOut from './useSetterTimeOut'
type Value = string | null
type Reg = {
  regex: RegExp
  msg: string
}
export interface TextInputProps extends OptionsMaskInput {
  placeholder?: string
  defaultValue?: string
  regexArray: Reg[]
}
export default function useInputText(props: TextInputProps) {
  const { title, regexArray, defaultValue, placeholder, height, width } = props

  const [value, setValue] = useState<Value>(defaultValue || null)
  const [valueTimeout, setValueTimeout] = useSetterTimeOut<Value>({
    value,
    setValue,
    defaultValue: defaultValue || null
  })
  const [msgError, setMsgError] = useState<Value>(null)

  const onChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault()
    const m = e.target.value || ''

    for (const r of regexArray) {
      const test = r.regex.test(m)
      if (test) continue
      setMsgError(r.msg)
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
        type='text'
        value={valueTimeout ?? ''}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />

      {msgError ? <span className={inputStyle.error}>{msgError}</span> : undefined}
    </MaskInput>
  )
  return [value, Component] as [value: Value, select: JSX.Element]
}
