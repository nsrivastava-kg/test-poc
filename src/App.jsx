import { Center, Text } from '@mantine/core'
import { Route, Routes } from 'react-router-dom'

import Layout from './components/Layout/Layout.jsx'
import Risks from './screens/Risks/Risks.jsx'

export default function App() {
  return (
    <Routes>
      {/* Homepage: Layout wrapping a centered placeholder */}
      <Route
        path="/"
        element={
          <Layout>
            <Center mih="calc(100dvh - 56px)">
              <Text fw={600}>This is the homepage</Text>
            </Center>
          </Layout>
        }
      />

      {/* Risks route: renders the screen component (which wraps itself in Layout) */}
      <Route path="/risks" element={<Risks />} />
    </Routes>
  )
}
