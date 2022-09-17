import Header from '@Organisms/header/Header'
import MobileNavigationBar from '@Molecules/mobilenavigation/MobileNavigationBar'
import Sticky from '@Molecules/sticky/Sticky'
import Head from 'next/head'
import React, { Fragment, useCallback, useState } from 'react'

type AppLayoutProps = {
  title?: string
  navbar?: React.ReactChild
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  navbar,
  title = 'Lapstore',
}) => {
  const [isFixed, setIsFixed] = useState(false)

  const toggleIsFixed = useCallback((fixed) => {
    setIsFixed(fixed)
  }, [])

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Sticky fixedOn={0} onSticky={toggleIsFixed}>
        <Header isFixed={isFixed} />
      </Sticky>

      {navbar && <div className="section-after-sticky">{navbar}</div>}
      {!navbar ? <div className="section-after-sticky">{children}</div> : children}

      <MobileNavigationBar />
    </Fragment>
  )
}

export default AppLayout
