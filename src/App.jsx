import './App.css'

import {
  Accordion,
  ActionIcon,
  AppShell,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Grid,
  Group,
  NavLink,
  Paper,
  ScrollArea,
  Stack,
  Table,
  Text,
  Title,
} from '@mantine/core'

// Small, inline helper components (keep everything in one file per requirements)
function HeaderStat({ label, value }) {
  return (
    <Stack gap={0}>
      <Text size="xs" c="dimmed">
        {label}
      </Text>
      <Text fw={600} size="sm">
        {value}
      </Text>
    </Stack>
  )
}

function Section({ title, right, children }) {
  return (
    <Stack gap="xs">
      <Group justify="space-between" align="center">
        <Text fw={600}>{title}</Text>
        {right}
      </Group>
      {children}
    </Stack>
  )
}

function App() {
  // Mock data only (no backend)
  const sidebar = [
    { label: 'Dashboard' },
    { label: 'Engagement Details' },
    { label: 'Action Items' },
    { label: 'Docs & Data' },
    { label: 'Questionnaires' },
    { label: 'Internal Meetings' },
    { label: 'Risks', active: true },
    { label: 'Controls' },
    { label: 'Reflect & Standback' },
    { label: 'Tests' },
    { label: 'Delivery' },
  ]

  const risk = {
    code: '13',
    title: 'Business combination disclosures',
    tags: [
      { label: 'ALRMM', color: 'gray' },
      { label: 'Significant', color: 'red' },
      { label: 'Fraud', color: 'orange' },
    ],
    classifications: ['Fraud', 'Unusual transactions'],
    description:
      "Recent high-value acquisitions in new markets bring challenges with accurately valuing unfamiliar assets. Additionally, some acquisitions include contingent liabilities, such as unresolved legal and regulatory issues, which may be difficult to disclose or value properly. The company's global structure, with acquisitions across regions following different accounting standards, increases the risk of incomplete or inconsistent disclosures that could obscure the full financial impact.",
    attributableTo: ['USA', 'Europe', 'Africa'],
    fsaRelationships: [
      { fsa: 'A1 - Intangibles', assertions: ['C', 'E', 'A', 'V', 'P'], active: ['A', 'V'] },
      { fsa: 'L - Consolidation', assertions: ['C', 'E', 'A', 'V', 'P'], active: ['C', 'E', 'A'] },
      { fsa: 'B - Investments', assertions: ['C', 'E', 'A', 'V', 'P'], active: ['C', 'E', 'A'] },
    ],
    businessProcesses: ['Revenue / Order-to-Cash (O2C)', 'Procure-to-Pay (P2P)'],
  }

  return (
    <AppShell
      padding="md"
      header={{ height: 64 }}
      navbar={{ width: 260, breakpoint: 'sm' }}
    >
      {/* Top header bar (product + metadata) */}
      <AppShell.Header>
        <Group
          h="100%"
          px="md"
          justify="space-between"
          style={{
            background: 'var(--mantine-color-dark-8)',
            color: 'var(--mantine-color-gray-0)',
          }}
        >
          <Group gap="md">
            <Group gap="xs">
              <Box
                w={28}
                h={28}
                style={{
                  borderRadius: 6,
                  background: 'var(--mantine-color-gray-0)',
                }}
              />
              <Text fw={700} size="sm">
                BDO
              </Text>
              <Text fw={700} size="sm" c="dimmed">
                APT
              </Text>
            </Group>

            <Divider orientation="vertical" />

            <Group gap="xs">
              <Text size="sm" fw={600}>
                Catalyst Audit 2024
              </Text>
              <Badge color="gray" variant="light" radius="sm">
                ▾
              </Badge>
            </Group>

            <Divider orientation="vertical" />

            <Group gap="xl" visibleFrom="md">
              <HeaderStat label="Materiality" value="20,000,000" />
              <HeaderStat label="Perf. Mat." value="18,000,000" />
              <HeaderStat label="Clearly Trivial" value="1,000,000" />
            </Group>
          </Group>

          <Group gap="sm">
            <Button variant="light" color="gray" size="xs">
              AI Companion
            </Button>
            <ActionIcon variant="subtle" color="gray" aria-label="Notifications">
              <Text size="sm">🔔</Text>
            </ActionIcon>
            <Avatar size={28} radius="xl">
              NS
            </Avatar>
          </Group>
        </Group>
      </AppShell.Header>

      {/* Left sidebar navigation */}
      <AppShell.Navbar p="xs">
        <ScrollArea h="100%" offsetScrollbars>
          <Stack gap="xs">
            {sidebar.map((item) => (
              <NavLink
                key={item.label}
                label={item.label}
                active={item.active}
                variant="subtle"
              />
            ))}
          </Stack>
        </ScrollArea>
      </AppShell.Navbar>

      {/* Main content: two-column layout */}
      <AppShell.Main>
        <Stack gap="md">
          {/* Page title row (breadcrumb + risk title + tags + actions) */}
          <Group justify="space-between" align="flex-start">
            <Stack gap={2}>
              <Text size="xs" c="dimmed">
                RISK HUB /
              </Text>
              <Group gap="sm" align="center">
                <Title order={3}>
                  {risk.code} - {risk.title}
                </Title>
                <Group gap={6}>
                  {risk.tags.map((t) => (
                    <Badge key={t.label} color={t.color} variant="light">
                      {t.label}
                    </Badge>
                  ))}
                </Group>
              </Group>
            </Stack>

            <Group gap="sm">
              <Badge color="violet" variant="light">
                Coach
              </Badge>
              <Button size="sm" variant="filled">
                Edit
              </Button>
              <ActionIcon variant="light" aria-label="More actions">
                <Text>⋮</Text>
              </ActionIcon>
            </Group>
          </Group>

          <Grid gutter="md">
            {/* Left column: risk details */}
            <Grid.Col span={{ base: 12, md: 7 }}>
              <Paper withBorder p="md" radius="md">
                <Stack gap="md">
                  {/* Title + Library */}
                  <Group justify="space-between" align="flex-start">
                    <Stack gap={2}>
                      <Text size="sm" c="dimmed">
                        Title
                      </Text>
                      <Text fw={600}>{risk.title}</Text>
                    </Stack>
                    <Badge color="gray" variant="light">
                      Library
                    </Badge>
                  </Group>

                  <Divider />

                  {/* Risk classifications */}
                  <Section title="Risk classifications">
                    <Group gap="xs">
                      {risk.classifications.map((c) => (
                        <Badge key={c} radius="xl" variant="light">
                          {c}
                        </Badge>
                      ))}
                    </Group>
                  </Section>

                  <Divider />

                  {/* Description */}
                  <Section title="Description">
                    <Text size="sm" c="dimmed">
                      {risk.description}
                    </Text>
                  </Section>

                  <Divider />

                  {/* Attributable to */}
                  <Section title="Attributable to">
                    <Group gap="xs">
                      {risk.attributableTo.map((x) => (
                        <Badge key={x} radius="xl" variant="light" color="gray">
                          {x}
                        </Badge>
                      ))}
                    </Group>
                  </Section>

                  <Divider />

                  {/* FSA Relationships table */}
                  <Section title="FSA Relationships">
                    <Paper withBorder radius="md" p="xs">
                      <Table withRowBorders={false} verticalSpacing="sm">
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
                                <Text size="sm" fw={500}>
                                  {row.fsa}
                                </Text>
                              </Table.Td>
                              <Table.Td>
                                <Group gap={6} wrap="nowrap">
                                  {row.assertions.map((a) => {
                                    const active = row.active.includes(a)
                                    return (
                                      <Badge
                                        key={a}
                                        radius="xl"
                                        size="xs"
                                        variant={active ? 'filled' : 'outline'}
                                        color={active ? 'indigo' : 'gray'}
                                      >
                                        {a}
                                      </Badge>
                                    )
                                  })}
                                </Group>
                              </Table.Td>
                            </Table.Tr>
                          ))}
                        </Table.Tbody>
                      </Table>
                    </Paper>
                  </Section>

                  <Divider />

                  {/* Business Processes */}
                  <Section title="Business Processes">
                    <Group gap="xs">
                      {risk.businessProcesses.map((p) => (
                        <Badge key={p} variant="light" radius="sm" color="blue">
                          {p}
                        </Badge>
                      ))}
                    </Group>
                  </Section>

                  <Divider />

                  {/* Sources */}
                  <Section title="Sources">
                    <Text size="sm" c="blue">
                      Source name
                    </Text>
                  </Section>
                </Stack>
              </Paper>
            </Grid.Col>

            {/* Right column: collapsible sections */}
            <Grid.Col span={{ base: 12, md: 5 }}>
              <Stack gap="md">
                <Paper withBorder radius="md">
                  <Accordion variant="separated" radius="md" defaultValue={null}>
                    <Accordion.Item value="linked">
                      <Accordion.Control>
                        <Text fw={600}>Linked Items</Text>
                      </Accordion.Control>
                      <Accordion.Panel>
                        <Stack gap="xs">
                          <Text size="sm" c="dimmed">
                            Placeholder content for linked risks, controls, tests, or workpapers.
                          </Text>
                          <Group gap="xs">
                            <Badge variant="light">Control: Revenue</Badge>
                            <Badge variant="light">Test: Cutoff</Badge>
                            <Badge variant="light">WP: 3.2</Badge>
                          </Group>
                        </Stack>
                      </Accordion.Panel>
                    </Accordion.Item>

                    <Accordion.Item value="evaluation">
                      <Accordion.Control>
                        <Text fw={600}>Evaluation and Conclusion</Text>
                      </Accordion.Control>
                      <Accordion.Panel>
                        <Text size="sm" c="dimmed">
                          Add narrative around risk assessment, supporting evidence, and conclusion.
                        </Text>
                      </Accordion.Panel>
                    </Accordion.Item>

                    <Accordion.Item value="strategy">
                      <Accordion.Control>
                        <Text fw={600}>Strategy</Text>
                      </Accordion.Control>
                      <Accordion.Panel>
                        <Stack gap="xs">
                          <Text size="sm" c="dimmed">
                            Outline planned audit response (nature, timing, and extent).
                          </Text>
                          <Group gap="xs">
                            <Badge color="teal" variant="light">
                              Substantive
                            </Badge>
                            <Badge color="grape" variant="light">
                              Specialist review
                            </Badge>
                            <Badge color="cyan" variant="light">
                              Analytics
                            </Badge>
                          </Group>
                        </Stack>
                      </Accordion.Panel>
                    </Accordion.Item>
                  </Accordion>
                </Paper>

                {/* Light “utility” rail (visual parity hint) */}
                <Paper withBorder radius="md" p="xs">
                  <Stack gap="xs" align="flex-end">
                    <ActionIcon variant="light" aria-label="Expand">
                      <Text>»</Text>
                    </ActionIcon>
                    <ActionIcon variant="light" aria-label="Search">
                      <Text>⌕</Text>
                    </ActionIcon>
                    <ActionIcon variant="light" aria-label="Refresh">
                      <Text>⟳</Text>
                    </ActionIcon>
                  </Stack>
                </Paper>
              </Stack>
            </Grid.Col>
          </Grid>
        </Stack>
      </AppShell.Main>
    </AppShell>
  )
}

export default App
