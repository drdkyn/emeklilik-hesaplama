import './globals.css'

export const metadata = {
  title: 'SGK Emeklilik Hesaplama',
  description: 'Normal, Yaştan ve Malüllük Emeklilik Şartları',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
}
