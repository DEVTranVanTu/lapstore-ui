import '../styles/globals.css'
import type { AppProps } from 'next/app'
import createCache from '@emotion/cache'
import {CacheProvider} from '@emotion/react'
import {MuiTheme} from ''
import Head from 'next/head'
import { Provider } from 'react-redux'
import {store} from '../store/store'

export const cache = createCache({key:'css',prepend:true})

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <CacheProvider value={cache}>
<Head>
  <meta name='viewport' content='width=device-width, initial-scale=1' />
  <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
</Head>
<Provider store={store}>
  <MuiTheme>
    <Layout>
    <Component {...pageProps} />
    </Layout>
  </MuiTheme>
</Provider>
    </CacheProvider>
  )
}

export default MyApp
