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
  Tooltip,
} from '@mantine/core'
import {
  IconBell,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconCirclesRelation,
  IconClipboardText,
  IconDashboard,
  IconDatabase,
  IconDotsVertical,
  IconFileText,
  IconMessageCircleQuestion,
  IconNotes,
  IconRefresh,
  IconSearch,
  IconSettings,
  IconShield,
  IconSparkles,
  IconTestPipe,
  IconTruckDelivery,
  IconUsers,
} from '@tabler/icons-react'
import { Link, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

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

function HomePage() {
  // Keep the App page content same as before (Vite starter screen)
  const [count, setCount] = useState(0)

  return (
    <div className="homeRoot">
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((c) => c + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        <p>
          Visit <Link to="/risks">/risks</Link> to view the Risk Details screen.
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </div>
  )
}

function RiskDetailsScreen() {
  // Mock data only (no backend)
  const sidebar = [
    { label: 'Dashboard', icon: IconDashboard },
    { label: 'Engagement Details', icon: IconUsers },
    { label: 'Action Items', icon: IconNotes },
    { label: 'Docs & Data', icon: IconDatabase },
    { label: 'Questionnaires', icon: IconMessageCircleQuestion },
    { label: 'Internal Meetings', icon: IconClipboardText },
    { label: 'Risks', active: true, icon: IconShield },
    { label: 'Controls', icon: IconSettings },
    { label: 'Reflect & Standback', icon: IconFileText },
    { label: 'Tests', icon: IconTestPipe },
    { label: 'Delivery', icon: IconTruckDelivery },
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

  // Collapsible side nav: expanded shows icons + labels, collapsed shows only icons
  const [navCollapsed, setNavCollapsed] = useState(false)
  const navbarWidth = navCollapsed ? 76 : 260

  return (
    <AppShell
      padding="md"
      header={{ height: 64 }}
      navbar={{ width: navbarWidth, breakpoint: 'sm' }}
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
              <ActionIcon variant="subtle" color="gray" aria-label="Select engagement">
                <IconChevronDown size={16} />
              </ActionIcon>
            </Group>

            <Divider orientation="vertical" />

            <Group gap="xl" visibleFrom="md">
              <HeaderStat label="Materiality" value="20,000,000" />
              <HeaderStat label="Perf. Mat." value="18,000,000" />
              <HeaderStat label="Clearly Trivial" value="1,000,000" />
            </Group>
          </Group>

          <Group gap="sm">
            <Button
              variant="light"
              color="gray"
              size="xs"
              leftSection={<IconSparkles size={16} />}
            >
              AI Companion
            </Button>
            <ActionIcon variant="subtle" color="gray" aria-label="Notifications">
              <IconBell size={18} />
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
            {/* Sidebar collapse control */}
            <Group justify={navCollapsed ? 'center' : 'space-between'} mb="xs">
              {!navCollapsed && (
                <Text size="xs" fw={600} c="dimmed">
                  Navigation
                </Text>
              )}
              <Tooltip label={navCollapsed ? 'Expand' : 'Collapse'} position="right">
                <ActionIcon
                  variant="light"
                  aria-label={navCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                  onClick={() => setNavCollapsed((v) => !v)}
                >
                  {navCollapsed ? <IconChevronRight size={18} /> : <IconChevronLeft size={18} />}
                </ActionIcon>
              </Tooltip>
            </Group>

            {sidebar.map((item) => (
              <Tooltip
                key={item.label}
                label={navCollapsed ? item.label : undefined}
                position="right"
                disabled={!navCollapsed}
              >
                <NavLink
                  label={navCollapsed ? null : item.label}
                  active={item.active}
                  variant="subtle"
                  leftSection={<item.icon size={18} />}
                  style={navCollapsed ? { justifyContent: 'center' } : undefined}
                />
              </Tooltip>
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
                <IconDotsVertical size={18} />
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
                        <Group gap="xs">
                          <IconCirclesRelation size={18} />
                          <Text fw={600}>Linked Items</Text>
                        </Group>
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
                        <Group gap="xs">
                          <IconFileText size={18} />
                          <Text fw={600}>Evaluation and Conclusion</Text>
                        </Group>
                      </Accordion.Control>
                      <Accordion.Panel>
                        <Text size="sm" c="dimmed">
                          Add narrative around risk assessment, supporting evidence, and conclusion.
                        </Text>
                      </Accordion.Panel>
                    </Accordion.Item>

                    <Accordion.Item value="strategy">
                      <Accordion.Control>
                        <Group gap="xs">
                          <IconShield size={18} />
                          <Text fw={600}>Strategy</Text>
                        </Group>
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
              </Stack>
            </Grid.Col>
          </Grid>
        </Stack>
      </AppShell.Main>
    </AppShell>
  )
}

export default function App() {
  return (
    <Routes>
      {/* Keep the original App page at root */}
      <Route path="/" element={<HomePage />} />

      {/* New Risk Details screen */}
      <Route path="/risks" element={<RiskDetailsScreen />} />
    </Routes>
  )
}
