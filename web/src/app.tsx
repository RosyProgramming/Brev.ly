import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/home'
import { Redirect } from './pages/redirect'
import { NotFound } from './pages/notFound'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:shortUrl" element={<Redirect />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
