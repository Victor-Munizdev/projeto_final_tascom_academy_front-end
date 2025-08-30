import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import '../src/styles/global.css'

export default function App({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar se estamos no cliente
    setIsClient(true)
    
    // Simular um tempo de carregamento mínimo para evitar flash
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 100)


    return () => clearTimeout(timer)
  }, [])

  if (!isClient || isLoading) {
    return (
      <>
        <Head>
          <title>Portfolio Project</title>
          <meta name="description" content="Sistema de portfólios" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '18px',
          color: '#666'
        }}>
          Carregando aplicação...
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Portfolio Project</title>
        <meta name="description" content="Sistema de portfólios" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
