import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/routes'
import { Toaster } from 'react-hot-toast';

function App() {
  return(
    <div>
      <RouterProvider router={router} />
      <Toaster/>
    </div>
  )
}

export default App
