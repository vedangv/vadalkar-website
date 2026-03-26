'use client'

import { useEffect } from 'react'

interface CommentsProps {
  pageId: string
  pageTitle: string
  pageUrl: string
}

export default function Comments({ pageId, pageTitle, pageUrl }: CommentsProps) {
  const appId = process.env.NEXT_PUBLIC_CUSDIS_APP_ID

  useEffect(() => {
    if (!appId) return

    // Load the Cusdis script after the thread div is in the DOM
    const script = document.createElement('script')
    script.src = 'https://cusdis.com/js/cusdis.es.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      script.remove()
    }
  }, [appId, pageId])

  if (!appId) return null

  return (
    <div className="mt-14 pt-10 border-t border-[var(--color-border)]">
      <h2
        className="text-2xl font-bold text-[var(--color-primary)] mb-8"
        style={{ fontFamily: 'var(--font-playfair-display), Georgia, serif' }}
      >
        Comments
      </h2>
      <div
        id="cusdis_thread"
        data-host="https://cusdis.com"
        data-app-id={appId}
        data-page-id={pageId}
        data-page-title={pageTitle}
        data-page-url={pageUrl}
      />
    </div>
  )
}
