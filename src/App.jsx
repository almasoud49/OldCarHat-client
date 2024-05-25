import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './Routes/Router'
import AuthProvider from './Providers/AuthProvider'

function App() {
  

  return (
    <div>
     <AuthProvider>
     <RouterProvider router={router}/>
     </AuthProvider>
    </div>
  )
}

export default App
