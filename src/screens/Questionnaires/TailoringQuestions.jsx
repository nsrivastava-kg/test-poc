import {
  ActionIcon,
  Button,
  Checkbox,
  Container,
  Divider,
  Grid,
  Group,
  Modal,
  Paper,
  Radio,
  ScrollArea,
  Select,
  Stack,
  Tabs,
  Text,
  Textarea,
  TextInput,
  ThemeIcon,
  Title,
} from '@mantine/core'
import {
  IconChevronRight,
  IconFile,
  IconFileSpreadsheet,
  IconLink,
  IconPlus,
  IconSearch,
  IconSparkles,
  IconUpload,
  IconX,
  IconPaperclip,
  IconLayoutSidebarLeftCollapse,
} from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import { useMemo, useState } from 'react'

import Layout from '../../components/Layout/Layout.jsx'

/**
 * Tailoring Questions screen
 * - Matches the provided reference image at a screen/layout level
 * - Uses Mantine components (no custom CSS)
 * - Uses mock data/placeholders where needed
 */
export default function TailoringQuestions() {
  const pageTitle = 'Understanding the Entity'
  const sectionTitle = 'Industry, regulatory and other external factors'

  // Left in-page sections list (inside the main content area), per reference.
  const sections = [
    {
      id: 'industry',
      label: 'Industry, regulatory and other external factors',
      status: 'active',
    },
    {
      id: 'org',
      label: "Organizational structure, ownership and governance",
      status: 'todo',
    },
    {
      id: 'reporting',
      label: "Financial reporting framework and the entity's accounting policies",
      status: 'todo',
    },
  ]

  return (
    <Layout>
      <Container fluid>
        <Stack gap="md">
          {/* Page header row (inside the page, below global header) */}
          {/* Items labeled "(Not in scope)" in the reference are intentionally omitted here.
              We keep only the title + tabs that frame the questionnaire content. */}
          <Stack gap={2}>
            <Title order={3}>{pageTitle}</Title>

            {/* Tabs under the page title */}
            <Tabs defaultValue="ute" variant="default">
              <Tabs.List>
                <Tabs.Tab value="summary">Summary</Tabs.Tab>
                <Tabs.Tab value="ute">UTE Assessment</Tabs.Tab>
              </Tabs.List>
            </Tabs>
          </Stack>

          <Grid gutter="md" align="flex-start">
            {/* Left: in-page "SECTIONS" navigation */}
            <Grid.Col span={{ base: 12, md: 3 }}>
              <Paper withBorder radius="md" p="sm">
                <Group justify="space-between" mb="xs">
                  <Text size="xs" fw={700} c="dimmed">
                    SECTIONS
                  </Text>
                  <ActionIcon variant="subtle" aria-label="Collapse sections">
                    <IconLayoutSidebarLeftCollapse size={16} />
                  </ActionIcon>
                </Group>

                <Stack gap={6}>
                  {sections.map((s) => (
                    <Paper
                      key={s.id}
                      withBorder={false}
                      radius="sm"
                      p="xs"
                      bg={s.status === 'active' ? 'gray.1' : undefined}
                    >
                      <Group justify="space-between" align="center" gap="sm" wrap="nowrap">
                        <Text size="xs" lineClamp={2}>
                          {s.label}
                        </Text>
                        <StatusDot active={s.status === 'active'} />
                      </Group>
                    </Paper>
                  ))}
                </Stack>
              </Paper>
            </Grid.Col>

            {/* Right: main questionnaire content */}
            <Grid.Col span={{ base: 12, md: 9 }}>
              <Paper withBorder radius="md" p="md">
                {/* Section header block */}
                <Paper radius="md" p="md" bg="gray.0" withBorder={false}>
                  <Title order={4}>{sectionTitle}</Title>
                  <Text size="sm" c="dimmed" mt={4}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.
                  </Text>
                </Paper>

                <Divider my="md" />

                <Stack gap="md">
                  <QuestionBlock
                    number="3.1"
                    text="What is your understanding of the industry/market factors affecting the entity?"
                    type="comment"
                  />
                  <QuestionBlock
                    number="3.2"
                    text="What legal and regulatory rules apply to this client?"
                    type="yesno"
                  />
                  <QuestionBlock
                    number="3.3"
                    text="Are there any laws or regulations that directly affect the numbers or disclosures?"
                    type="table"
                  />
                  <QuestionBlock
                    number="3.4"
                    text="Are there laws or regulations that could impact the financials through penalties or fines?"
                    type="comment"
                  />
                  <QuestionBlock
                    number="3.5"
                    text="Is there any suspected non-compliance with laws or regulations?"
                    type="yesno"
                  />
                  <QuestionBlock
                    number="3.6"
                    text="Understanding of the entity's operations"
                    type="long"
                    helperText={
                      'Describe your understanding of the nature of the entity’s operations, including business risks faced by the entity. For example:\n• Revenue sources;\n• Products or services;\n• Conduct of operations (e.g. methods of production, outsourcing, etc.);\n• Customers and markets;\n• Involvement in electronic commerce/ internet sales or purchases;\n• Research and development activities; and\n• Any new developments in these areas.'
                    }
                  />
                </Stack>
              </Paper>
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>
    </Layout>
  )
}

function StatusDot({ active }) {
  return (
    <ThemeIcon
      size={14}
      radius="xl"
      color={active ? 'blue' : 'gray'}
      variant={active ? 'filled' : 'outline'}
    />
  )
}

function QuestionBlock({ number, text, type, helperText }) {
  // Each question maintains its own referenced files (mock behavior).
  const [referencedFiles, setReferencedFiles] = useState([])

  return (
    <Paper withBorder radius="md" p="md">
      <Stack gap="sm">
        {/* Question header line */}
        <Group justify="space-between" align="flex-start" wrap="nowrap">
          <Group gap={6} align="flex-start">
            <Text size="sm" fw={700}>
              {number}
            </Text>
            <Text size="sm" fw={700}>
              {text}
            </Text>
            {/* Required asterisk appears in the screenshot on some questions; treat as visual placeholder */}
            <Text c="red" fw={700}>
              *
            </Text>
          </Group>

          {/* Right-side icons at the question row (visual parity) */}
          <Group gap={6} wrap="nowrap">
            <ActionIcon variant="subtle" aria-label="Insights">
              <IconSparkles size={16} />
            </ActionIcon>
            <ActionIcon variant="subtle" aria-label="Add">
              <IconPlus size={16} />
            </ActionIcon>
          </Group>
        </Group>

        {helperText ? (
          <Text size="xs" c="dimmed" style={{ whiteSpace: 'pre-line' }}>
            {helperText}
          </Text>
        ) : null}

        {/* AI insights select row (purple tinted) */}
        <Select
          leftSection={<IconSparkles size={14} />}
          data={['AI Insights']}
          value="AI Insights"
          readOnly
          styles={{
            input: {
              background: 'var(--mantine-color-violet-0)',
              borderColor: 'var(--mantine-color-violet-2)',
            },
          }}
        />

        {/* Per-question body controls */}
        {type === 'yesno' ? (
          <Radio.Group>
            <Group gap="xl" mt={2}>
              <Radio value="no" label="No" />
              <Radio value="yes" label="Yes" />
            </Group>
          </Radio.Group>
        ) : null}

        {type === 'table' ? <EditableRowsTable /> : null}

        {/* Comment input (present on all question types in the screenshot) */}
        <Textarea
          placeholder="Comment"
          autosize
          minRows={2}
          rightSection={
            <ActionIcon variant="subtle" aria-label="Clear">
              <IconX size={14} />
            </ActionIcon>
          }
          rightSectionWidth={40}
        />

        {/* Reference a file:
            - Opens a modal (per the screenshot)
            - Supports multiple selections
            - Shows selected file names above the "Reference a file" action */}
        <ReferenceFiles
          value={referencedFiles}
          onChange={setReferencedFiles}
        />
      </Stack>
    </Paper>
  )
}

function EditableRowsTable() {
  // Mock 4 rows like the screenshot.
  const rows = new Array(4).fill(null).map((_, i) => ({ id: i }))

  return (
    <Paper withBorder radius="md" p="sm">
      <Stack gap="xs">
        <Grid gutter="xs" align="center" style={{ fontSize: 12 }}>
          <Grid.Col span={4}>
            <Text size="xs" fw={700} c="dimmed">
              TITLE
            </Text>
          </Grid.Col>
          <Grid.Col span={4}>
            <Text size="xs" fw={700} c="dimmed">
              DROPDOWN
            </Text>
          </Grid.Col>
          <Grid.Col span={4}>
            <Text size="xs" fw={700} c="dimmed">
              NOTES
            </Text>
          </Grid.Col>
        </Grid>

        {rows.map((r) => (
          <Grid key={r.id} gutter="xs" align="center">
            <Grid.Col span={4}>
              <TextInput placeholder="Add Label" />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                placeholder="Label - Optional"
                data={['Label - Optional']}
                allowDeselect
                clearable
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Group gap="xs" wrap="nowrap">
                <TextInput placeholder="" style={{ flex: 1 }} />
                <ActionIcon variant="subtle" aria-label="Remove row">
                  <IconX size={14} />
                </ActionIcon>
              </Group>
            </Grid.Col>
          </Grid>
        ))}

        <Button variant="subtle" size="xs" leftSection={<IconPlus size={14} />}>
          Add Row
        </Button>
      </Stack>
    </Paper>
  )
}

/**
 * ReferenceFiles control:
 * - Renders selected files as small "attachments" just before the action label
 * - Opens a modal that matches the reference image at a layout level
 */
function ReferenceFiles({ value, onChange }) {
  const [opened, { open, close }] = useDisclosure(false)
  const [query, setQuery] = useState('')

  // Modal selection is staged until "Done" is pressed (closer to real UX).
  const [draft, setDraft] = useState(value)

  const suggestedFiles = useMemo(
    () => [
      {
        id: '00.01',
        name: 'Catalyst Inc. - Balance Sheet 2025',
        source: 'Existing document',
        icon: IconFileSpreadsheet,
      },
      {
        id: '00.02',
        name: 'Technology Industry 2025 Report',
        source: 'Global Portal',
        icon: IconFile,
      },
      {
        id: '00.03',
        name: 'September 9th, 2025 Meeting Minutes',
        source: 'Global Portal',
        icon: IconFile,
      },
      {
        id: '00.04',
        name: 'Catalyst Inc. - Balance Sheet 2025',
        source: 'Global Portal',
        icon: IconFileSpreadsheet,
      },
    ],
    [],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return suggestedFiles
    return suggestedFiles.filter((f) => `${f.id} ${f.name} ${f.source}`.toLowerCase().includes(q))
  }, [query, suggestedFiles])

  const toggle = (file) => {
    setDraft((prev) => {
      const exists = prev.some((x) => x.id === file.id && x.name === file.name && x.source === file.source)
      if (exists) return prev.filter((x) => !(x.id === file.id && x.name === file.name && x.source === file.source))
      return [...prev, file]
    })
  }

  const remove = (file) => {
    onChange(value.filter((x) => !(x.id === file.id && x.name === file.name && x.source === file.source)))
  }

  return (
    <>
      <Stack gap={6}>
        {/* Selected files appear just before the action label (as in the screenshot) */}
        {value.length > 0 ? (
          <Stack gap={6}>
            {value.map((f) => (
              <Group key={`${f.id}-${f.name}-${f.source}`} gap={6} wrap="nowrap">
                <ThemeIcon size={18} radius="xl" variant="light" color="gray">
                  <IconPaperclip size={12} />
                </ThemeIcon>
                <Text size="xs" lineClamp={1} style={{ flex: 1 }}>
                  {f.name}
                </Text>
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  size="sm"
                  aria-label="Remove referenced file"
                  onClick={() => remove(f)}
                >
                  <IconX size={14} />
                </ActionIcon>
              </Group>
            ))}
          </Stack>
        ) : null}

        <Button
          variant="subtle"
          size="xs"
          leftSection={<IconPaperclip size={14} />}
          onClick={() => {
            setDraft(value)
            setQuery('')
            open()
          }}
          styles={{ root: { justifyContent: 'flex-start', paddingLeft: 0 } }}
        >
          Reference a file
        </Button>
      </Stack>

      <Modal
        opened={opened}
        onClose={close}
        size="xl"
        radius="md"
        centered
        title={null}
        overlayProps={{ opacity: 0.55, blur: 1 }}
      >
        <Grid gutter="md">
          {/* Left "menu" column */}
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Stack gap="sm">
              <TextInput
                value={query}
                onChange={(e) => setQuery(e.currentTarget.value)}
                placeholder="Search menu"
                leftSection={<IconSearch size={16} />}
              />

              <MenuRow icon={IconLink} label="Link from existing documents" />
              <MenuRow icon={IconChevronRight} label="Add from Global Portal" rightChevron />
              <MenuRow icon={IconUpload} label="Upload a document" />
            </Stack>
          </Grid.Col>

          {/* Right empty area in the reference (kept blank for parity) */}
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Paper radius="md" withBorder={false} bg="transparent" style={{ minHeight: 120 }} />
          </Grid.Col>
        </Grid>

        <Divider my="md" />

        <Text size="xs" fw={700} c="dimmed" mb="xs">
          SUGGESTED FILES
        </Text>

        <ScrollArea h={220}>
          <Stack gap={6}>
            {filtered.map((f) => {
              const selected = draft.some((x) => x.id === f.id && x.name === f.name && x.source === f.source)
              const Icon = f.icon
              return (
                <Paper
                  key={`${f.id}-${f.name}-${f.source}`}
                  withBorder
                  radius="md"
                  p="sm"
                  onClick={() => toggle(f)}
                  style={{
                    cursor: 'pointer',
                    background: selected ? 'var(--mantine-color-gray-0)' : undefined,
                  }}
                >
                  <Group justify="space-between" wrap="nowrap">
                    <Group gap="sm" wrap="nowrap">
                      <Checkbox checked={selected} readOnly />
                      <ThemeIcon size={26} radius="sm" variant="light" color="green">
                        <Icon size={16} />
                      </ThemeIcon>
                      <Group gap={8} wrap="nowrap">
                        <Text size="sm" fw={700}>
                          {f.id}
                        </Text>
                        <Text size="sm" lineClamp={1}>
                          {f.name}
                        </Text>
                      </Group>
                    </Group>

                    <Text size="sm" c="dimmed">
                      {f.source}
                    </Text>
                  </Group>
                </Paper>
              )
            })}
          </Stack>
        </ScrollArea>

        <Group justify="flex-end" mt="md">
          <Button
            variant="default"
            onClick={() => {
              setDraft(value)
              close()
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onChange(draft)
              close()
            }}
          >
            Done
          </Button>
        </Group>
      </Modal>
    </>
  )
}

function MenuRow({ icon: Icon, label, rightChevron = false }) {
  return (
    <Paper withBorder radius="md" p="sm">
      <Group justify="space-between" wrap="nowrap">
        <Group gap="sm" wrap="nowrap">
          <ThemeIcon size={26} radius="sm" variant="light" color="gray">
            <Icon size={16} />
          </ThemeIcon>
          <Text size="sm">{label}</Text>
        </Group>
        {rightChevron ? (
          <ThemeIcon size={18} radius="xl" variant="subtle" color="gray">
            <IconChevronRight size={14} />
          </ThemeIcon>
        ) : null}
      </Group>
    </Paper>
  )
}

