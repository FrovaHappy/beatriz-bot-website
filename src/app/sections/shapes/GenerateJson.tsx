import { useCanvasCtx } from '@/app/context'
import IconAt from '@/app/icons/IconAt'
import Buttons from '@/components/Buttons'
import React, { useEffect } from 'react'

function GenerateJson() {
  const [canvas] = useCanvasCtx()

  const callback = () => {
    console.log('hola')
    const json = JSON.stringify(canvas, null, 2)
    navigator.clipboard.writeText(json)
  }
  const [, Button] = Buttons({
    text: 'Copiar código',
    callback,
    Icon: IconAt
  })

  return (
    <span
      style={{
        position: 'absolute',
        bottom: '25px',
        right: '25px'
      }}>
      {Button}
    </span>
  )
}

export default GenerateJson
