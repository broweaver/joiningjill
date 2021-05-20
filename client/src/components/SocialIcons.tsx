import { Box, IconButton, LinkBox, LinkOverlay } from '@chakra-ui/react'
import React from 'react'
import { FaEtsy, FaFacebook } from 'react-icons/fa'

const SocialIcons = () => {
  return (
    <Box style={{ position: 'absolute', right: 0 }}>
      <LinkBox>
        <LinkOverlay href='https://joiningjill.etsy.com'>
          <IconButton
            aria-label='Follow on Etsy'
            icon={<FaEtsy />}
            colorScheme='teal'
            size='lg'
          />
        </LinkOverlay>
      </LinkBox>
      <LinkBox>
        <LinkOverlay href='https://www.facebook.com/JoiningJill'>
          <IconButton
            aria-label='Follow on Pinterest'
            icon={<FaFacebook />}
            colorScheme='teal'
            size='lg'
          />
        </LinkOverlay>
      </LinkBox>
    </Box>
  )
}

export default SocialIcons
