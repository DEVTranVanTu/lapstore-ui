import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import MuiTheme from '@Atoms/themes/MuiTheme'
import GoogleAnalytics from '@Atoms/utils/GoogleAnalytics'
import OpenGraphTags from '@Atoms/utils/OpenGraphTags'
import Head from 'next/head'
import Router from 'next/router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import React, { Fragment, useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from '../store/store'

export const cache = createCache({ key: 'css', prepend: true })

Router.events.on('routeChangeStart', () => nProgress.start())
Router.events.on('routeChangeComplete', () => nProgress.done())
Router.events.on('routeChangeError', () => nProgress.done())

nProgress.configure({ showSpinner: false })

const App = ({ Component, pageProps }: any) => {
  const Layout = Component.layout || Fragment

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  }, [])

  return (
    <CacheProvider value={cache}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <GoogleAnalytics />
        <OpenGraphTags />
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

export default App
