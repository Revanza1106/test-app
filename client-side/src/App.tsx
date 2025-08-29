import { useEffect, useState } from "react"
import Home from "./features/home"
import {getProvince,type teritorry} from './service/api'

function App() {
  const [pro,setProp] = useState<teritorry[]>([])
  useEffect(() => {
    getProvince().then(setProp)
  });
  console.log('xxx',pro)
  return (

    <>
      <Home/>

    </>
  )
}

export default App
