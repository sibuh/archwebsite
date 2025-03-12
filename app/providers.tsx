// app/providers.tsx
'use client'

import {HeroUIProvider} from '@heroui/react'
import { Theme } from '@radix-ui/themes'

export function Providers({children}: { children: React.ReactNode }) {
  return (
    // <HeroUIProvider>
        <Theme>

         {children}
        </Theme>
    // </HeroUIProvider>
  )
}