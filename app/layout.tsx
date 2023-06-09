import './globals.css'
import { Inter } from 'next/font/google'
import { ReduxProvider } from './redux/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Donut Admin Dashboard',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </ReduxProvider>
  )
}
