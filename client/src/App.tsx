import Router from "@/routers/router.tsx";
import {QueryClient, QueryClientProvider} from "react-query";
import "./App.css"
import {ConfigProvider} from "antd";
import {Provider} from "react-redux";
import store, {persist} from "@/redux/store.ts";
import { PersistGate } from 'redux-persist/integration/react'
function App() {
  const router = Router()
  const queryClient = new QueryClient()
  return (
      <Provider store={store} >
          <PersistGate loading={null} persistor={persist}>
              <ConfigProvider
                  theme={{
                      token: {
                          colorBorder: "#242526"
                      }
                  }}
              >
                  <QueryClientProvider client={queryClient}>{router}</QueryClientProvider>
              </ConfigProvider>
          </PersistGate>
      </Provider>
  )
}

export default App
