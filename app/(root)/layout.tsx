import NavBar from '@/components/navigation/navbar/NavBar'
import { ReactNode } from 'react'

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
        <NavBar />
        {children}
    </main>
  )
}

export default RootLayout