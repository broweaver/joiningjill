import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react'
import React from 'react'
import { isMobileOnly } from 'react-device-detect'
import MailchimpSubscribe, { EmailFormFields } from 'react-mailchimp-subscribe'
import MailchimpForm from './MailchimpForm'

const Subscribe = () => {
  const mailchimpUrl = process.env.REACT_APP_MAILCHIMP_URL as string

  const { isOpen, onOpen, onClose } = useDisclosure()

  let subscribeBtnStyles = {}
  if (isMobileOnly) {
    // Mobile styles
    subscribeBtnStyles = {
      MozTransform: 'rotate(-90deg)',
      MsTransform: 'rotate(-90deg)',
      OTransform: 'rotate(-90deg)',
      WebkitTransform: 'rotate(-90deg)',
      position: 'fixed' as 'fixed',
      right: -31,
      bottom: 60
    }
  } else {
    // Desktop styles
    subscribeBtnStyles = {
      position: 'absolute' as 'absolute',
      left: 10
    }
  }

  return (
    <Box>
      <Button
        style={subscribeBtnStyles}
        ml='20px'
        mt='20px'
        onClick={() => onOpen()}
      >
        Subscribe
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered autoFocus={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Subscribe</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Subscribe to the newsletter and be the first to know about new
            product releases!
            <Box mt='20px' mb='20px'>
              <MailchimpSubscribe
                url={mailchimpUrl}
                render={({ subscribe, status, message }) => (
                  <MailchimpForm
                    status={status}
                    message={message}
                    onValidated={(
                      formData: EmailFormFields,
                      status: 'error' | 'success' | 'sending' | null
                    ) => {
                      subscribe(formData)
                      setTimeout(() => onClose(), 4000)
                    }}
                  />
                )}
              />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default Subscribe
