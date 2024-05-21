'use client'
import { SandpackPreviewRef, useSandpack, SandpackPreview } from '@codesandbox/sandpack-react'
import { useEffect, useRef } from 'react'

const SandpackPreviewClient: React.FC = () => {
  const { sandpack } = useSandpack()

  const previewRef = useRef<SandpackPreviewRef | null>(null)

  useEffect(() => {
    const client = previewRef.current?.getClient()
    const clientId = previewRef.current?.clientId

    if (client && clientId) {
      // console.log(client)
      // console.log(sandpack.clients[clientId])
    }
    /**
     * NOTE: In order to make sure that the client will be available
     * use the whole `sandpack` object as a dependency.
     */
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
}

export default SandpackPreviewClient
