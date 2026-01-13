import {
  Accordion,
  ActionIcon,
  Affix,
  Anchor,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  Container,
  Divider,
  Grid,
  Group,
  Paper,
  Stack,
  Switch,
  Table,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core'
import {
  IconArrowLeft,
  IconChevronRight,
  IconDotsVertical,
  IconEdit,
  IconRefresh,
  IconSearch,
  IconSparkles,
} from '@tabler/icons-react'

import Layout from '../../components/Layout/Layout.jsx'

/**
 * Risks screen: Risk Details page.
 * - Uses Mantine components for all layout/controls
 * - Uses mock data and aims for screen-level visual parity with the reference image
 * - Wrapped with the shared `Layout` (sidebar + header) so it looks like a real app page
 */
export default function Risks() {
  // Mock data to match the reference page content.
  const risk = {
    id: 13,
    title: 'Business combination disclosures',
    tags: ['ALRMM', 'Significant', 'Fraud'],
    classifications: ['Fraud', 'Unusual transactions'],
    description:
      "Recent high-value acquisitions in new markets bring challenges with accurately valuing unfamiliar assets. Additionally, some acquisitions include contingent liabilities, such as unresolved legal and regulatory issues, which may be difficult to disclose or value properly. The company’s global structure, with acquisitions across regions following different accounting standards, increases the risk of incomplete or inconsistent disclosures that could obscure the full financial impact.",
    attributableTo: ['USA', 'Europe', 'Africa'],
    fsaRelationships: [
      { fsa: 'A1 - Intangibles', active: ['A', 'V'] },
      { fsa: 'L - Consolidation', active: ['C', 'E', 'A'] },
      { fsa: 'B - Investments', active: ['C', 'E', 'A'] },
    ],
    businessProcesses: ['Revenue / Order-to-Cash (O2C)', 'Procure-to-Pay (P2P)'],
    sources: [{ label: 'Source name', href: '#' }],
  }

  return (
    <Layout>
      <Container fluid>
        <Stack gap="md">
          {/* Top header area inside the page body (separate from the global App header) */}
          <Group justify="space-between" align="flex-start">
            <Group gap="sm">
              <ActionIcon variant="subtle" aria-label="Back">
                <IconArrowLeft size={18} />
              </ActionIcon>

              <Stack gap={2}>
                <Breadcrumbs separator="/">
                  <Text size="xs" c="dimmed">
                    RISK HUB
                  </Text>
                  <Text size="xs" c="dimmed">
                    {risk.id} - {risk.title}
                  </Text>
                </Breadcrumbs>

                <Group gap="sm" align="center">
                  <Title order={3}>
                    {risk.id} - {risk.title}
                  </Title>
                  <Group gap={6}>
                    {risk.tags.map((t) => (
                      <Badge
                        key={t}
                        variant="light"
                        color={t === 'Fraud' ? 'orange' : t === 'Significant' ? 'red' : 'gray'}
                      >
                        {t}
                      </Badge>
                    ))}
                  </Group>
                </Group>
              </Stack>
            </Group>

            <Group gap="sm">
              <Group gap={8}>
                <IconSparkles size={16} />
                <Text size="sm" fw={600}>
                  Coach
                </Text>
                <Switch size="sm" />
              </Group>

              <Button leftSection={<IconEdit size={16} />} variant="filled">
                Edit
              </Button>

              <ActionIcon variant="subtle" aria-label="More actions">
                <IconDotsVertical size={18} />
              </ActionIcon>
            </Group>
          </Group>

          {/* Main content area: left details card + right accordion panels */}
          <Grid gutter="md" align="flex-start">
            <Grid.Col span={{ base: 12, md: 5 }}>
              <Paper withBorder radius="md" p="md">
                <Stack gap="md">
                  <KeyValueRow label="Title" rightHint="Library">
                    <Text fw={600}>{risk.title}</Text>
                  </KeyValueRow>

                  <Divider />

                  <Stack gap={6}>
                    <Text size="sm" fw={700}>
                      Risk classifications
                    </Text>
                    <Group gap={8}>
                      {risk.classifications.map((c) => (
                        <Badge key={c} variant="light" color="gray">
                          {c}
                        </Badge>
                      ))}
                    </Group>
                  </Stack>

                  <Divider />

                  <Stack gap={6}>
                    <Text size="sm" fw={700}>
                      Description
                    </Text>
                    <Text size="sm" c="dimmed">
                      {risk.description}
                    </Text>
                  </Stack>

                  <Divider />

                  <Stack gap={6}>
                    <Text size="sm" fw={700}>
                      Attributable to
                    </Text>
                    <Group gap={8}>
                      {risk.attributableTo.map((region) => (
                        <Badge key={region} variant="light" color="blue">
                          {region}
                        </Badge>
                      ))}
                    </Group>
                  </Stack>

                  <Divider />

                  <Stack gap="xs">
                    <Text size="sm" fw={700}>
                      FSA Relationships
                    </Text>

                    <Table withTableBorder withColumnBorders highlightOnHover>
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th>FSA</Table.Th>
                          <Table.Th>Assertions</Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>
                        {risk.fsaRelationships.map((row) => (
                          <Table.Tr key={row.fsa}>
                            <Table.Td>
                              <Text size="sm">{row.fsa}</Text>
                            </Table.Td>
                            <Table.Td>
                              <Assertions active={row.active} />
                            </Table.Td>
                          </Table.Tr>
                        ))}
                      </Table.Tbody>
                    </Table>
                  </Stack>

                  <Divider />

                  <Stack gap={6}>
                    <Text size="sm" fw={700}>
                      Business Processes
                    </Text>
                    <Group gap={8}>
                      {risk.businessProcesses.map((bp) => (
                        <Badge key={bp} variant="light" color="blue">
                          {bp}
                        </Badge>
                      ))}
                    </Group>
                  </Stack>

                  <Divider />

                  <Stack gap={6}>
                    <Text size="sm" fw={700}>
                      Sources
                    </Text>
                    <Stack gap={4}>
                      {risk.sources.map((s) => (
                        <Anchor key={s.label} href={s.href} size="sm">
                          {s.label}
                        </Anchor>
                      ))}
                    </Stack>
                  </Stack>
                </Stack>
              </Paper>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 7 }}>
              <Stack gap="md">
                <Accordion variant="contained" radius="md" defaultValue="linked-items">
                  <Accordion.Item value="linked-items">
                    <Accordion.Control>Linked Items</Accordion.Control>
                    <Accordion.Panel>
                      <Text size="sm" c="dimmed">
                        Placeholder content: linked procedures, controls, tests, and documents would
                        appear here.
                      </Text>
                    </Accordion.Panel>
                  </Accordion.Item>

                  <Accordion.Item value="evaluation">
                    <Accordion.Control>Evaluation and Conclusion</Accordion.Control>
                    <Accordion.Panel>
                      <Stack gap="xs">
                        <Text size="sm" fw={600}>
                          Summary
                        </Text>
                        <Text size="sm" c="dimmed">
                          Placeholder content: auditor evaluation notes, conclusion rationale, and
                          evidence links.
                        </Text>
                      </Stack>
                    </Accordion.Panel>
                  </Accordion.Item>

                  <Accordion.Item value="strategy">
                    <Accordion.Control>Strategy</Accordion.Control>
                    <Accordion.Panel>
                      <Stack gap="xs">
                        <Text size="sm" fw={600}>
                          Planned response
                        </Text>
                        <Text size="sm" c="dimmed">
                          Placeholder content: risk response strategy, planned procedures, and
                          resourcing.
                        </Text>
                      </Stack>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>

                {/* Subtle right-column filler to keep parity with the open space in the reference */}
                <Paper withBorder radius="md" p="md">
                  <Group justify="space-between" align="center">
                    <Text fw={600}>Notes</Text>
                    <Badge variant="light" color="gray">
                      Mock
                    </Badge>
                  </Group>
                  <Text size="sm" c="dimmed" mt="xs">
                    Add supporting notes, questions, and next steps here (placeholder).
                  </Text>
                </Paper>
              </Stack>
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>

      {/* Floating right-side utility toolbar (matches the reference’s side icons at a screen level) */}
      <Affix position={{ top: 140, right: 16 }}>
        <Paper withBorder radius="md" p={6}>
          <Stack gap={6}>
            <ActionIcon variant="light" aria-label="Expand">
              <IconChevronRight size={18} />
            </ActionIcon>
            <ActionIcon variant="light" aria-label="Search">
              <IconSearch size={18} />
            </ActionIcon>
            <ActionIcon variant="light" aria-label="Refresh">
              <IconRefresh size={18} />
            </ActionIcon>
          </Stack>
        </Paper>
      </Affix>
    </Layout>
  )
}

function KeyValueRow({ label, rightHint, children }) {
  return (
    <Group justify="space-between" align="flex-start">
      <Stack gap={4}>
        <Text size="sm" fw={700}>
          {label}
        </Text>
        {children}
      </Stack>
      {rightHint ? (
        <Badge variant="light" color="gray">
          {rightHint}
        </Badge>
      ) : null}
    </Group>
  )
}

/**
 * Assertions badges shown as circular "letter pills".
 * Active letters are filled blue, inactive are light/gray, matching the reference behavior.
 */
function Assertions({ active }) {
  const letters = ['C', 'E', 'A', 'V', 'P']
  return (
    <Group gap={6} wrap="nowrap">
      {letters.map((l) => {
        const isActive = active.includes(l)
        return (
          <ThemeIcon
            key={l}
            size={22}
            radius="xl"
            color={isActive ? 'blue' : 'gray'}
            variant={isActive ? 'filled' : 'light'}
          >
            <Text size="xs" fw={800}>
              {l}
            </Text>
          </ThemeIcon>
        )
      })}
    </Group>
  )
}

