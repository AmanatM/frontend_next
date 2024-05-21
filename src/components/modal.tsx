'use client'
import React, { useState } from 'react'
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from '@/components/ui/credenza'

import { Button } from './custom/button'
import { set } from 'react-hook-form'
import { TypographyMuted } from './typography'

type InfoPopUpProps = {
  options?: {
    title?: string
    description?: string
    closeText?: string
    actionText?: string
  }
  action?: () => void
  children?: React.ReactNode
  type: 'info' | 'confirm' | 'confirm-danger'
}

export function ModalTrigger({ options, action, children, type = 'info' }: InfoPopUpProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleAction = () => {
    if (!action) {
      setIsOpen(false)
      return
    }
    action()
    setIsOpen(false)
  }

  return (
    <Credenza open={isOpen} onOpenChange={setIsOpen}>
      <CredenzaTrigger asChild>{children}</CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle className="text-center md:text-left">{options?.title || 'Title'}</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody className="text-center md:text-left">
          <TypographyMuted>{options?.description}</TypographyMuted>
        </CredenzaBody>
        <CredenzaFooter>
          <CredenzaClose asChild>
            <Button variant={'outline'}>{options?.closeText || 'Close'}</Button>
          </CredenzaClose>
          {type !== 'info' ? (
            <Button variant={type === 'confirm-danger' ? 'destructive' : 'default'} onClick={handleAction}>
              {options?.actionText || 'Confirm'}
            </Button>
          ) : null}
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  )
}
