'use client'
import { SandpackPreviewRef, useSandpack, SandpackPreview } from '@codesandbox/sandpack-react'
import React from 'react'
import { useEffect, useRef } from 'react'

export const SandpackPreviewClient = React.memo(() => {
  const { sandpack } = useSandpack()
  const previewRef = useRef<SandpackPreviewRef>(null) // Ensure it's initialized as null

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
