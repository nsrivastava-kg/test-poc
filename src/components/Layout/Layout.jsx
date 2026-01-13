import {
  AppShell,
  Avatar,
  Badge,
  Burger,
  Button,
  Group,
  NavLink,
  ScrollArea,
  Switch,
  Text,
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

  // Mobile burger controls showing/hiding the navbar.
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure(false)
  // Desktop collapse keeps the navbar but reduces it to an icon rail.
  const [desktopCollapsed, { toggle: toggleDesktop }] = useDisclosure(false)

  const navWidth = desktopCollapsed ? 72 : 260

  const navItems = [
    { label: 'Dashboard', icon: IconDashboard, to: '/' },
    { label: 'Engagement Details', icon: IconUsers, to: '/engagement' },
    { label: 'Action Items', icon: IconListCheck, to: '/action-items' },
    { label: 'Docs & Data', icon: IconFileText, to: '/docs' },
    { label: 'Questionnaires', icon: IconClipboardList, to: '/questionnaires' },
    { label: 'Internal Meetings', icon: IconStack, to: '/meetings' },
    { label: 'Risks', icon: IconShield, to: '/risks' },
    { label: 'Controls', icon: IconGauge, to: '/controls' },
    { label: 'Reflect & Standback', icon: IconHelp, to: '/reflect' },
    { label: 'Tests', icon: IconListCheck, to: '/tests' },
    { label: 'Delivery', icon: IconStack, to: '/delivery' },
  ]

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: navWidth,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: desktopCollapsed },
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
            <Button
              variant="default"
              size="xs"
              radius="xl"
              styles={{
                root: {
                  background: 'rgba(255,255,255,0.10)',
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.20)',
                },
              }}
            >
              ⌘ K
            </Button>
            <Button
              variant="subtle"
              color="gray"
              size="xs"
              styles={{ root: { color: 'white' } }}
              leftSection={<IconBell size={16} />}
            >
              {/* icon only in reference; text omitted intentionally */}
            </Button>
            <Avatar size={28} radius="xl" />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="sm">
        <ScrollArea h={`calc(100vh - ${rem(60)} - ${rem(16)})`}>
          {navItems.map((item) => {
            const active = location.pathname === item.to
            const Icon = item.icon
            return (
              <NavLink
                key={item.label}
                component={Link}
                to={item.to}
                label={desktopCollapsed ? undefined : item.label}
                leftSection={<Icon size={18} />}
                active={active}
                variant="light"
                styles={{
                  root: {
                    borderRadius: 8,
                    paddingLeft: desktopCollapsed ? rem(10) : undefined,
                  },
                  label: { whiteSpace: 'nowrap' },
                }}
              />
            )
          })}
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
