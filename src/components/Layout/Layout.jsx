import { AppShell, Box, Burger, Group } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { useState } from 'react'

/**
 * Layout
 * - Collapsible sidebar using Mantine AppShell.Navbar (Navbar area)
 * - Header using Mantine AppShell.Header (Header area)
 * - Renders `children` inside the main content area
 *
 * NOTE: Per requirements, this component intentionally does NOT render
 * nav items, branding, page titles, etc. yet — it only provides structure.
 */
export default function Layout({ children }) {
  // Mobile "open / close" state for the navbar
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure(false)

  // Desktop "collapsed / expanded" width state for the navbar
  const [desktopCollapsed, setDesktopCollapsed] = useState(false)

  // Keep responsive behavior simple:
  // - On small screens: burger toggles the navbar visibility
  // - On desktop: burger toggles the navbar collapsed width
  const isMobile = useMediaQuery('(max-width: 48em)') // ~768px

  const navbarWidth = desktopCollapsed ? 76 : 260

  return (
    <AppShell
      header={{ height: 56 }}
      navbar={{
        width: navbarWidth,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened },
      }}
      padding="md"
    >
      {/* Header area (structure only) */}
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          {/* Burger:
              - mobile: opens/closes navbar
              - desktop: collapses/expands navbar width */}
          <Burger
            opened={isMobile ? mobileOpened : !desktopCollapsed}
            onClick={() => {
              if (isMobile) toggleMobile()
              else setDesktopCollapsed((v) => !v)
            }}
            aria-label="Toggle navigation"
          />

          {/* Empty slot — we'll add header content later */}
          <Box />
        </Group>
      </AppShell.Header>

      {/* Sidebar / Navbar area (structure only) */}
      <AppShell.Navbar p="md">
        {/* Intentionally empty for now (no nav items yet). */}
      </AppShell.Navbar>

      {/* Main content area: render the page content via children */}
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}

