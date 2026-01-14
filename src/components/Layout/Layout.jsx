import {
  AppShell,
  ActionIcon,
  Avatar,
  Badge,
  Burger,
  Group,
  NavLink,
  ScrollArea,
  Stack,
  Switch,
  Text,
  Tooltip,
  UnstyledButton,
  rem,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Link, useLocation } from 'react-router-dom'
import {
  IconBell,
  IconClipboardList,
  IconDashboard,
  IconFileText,
  IconGauge,
  IconHelp,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconListCheck,
  IconShield,
  IconStack,
  IconUsers,
} from '@tabler/icons-react'

/**
 * Reusable application layout:
 * - Collapsible sidebar (Mantine AppShell.Navbar)
 * - Header (Mantine AppShell.Header)
 * - Main content area renders `children`
 *
 * This component is intentionally "app-wide" and shared across screens.
 */
export default function Layout({ children }) {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  // Mobile burger controls showing/hiding the navbar.
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure(false)
  // Desktop collapse keeps the navbar but reduces it to an icon rail.
  const [desktopCollapsed, { toggle: toggleDesktop }] = useDisclosure(false)

  const navWidth = desktopCollapsed ? 72 : 260

  // Helper: simple "startsWith" active matching for grouped routes.
  const isIn = (prefix) => location.pathname === prefix || location.pathname.startsWith(`${prefix}/`)
  const selectedTailoringSub = searchParams.get('sub')

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: navWidth,
        breakpoint: 'sm',
        // Important: keep the navbar VISIBLE on desktop even when "collapsed".
        // We implement desktop collapse as a narrow icon rail (via `navWidth`),
        // not by hiding the navbar entirely.
        collapsed: { mobile: !mobileOpened },
      }}
    >
      <AppShell.Header
        style={{
          background:
            'linear-gradient(90deg, #0B1220 0%, #111A2D 50%, #0B1220 100%)',
        }}
      >
        <Group h="100%" px="md" justify="space-between">
          <Group gap="sm">
            {/* Mobile burger for opening the sidebar */}
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
              color="white"
              aria-label="Toggle navigation"
            />

            {/* Desktop collapse/expand */}
            <UnstyledButton
              onClick={toggleDesktop}
              visibleFrom="sm"
              aria-label="Collapse sidebar"
              style={{ color: 'white' }}
            >
              {desktopCollapsed ? (
                <IconLayoutSidebarLeftExpand size={18} />
              ) : (
                <IconLayoutSidebarLeftCollapse size={18} />
              )}
            </UnstyledButton>

            <Group gap={8}>
              <Text fw={800} c="white" style={{ letterSpacing: 0.3 }}>
                BDO
              </Text>
              <Text fw={700} c="gray.2">
                APT
              </Text>
              <Text c="gray.4" size="sm">
                Catalyst Audit 2024
              </Text>
            </Group>
          </Group>

          {/* Header KPIs (mock values to match reference layout) */}
          <Group gap="xl" visibleFrom="md">
            <Kpi label="Materiality" value="20,000,000" />
            <Kpi label="Perf. Mat." value="18,000,000" />
            <Kpi label="Clearly Trivial" value="1,000,000" />
          </Group>

          {/* Right-side header controls */}
          <Group gap="sm">
            <Badge
              variant="light"
              color="gray"
              radius="xl"
              styles={{ label: { color: 'white' } }}
              style={{ background: 'rgba(255,255,255,0.10)' }}
            >
              AI Companion
            </Badge>
            <Badge
              variant="light"
              color="gray"
              radius="xl"
              styles={{ label: { color: 'white' } }}
              style={{ background: 'rgba(255,255,255,0.10)' }}
            >
              ⌘ K
            </Badge>
            <ActionIcon
              variant="subtle"
              color="gray"
              aria-label="Notifications"
              styles={{ root: { color: 'white' } }}
            >
              <IconBell size={16} />
            </ActionIcon>
            <Avatar size={28} radius="xl" />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="sm">
        <ScrollArea h={`calc(100vh - ${rem(60)} - ${rem(16)})`}>
      {/* Sidebar behavior requirements:
          - Collapsed (desktop): icons only (no labels)
          - Expanded: show labels and dropdown groups (e.g., Questionnaires) */}
          {desktopCollapsed ? (
            <StackedIconRail currentPath={location.pathname} />
          ) : (
            <StackedExpandedNav
              currentPath={location.pathname}
              selectedTailoringSub={selectedTailoringSub}
              isIn={isIn}
            />
          )}
        </ScrollArea>

        {/* Footer-ish controls in sidebar */}
        {!desktopCollapsed && (
          <Group justify="space-between" mt="sm">
            <Text size="xs" c="dimmed">
              Coach
            </Text>
            <Switch size="sm" />
          </Group>
        )}
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}

function Kpi({ label, value }) {
  return (
    <Group gap={6}>
      <Text size="xs" c="gray.3">
        {label}
      </Text>
      <Text size="sm" c="white" fw={700}>
        {value}
      </Text>
    </Group>
  )
}

/**
 * Collapsed sidebar: show icon-only buttons for top-level navigation.
 * This matches the requirement that collapsed state shows icons (and not labels).
 */
function StackedIconRail({ currentPath }) {
  const items = [
    { label: 'Dashboard', icon: IconDashboard, to: '/' },
    { label: 'Engagement Details', icon: IconUsers, to: '/engagement' },
    { label: 'Action Items', icon: IconListCheck, to: '/action-items' },
    { label: 'Docs & Data', icon: IconFileText, to: '/docs' },
    // For dropdown groups, route to a sensible default screen.
    { label: 'Questionnaires', icon: IconClipboardList, to: '/questionnaires/tailoring' },
    { label: 'Internal Meetings', icon: IconStack, to: '/meetings' },
    { label: 'Risks', icon: IconShield, to: '/risks' },
    { label: 'Controls', icon: IconGauge, to: '/controls' },
    { label: 'Reflect & Standback', icon: IconHelp, to: '/reflect' },
    { label: 'Tests', icon: IconListCheck, to: '/tests' },
    { label: 'Delivery', icon: IconStack, to: '/delivery' },
  ]

  return (
    <Stack gap={6}>
      {items.map((it) => {
        const Icon = it.icon
        const active = currentPath === it.to || currentPath.startsWith(`${it.to}/`)
        return (
          <Tooltip key={it.label} label={it.label} position="right" withArrow>
            <ActionIcon
              component={Link}
              to={it.to}
              variant={active ? 'light' : 'subtle'}
              color={active ? 'blue' : 'gray'}
              size="lg"
              radius="md"
              aria-label={it.label}
            >
              <Icon size={20} />
            </ActionIcon>
          </Tooltip>
        )
      })}
    </Stack>
  )
}

/**
 * Expanded sidebar: show labels and dropdown groups using nested NavLinks.
 * Questionnaires matches the screenshot: dropdown with items (Tailoring Questions is NOT a nested dropdown).
 */
function StackedExpandedNav({ currentPath, selectedTailoringSub, isIn }) {
  return (
    <>
      <NavLink
        component={Link}
        to="/"
        label="Dashboard"
        leftSection={<IconDashboard size={18} />}
        active={currentPath === '/'}
        variant="light"
        styles={{ root: { borderRadius: 8 }, label: { whiteSpace: 'nowrap' } }}
      />

      <NavLink
        component={Link}
        to="/engagement"
        label="Engagement Details"
        leftSection={<IconUsers size={18} />}
        active={isIn('/engagement')}
        variant="light"
        styles={{ root: { borderRadius: 8 }, label: { whiteSpace: 'nowrap' } }}
      />

      <NavLink
        component={Link}
        to="/action-items"
        label="Action Items"
        leftSection={<IconListCheck size={18} />}
        active={isIn('/action-items')}
        variant="light"
        styles={{ root: { borderRadius: 8 }, label: { whiteSpace: 'nowrap' } }}
      />

      <NavLink
        component={Link}
        to="/docs"
        label="Docs & Data"
        leftSection={<IconFileText size={18} />}
        active={isIn('/docs')}
        variant="light"
        styles={{ root: { borderRadius: 8 }, label: { whiteSpace: 'nowrap' } }}
      />

      {/* Dropdown group: Questionnaires */}
      <NavLink
        label="Questionnaires"
        leftSection={<IconClipboardList size={18} />}
        defaultOpened={isIn('/questionnaires')}
        active={isIn('/questionnaires')}
        variant="light"
        styles={{ root: { borderRadius: 8 }, label: { whiteSpace: 'nowrap' } }}
      >
        <NavLink
          component={Link}
          to="/questionnaires/tailoring"
          label="Tailoring Questions"
          active={isIn('/questionnaires/tailoring') && !selectedTailoringSub}
          variant="light"
          styles={{ root: { borderRadius: 8 } }}
        />

        {/* These are items of the Questionnaires dropdown (not nested under Tailoring Questions) */}
        <NavLink
          component={Link}
          to="/questionnaires/tailoring?sub=materiality"
          label="Materiality"
          active={isIn('/questionnaires/tailoring') && selectedTailoringSub === 'materiality'}
          variant="light"
          styles={{ root: { borderRadius: 8 } }}
        />
        <NavLink
          component={Link}
          to="/questionnaires/tailoring?sub=etd"
          label="ETD"
          active={isIn('/questionnaires/tailoring') && selectedTailoringSub === 'etd'}
          variant="light"
          styles={{ root: { borderRadius: 8 } }}
        />
        <NavLink
          component={Link}
          to="/questionnaires/tailoring?sub=lorem-1"
          label="Lorem ipsum"
          active={isIn('/questionnaires/tailoring') && selectedTailoringSub === 'lorem-1'}
          variant="light"
          styles={{ root: { borderRadius: 8 } }}
        />
        <NavLink
          component={Link}
          to="/questionnaires/tailoring?sub=lorem-2"
          label="Lorem ipsum"
          active={isIn('/questionnaires/tailoring') && selectedTailoringSub === 'lorem-2'}
          variant="light"
          styles={{ root: { borderRadius: 8 } }}
        />
      </NavLink>

      <NavLink
        component={Link}
        to="/meetings"
        label="Internal Meetings"
        leftSection={<IconStack size={18} />}
        active={isIn('/meetings')}
        variant="light"
        styles={{ root: { borderRadius: 8 }, label: { whiteSpace: 'nowrap' } }}
      />

      <NavLink
        component={Link}
        to="/risks"
        label="Risks"
        leftSection={<IconShield size={18} />}
        active={isIn('/risks')}
        variant="light"
        styles={{ root: { borderRadius: 8 }, label: { whiteSpace: 'nowrap' } }}
      />

      <NavLink
        component={Link}
        to="/controls"
        label="Controls"
        leftSection={<IconGauge size={18} />}
        active={isIn('/controls')}
        variant="light"
        styles={{ root: { borderRadius: 8 }, label: { whiteSpace: 'nowrap' } }}
      />

      <NavLink
        component={Link}
        to="/reflect"
        label="Reflect & Standback"
        leftSection={<IconHelp size={18} />}
        active={isIn('/reflect')}
        variant="light"
        styles={{ root: { borderRadius: 8 }, label: { whiteSpace: 'nowrap' } }}
      />

      <NavLink
        component={Link}
        to="/tests"
        label="Tests"
        leftSection={<IconListCheck size={18} />}
        active={isIn('/tests')}
        variant="light"
        styles={{ root: { borderRadius: 8 }, label: { whiteSpace: 'nowrap' } }}
      />

      <NavLink
        component={Link}
        to="/delivery"
        label="Delivery"
        leftSection={<IconStack size={18} />}
        active={isIn('/delivery')}
        variant="light"
        styles={{ root: { borderRadius: 8 }, label: { whiteSpace: 'nowrap' } }}
      />
    </>
  )
}
