import { Route, Routes } from "react-router-dom"
import { privateRoutes, publicRoutes } from "./routes"
import PrivateRoutes from "./components/PrivateRoutes"
import Dashboard from "./layout/Dashboard"
import Empty from "./layout/Empty"
import Toast from "./components/Toast"

function App() {
  return (
    <div className="font-poppins bg-body min-h-screen">
      <Routes>
        <Route>
          {publicRoutes.map((route, index) => {
            const Page = route.component
  
            return <Route path={route.path} element={<Empty><Page /></Empty>} key={index} />
          })}
        </Route>
        <Route element={<PrivateRoutes />}>
          {privateRoutes.map((route, index) => {
            const Page = route.component
  
            return <Route path={route.path} element={<Dashboard><Page /></Dashboard>} key={index} />
          })}
        </Route>
      </Routes>
      <Toast />
    </div>
  )
}

export default App
