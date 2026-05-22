
import { createBrowserRouter,  RouterProvider } from 'react-router-dom'
import './App.css'
import PharmaGuide from './Components/pharmaGuidUi'
import Layout from './Routes/Layout'
import HomePage from './Pages/HomePage'
import Login from './Pages/Login'
import DrugSearch from './Pages/DrugSearch'
import DrugAlternative from './Pages/DrugAlternative'

function App() {
  const router = createBrowserRouter([
    {path:"/",
    element:<Layout/>,
    children:[
      {index:true,element:<Login/>},
      {path:"/homepage",element:<HomePage/>},
      {path:"/drugsearch",element:<DrugSearch/>},
      {path:"/drugalternative",element:<DrugAlternative/>}

    ]
  }
  ])

  return (
    <>
      <PharmaGuide/>
      {/* //  <Login/> */}
      <RouterProvider router={router}/>
    </>
  )
}

export default App
