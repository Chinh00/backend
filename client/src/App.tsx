import {BrowserRouter} from "react-router-dom";
import Router from "@/routers/router.tsx";


function App() {
  const router = Router()

  return (
      <>{router}</>
  )
}

export default App
