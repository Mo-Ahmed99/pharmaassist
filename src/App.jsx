
import { createBrowserRouter,  RouterProvider } from 'react-router-dom'
import './App.css'
import PharmaGuide from './Components/pharmaGuidUi'
import Layout from './Routes/Layout'
import HomePage from './Pages/HomePage'
import DrugSearch from './Pages/DrugSearch'
import DrugAlternative from './Pages/DrugAlternative'

function App() {
  const router = createBrowserRouter([
    {path:"/",
    element:<Layout/>,
    children:[
      {index:true,element:<HomePage/>},
      {path:"/drugsearch",element:<DrugSearch/>},
      {path:"/drugalternative",element:<DrugAlternative/>}
      
    ]
  }
  ])

  return (
    <>
      {/* <PharmaGuide/> */}
      <RouterProvider router={router}/>
    </>
  )
}

export default App
