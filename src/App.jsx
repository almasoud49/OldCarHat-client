import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './Routes/Router'
import AuthProvider from './Providers/AuthProvider'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

function App() {
  

  return (
    <div>
     <AuthProvider>
     <QueryClientProvider client={queryClient}>
     <RouterProvider router={router}/>
     </QueryClientProvider>
     </AuthProvider>
    </div>
  )
}

export default App
