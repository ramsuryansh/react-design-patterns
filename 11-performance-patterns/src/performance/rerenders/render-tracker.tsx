/* eslint-disable react-hooks/refs */
import { useRef } from 'react'

function RenderTracker() {
  const renders = useRef<number>(0)
  renders.current++

  return <p>Rendered: {renders.current} times</p>
}

export default RenderTracker
