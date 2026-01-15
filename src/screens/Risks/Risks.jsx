import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Group,
  Menu,
  Pill,
  Progress,
  ScrollArea,
  Stack,
  Table,
  Tabs,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from '@mantine/core'
import {
  IconArrowLeft,
  IconCheck,
  IconChevronDown,
  IconCircleDashed,
  IconChevronRight,
  IconDotsVertical,
  IconEdit,
  IconInfoCircle,
  IconMinus,
  IconPlus,
  IconSearch,
  IconTrendingDown,
  IconTrendingUp,
  IconRefresh,
  IconSparkles,
} from '@tabler/icons-react'
import { BarChart } from '@mantine/charts'
import { useMemo } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'

import Layout from '../../components/Layout/Layout.jsx'
import { mockRisks, RISK_HUB_TABS } from '../../data/risks.js'

/**
 * Risks screen: Risk Hub (default landing) + Risk Details (route: /risks/:riskId)
 * - Risk Hub: Overview + Assessment tabs matching the provided screenshots
 * - Risk Details: keeps the existing mock detail layout (moved into RiskDetails export)
 */
export default function Risks() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tab = searchParams.get('tab') ?? RISK_HUB_TABS.OVERVIEW
  const safeTab =
    tab === RISK_HUB_TABS.OVERVIEW || tab === RISK_HUB_TABS.ASSESSMENT ? tab : RISK_HUB_TABS.OVERVIEW

  const setTab = (next) => {
    const p = new URLSearchParams(searchParams)
    p.set('tab', next)
    setSearchParams(p, { replace: true })
  }

  return (
    <Layout>
      <Container fluid>
        <Stack gap="md">
          <Group justify="space-between" align="flex-start">
            <Title order={3}>Risk Hub</Title>
            <Group gap="sm">
              <Button variant="default">Sign Off</Button>
              <Button>Save &amp; Close</Button>
              <ActionIcon variant="subtle" aria-label="More">
                <IconDotsVertical size={18} />
              </ActionIcon>
            </Group>
          </Group>

          <Tabs value={safeTab} onChange={(v) => setTab(v ?? RISK_HUB_TABS.OVERVIEW)}>
            <Tabs.List>
              <Tabs.Tab value={RISK_HUB_TABS.OVERVIEW}>Overview</Tabs.Tab>
              <Tabs.Tab value={RISK_HUB_TABS.ASSESSMENT}>Assessment</Tabs.Tab>
              <Tabs.Tab value="suggestions" disabled>
                Risk Suggestions Queue (6)
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value={RISK_HUB_TABS.OVERVIEW} pt="md">
              <RiskHubOverview />
            </Tabs.Panel>
            <Tabs.Panel value={RISK_HUB_TABS.ASSESSMENT} pt="md">
              <RiskHubAssessment />
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Container>
    </Layout>
  )
}

function RiskHubOverview() {
  const totalRisks = 100
  const significantRisks = 20
  const noLinkedControls = 16
  const incompleteRisks = { conclusions: 37, strategies: 53 }

  return (
    <Stack gap="md">
      <Grid gutter="sm">
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Card withBorder radius="md" p="md">
            <Stack gap={6}>
              <Group gap={6} wrap="nowrap">
                <Text size="sm" fw={700}>
                  Total Risks Identified
                </Text>
                <ActionIcon variant="subtle" size="xs" aria-label="Info">
                  <IconInfoCircle size={14} />
                </ActionIcon>
              </Group>
              <Group gap="sm" align="baseline">
                <Text size="lg" fw={800}>
                  {totalRisks}
                </Text>
                <Group gap={6} c="red">
                  <IconTrendingUp size={14} />
                  <Text size="xs" c="red">
                    23 Risks from Previous Year
                  </Text>
                </Group>
              </Group>
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Card withBorder radius="md" p="md">
            <Stack gap={6}>
              <Group gap={6} wrap="nowrap">
                <Text size="sm" fw={700}>
                  Significant Risks
                </Text>
                <ActionIcon variant="subtle" size="xs" aria-label="Info">
                  <IconInfoCircle size={14} />
                </ActionIcon>
              </Group>
              <Group gap="sm" align="baseline">
                <Text size="lg" fw={800}>
                  {significantRisks}
                </Text>
                <Group gap={6} c="green">
                  <IconTrendingDown size={14} />
                  <Text size="xs" c="green">
                    10 Risk from Previous Year
                  </Text>
                </Group>
              </Group>
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Card withBorder radius="md" p="md">
            <Stack gap={6}>
              <Group gap={6} wrap="nowrap">
                <Text size="sm" fw={700}>
                  Risks without linked controls
                </Text>
                <ActionIcon variant="subtle" size="xs" aria-label="Info">
                  <IconInfoCircle size={14} />
                </ActionIcon>
              </Group>
              <Text size="lg" fw={800}>
                {noLinkedControls}
              </Text>
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Card withBorder radius="md" p="md">
            <Stack gap={6}>
              <Group gap={6} wrap="nowrap">
                <Text size="sm" fw={700}>
                  Incomplete Risks
                </Text>
                <ActionIcon variant="subtle" size="xs" aria-label="Info">
                  <IconInfoCircle size={14} />
                </ActionIcon>
              </Group>
              <Text size="lg" fw={800}>
                {incompleteRisks.conclusions} Conclusions | {incompleteRisks.strategies} Strategies
              </Text>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>

      <Group justify="space-between" align="center" wrap="nowrap">
        <Group gap="sm" wrap="wrap">
          <Button variant="default" leftSection={<IconPlus size={14} />} rightSection={<IconChevronDown size={14} />}>
            Add Filter
          </Button>
          <Pill withRemoveButton onRemove={() => {}} radius="xl">
            FSA: Revenue
          </Pill>
          <Pill withRemoveButton onRemove={() => {}} radius="xl">
            Component: Canada, Germany
          </Pill>
        </Group>
        <TextInput
          placeholder="Search"
          leftSection={<IconSearch size={16} />}
          style={{ maxWidth: 360, width: '100%' }}
        />
      </Group>

      <Card withBorder radius="md" p="md">
        <Group justify="space-between" align="center" wrap="nowrap">
          <Group gap={8} wrap="nowrap">
            <ActionIcon variant="subtle" aria-label="Expand">
              <IconChevronRight size={16} />
            </ActionIcon>
            <Text fw={700}>Overall Risk Documentation Score</Text>
            <ActionIcon variant="subtle" size="xs" aria-label="Info">
              <IconInfoCircle size={14} />
            </ActionIcon>
          </Group>

          <Group gap="md" wrap="nowrap" style={{ minWidth: 520 }}>
            <Progress value={62} color="orange" radius="xl" w={220} />
            <Text size="xs" fw={700} c="dimmed">
              62% SATISFACTORY RATING
            </Text>
            <ActionIcon variant="subtle" aria-label="More">
              <IconDotsVertical size={16} />
            </ActionIcon>
          </Group>
        </Group>

        <Divider my="sm" />

        <ScrollArea>
          <Table highlightOnHover verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>RISK ID</Table.Th>
                <Table.Th>RISK TITLE</Table.Th>
                <Table.Th>FSA/ASSERTION</Table.Th>
                <Table.Th>RISK TYPE</Table.Th>
                <Table.Th>CONCLUSION</Table.Th>
                <Table.Th>REQ. INFORMATION</Table.Th>
                <Table.Th>TEST PLANNING</Table.Th>
                <Table.Th style={{ width: 40 }} />
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {mockRisks.map((r, idx) => (
                <Table.Tr key={r.id}>
                  <Table.Td>
                    <Text component={Link} to={`/risks/${encodeURIComponent(r.id)}`} size="sm" fw={600} c="dark">
                      {r.id}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Group gap={8} wrap="nowrap">
                      {idx % 3 === 0 ? (
                        <Badge variant="light" color="violet" radius="xl">
                          (6)
                        </Badge>
                      ) : null}
                      <Text size="sm">{r.title}</Text>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    {r.fsaAssertion === 'N/A' ? (
                      <Text size="sm" c="dimmed">
                        N/A
                      </Text>
                    ) : (
                      <Group gap={6} wrap="nowrap">
                        <Badge variant="light" color="blue" radius="sm">
                          A1 • V
                        </Badge>
                        <Badge variant="light" color="blue" radius="sm">
                          T • C
                        </Badge>
                      </Group>
                    )}
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">{r.riskType}</Text>
                  </Table.Td>
                  <Table.Td>
                    <ConclusionBadge value={r.conclusion} />
                  </Table.Td>
                  <Table.Td>
                    <CenterIcon ok={r.requiredInformation} />
                  </Table.Td>
                  <Table.Td>
                    <TestPlanningIcon value={r.testPlanning} />
                  </Table.Td>
                  <Table.Td>
                    <ActionIcon variant="subtle" aria-label="Row menu">
                      <IconDotsVertical size={16} />
                    </ActionIcon>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Card>
    </Stack>
  )
}

function RiskHubAssessment() {
  const chartData = useMemo(() => {
    // Create 10 “FSA” buckets like the screenshot.
    const base = Array.from({ length: 10 }).map((_, i) => {
      const r = mockRisks[i % mockRisks.length]
      return {
        name: 'FSA',
        significant: r.composition.significant,
        higher: r.composition.higher,
        lower: r.composition.lower,
      }
    })
    return base
  }, [])

  return (
    <Stack gap="md">
      <Group justify="space-between" align="center" wrap="nowrap">
        <Group gap="sm" wrap="wrap">
          <Button variant="default" leftSection={<IconPlus size={14} />} rightSection={<IconChevronDown size={14} />}>
            Add Filter
          </Button>
          <Pill withRemoveButton onRemove={() => {}} radius="xl">
            Component: Canada
          </Pill>
          <Pill withRemoveButton onRemove={() => {}} radius="xl">
            Risk Type: RAFIT, FSLR
          </Pill>
          <Pill withRemoveButton onRemove={() => {}} radius="xl">
            Conclusion: Significant
          </Pill>
        </Group>
        <TextInput
          placeholder="Search"
          leftSection={<IconSearch size={16} />}
          style={{ maxWidth: 360, width: '100%' }}
        />
      </Group>

      <Card withBorder radius="md" p="md">
        <Group gap={8} wrap="nowrap" mb="xs">
          <ActionIcon variant="subtle" aria-label="Expand">
            <IconChevronDown size={16} />
          </ActionIcon>
          <Text fw={700}>Risk Composition</Text>
          <ActionIcon variant="subtle" size="xs" aria-label="Info">
            <IconInfoCircle size={14} />
          </ActionIcon>
        </Group>

        <Grid gutter="md" align="center">
          <Grid.Col span={{ base: 12, md: 9 }}>
            <BarChart
              h={220}
              data={chartData}
              dataKey="name"
              series={[
                { name: 'significant', color: 'pink.5', stackId: 'a' },
                { name: 'higher', color: 'yellow.5', stackId: 'a' },
                { name: 'lower', color: 'green.4', stackId: 'a' },
              ]}
              tickLine="x"
              gridAxis="none"
              withLegend={false}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 3 }}>
            <Card withBorder radius="md" p="sm">
              <Stack gap={10}>
                <LegendItem color="pink.5" label="Significant" />
                <LegendItem color="yellow.5" label="Higher" />
                <LegendItem color="green.4" label="Lower" />
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Card>

      <Card withBorder radius="md" p="md">
        <ScrollArea>
          <Table highlightOnHover verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>RISK</Table.Th>
                <Table.Th>FSA/ASSERTION</Table.Th>
                <Table.Th>FSLR</Table.Th>
                <Table.Th>COMPONENT</Table.Th>
                <Table.Th>CONCLUSION</Table.Th>
                <Table.Th>COMPLEXITY</Table.Th>
                <Table.Th>SUBJECTIVITY</Table.Th>
                <Table.Th>UNCERTAINTY</Table.Th>
                <Table.Th>MANAGEMENT</Table.Th>
                <Table.Th>CHANGE</Table.Th>
                <Table.Th>VOLUME</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {mockRisks.map((r) => (
                <Table.Tr key={`assess-${r.id}`}>
                  <Table.Td>
                    <Text component={Link} to={`/risks/${encodeURIComponent(r.id)}`} size="sm">
                      {r.id} - Risks title lorem ipsum long title
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Group gap={6} wrap="nowrap">
                      <Badge variant="light" color="blue" radius="sm">
                        B • A C
                      </Badge>
                      <Badge variant="light" color="blue" radius="sm">
                        A1 • C
                      </Badge>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Badge variant="light" color="gray" radius="sm">
                      {r.fslr}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">{r.component}</Text>
                  </Table.Td>
                  <Table.Td>
                    <ConclusionBadge value="Significant" />
                  </Table.Td>
                  <Table.Td style={riskCellStyle(r.assessment.complexity)}>{r.assessment.complexity}</Table.Td>
                  <Table.Td style={riskCellStyle(r.assessment.subjectivity)}>{r.assessment.subjectivity}</Table.Td>
                  <Table.Td style={riskCellStyle(r.assessment.uncertainty)}>{r.assessment.uncertainty}</Table.Td>
                  <Table.Td style={riskCellStyle(r.assessment.management)}>{r.assessment.management}</Table.Td>
                  <Table.Td style={riskCellStyle(r.assessment.change)}>{r.assessment.change}</Table.Td>
                  <Table.Td style={riskCellStyle(r.assessment.volume)}>{r.assessment.volume}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Card>
    </Stack>
  )
}

function LegendItem({ color, label }) {
  return (
    <Group justify="space-between" wrap="nowrap">
      <Group gap="xs" wrap="nowrap">
        <ThemeIcon size={10} radius="xl" color={color} variant="filled" />
        <Text size="sm">{label}</Text>
      </Group>
      <Text size="sm" fw={700} c="dimmed">
        ## Risks Identified
      </Text>
    </Group>
  )
}

function ConclusionBadge({ value }) {
  const { color, variant } = (() => {
    if (value === 'Significant') return { color: 'red', variant: 'light' }
    if (value === 'Higher') return { color: 'orange', variant: 'light' }
    if (value === 'Lower') return { color: 'green', variant: 'light' }
    return { color: 'gray', variant: 'light' }
  })()
  return (
    <Badge color={color} variant={variant} radius="sm">
      {value}
    </Badge>
  )
}

function CenterIcon({ ok }) {
  return (
    <Group justify="center">
      <ThemeIcon size={18} radius="xl" color={ok ? 'green' : 'gray'} variant={ok ? 'filled' : 'light'}>
        {ok ? <IconCheck size={12} /> : <IconMinus size={12} />}
      </ThemeIcon>
    </Group>
  )
}

function TestPlanningIcon({ value }) {
  if (value === 'complete') {
    return (
      <Group justify="center">
        <ThemeIcon size={18} radius="xl" color="green" variant="filled">
          <IconCheck size={12} />
        </ThemeIcon>
      </Group>
    )
  }
  if (value === 'partial') {
    return (
      <Group justify="center">
        <ThemeIcon size={18} radius="xl" color="gray" variant="light">
          <IconCircleDashed size={12} />
        </ThemeIcon>
      </Group>
    )
  }
  return (
    <Group justify="center">
      <ThemeIcon size={18} radius="xl" color="gray" variant="light">
        <IconMinus size={12} />
      </ThemeIcon>
    </Group>
  )
}

function riskCellStyle(value) {
  if (value === 'Low')
    return {
      background: 'var(--mantine-color-green-0)',
      color: 'var(--mantine-color-dark-7)',
      fontWeight: 600,
    }
  if (value === 'Medium')
    return {
      background: 'var(--mantine-color-yellow-0)',
      color: 'var(--mantine-color-dark-7)',
      fontWeight: 600,
    }
  if (value === 'High')
    return {
      background: 'var(--mantine-color-red-0)',
      color: 'var(--mantine-color-dark-7)',
      fontWeight: 600,
    }
  return undefined
}

export function RiskDetails() {
  const navigate = useNavigate()
  const { riskId } = useParams()

  // Existing mock detail content retained (now routed under /risks/:riskId).
  const risk = {
    id: riskId ?? '13',
    title:
      mockRisks.find((r) => r.id === riskId)?.title ?? 'Business combination disclosures',
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
          <Group justify="space-between" align="flex-start">
            <Group gap="sm">
              <ActionIcon variant="subtle" aria-label="Back" onClick={() => navigate(-1)}>
                <IconArrowLeft size={18} />
              </ActionIcon>

              <Stack gap={2}>
                <Text size="xs" c="dimmed">
                  RISK HUB
                </Text>

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
              </Group>

              <Button leftSection={<IconEdit size={16} />} variant="filled">
                Edit
              </Button>

              <Menu withinPortal position="bottom-end" shadow="md">
                <Menu.Target>
                  <ActionIcon variant="subtle" aria-label="More actions">
                    <IconDotsVertical size={18} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item leftSection={<IconRefresh size={16} />}>Refresh</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Group>

          <Grid gutter="md" align="flex-start">
            <Grid.Col span={{ base: 12, md: 5 }}>
              <Card withBorder radius="md" p="md">
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
                        <Text key={s.label} size="sm" c="blue">
                          {s.label}
                        </Text>
                      ))}
                    </Stack>
                  </Stack>
                </Stack>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 7 }}>
              <Stack gap="md">
                <Card withBorder radius="md" p="md">
                  <Text fw={700}>Linked Items</Text>
                  <Text size="sm" c="dimmed" mt="xs">
                    Placeholder content: linked procedures, controls, tests, and documents would appear here.
                  </Text>
                </Card>
                <Card withBorder radius="md" p="md">
                  <Text fw={700}>Evaluation and Conclusion</Text>
                  <Text size="sm" c="dimmed" mt="xs">
                    Placeholder content: auditor evaluation notes, conclusion rationale, and evidence links.
                  </Text>
                </Card>
                <Card withBorder radius="md" p="md">
                  <Text fw={700}>Strategy</Text>
                  <Text size="sm" c="dimmed" mt="xs">
                    Placeholder content: risk response strategy, planned procedures, and resourcing.
                  </Text>
                </Card>
              </Stack>
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>
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

function Assertions({ active }) {
  const letters = ['C', 'E', 'A', 'V', 'P']
  return (
    <Group gap={6} wrap="nowrap">
      {letters.map((l) => {
        const isActive = active.includes(l)
        return (
          <ThemeIcon key={l} size={22} radius="xl" color={isActive ? 'blue' : 'gray'} variant={isActive ? 'filled' : 'light'}>
            <Text size="xs" fw={800}>
              {l}
            </Text>
          </ThemeIcon>
        )
      })}
    </Group>
  )
}

