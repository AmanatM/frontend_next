'use client'
import React from 'react'
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

type InfoPopUpProps = {
  open?: boolean
  setOpen?: (value: boolean) => void
  title: string
  subtitle?: string
  description: string
  closeText?: string
  closeAction?: () => Promise<void>
}

const InfoPopUp = ({
  open,
  setOpen,
  title = 'Title',
  subtitle,
  description = 'Description',
  closeText = 'Close',
  closeAction,
}: InfoPopUpProps) => {
  return (
    <>
      <Credenza open={open} onOpenChange={setOpen}>
        <CredenzaContent>
          <CredenzaHeader>
            <CredenzaTitle className="text-center md:text-left">{title}</CredenzaTitle>
            <CredenzaDescription className="text-center md:text-left">{subtitle}</CredenzaDescription>
          </CredenzaHeader>
          <CredenzaBody className="text-center md:text-left">{description}</CredenzaBody>
          <CredenzaFooter>
            <CredenzaClose asChild>
              <Button variant={'default'} onClick={closeAction}>
                {closeText}
              </Button>
            </CredenzaClose>
          </CredenzaFooter>
        </CredenzaContent>
      </Credenza>
    </>
  )
}

export default InfoPopUp
