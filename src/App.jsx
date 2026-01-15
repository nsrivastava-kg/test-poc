import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Button, Container, Group, Paper, Stack, Text, Title } from '@mantine/core'
import { Link } from 'react-router-dom'

import Layout from './components/Layout/Layout.jsx'
import Risks, { RiskDetails } from './screens/Risks/Risks.jsx'
import TailoringQuestions from './screens/Questionnaires/TailoringQuestions.jsx'

function Home() {
  return (
    <Layout>
      <Container size="lg">
        <Stack gap="md">
          <Title order={2}>This is the homepage</Title>
          <Text c="dimmed">
            Routing is set up with react-router-dom v6. The <code>/risks</code>{' '}
            route opens the Risk Hub and uses the same shared layout.
          </Text>

          <Paper withBorder p="md" radius="md">
            <Group justify="space-between">
              <Text fw={600}>Open the Risk Hub</Text>
              <Button component={Link} to="/risks">
                Go to /risks
              </Button>
            </Group>
          </Paper>
        </Stack>
      </Container>
    </Layout>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Keep routing simple; add more routes later as needed */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/risks" element={<Risks />} />
        <Route path="/risks/:riskId" element={<RiskDetails />} />
        <Route path="/questionnaires/tailoring" element={<TailoringQuestions />} />
      </Routes>
    </BrowserRouter>
  )
}

