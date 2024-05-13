'use client'
import { SandpackPreviewRef, useSandpack, SandpackPreview } from '@codesandbox/sandpack-react'
import React from 'react'
import { useEffect, useRef } from 'react'

export const SandpackPreviewClient = React.memo(() => {
  const { sandpack } = useSandpack()
  const previewRef = useRef<SandpackPreviewRef>(null) // Ensure it's initialized as null

  useEffect(() => {
    const client = previewRef.current?.getClient()
    const clientId = previewRef.current?.clientId

    if (client && clientId) {
      console.log(client)
      console.log(sandpack.clients[clientId])
    }
  }, [sandpack])

  return (
    <SandpackPreview
      ref={previewRef}
      showSandpackErrorOverlay={true}
      showNavigator={true}
      showOpenInCodeSandbox={false}
      className={'size-full'}
    />
  )
})

SandpackPreviewClient.displayName = 'SandpackPreviewClient'
