import { Center, Text } from '@mantine/core'
import Layout from '../../components/Layout/Layout.jsx'

/**
 * Risks screen (placeholder)
 * - Routed at `/risks`
 * - Uses `Layout` as the wrapper, per requirements
 */
export default function Risks() {
  return (
    <Layout>
      {/* Centered placeholder content */}
      <Center mih="calc(100dvh - 56px)">
        <Text fw={600}>This is the Risks page</Text>
      </Center>
    </Layout>
  )
}

