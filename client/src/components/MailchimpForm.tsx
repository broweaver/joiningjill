import React, { FormEvent } from 'react'
import { Box, Button, Flex, Input } from '@chakra-ui/react'

const MailchimpForm = ({
  status,
  message,
  onValidated
}: {
  status: 'error' | 'success' | 'sending' | null
  message: string | Error | null
  onValidated: Function
}) => {
  let email: HTMLInputElement | null
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    email &&
      email.value.indexOf('@') > -1 &&
      onValidated(
        {
          EMAIL: email.value
        },
        status
      )
  }

  return (
    <form onSubmit={submit}>
      <Box mt='10px' mb='10px'>
        {status === 'sending' && <Box color='brand.100'>Submitting...</Box>}
        {status === 'error' && (
          <Box color='brand.200'>
            {/* This strips link from already subscribed message */}
            {(message as string).slice(0, (message as string).indexOf('<a'))}
          </Box>
        )}
        {status === 'success' && <Box color='brand.100'>{message}</Box>}
      </Box>
      <Input
        ref={node => (email = node)}
        type='email'
        placeholder='Your email'
      />
      <Flex justify='flex-end' mt='10px'>
        <Button type='submit'>Submit</Button>
      </Flex>
    </form>
  )
}

export default MailchimpForm
