import { Box, HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import { CustomView, isMobileOnly, MobileOnlyView } from 'react-device-detect'
import { SocialIcon } from 'react-social-icons'

const SocialIcons = () => {
  const facebookUrl =
    process.env.REACT_APP_FACEBOOK_URL || 'https://www.facebook.com/JoiningJill'
  const instagramUrl =
    process.env.REACT_APP_INSTAGRAM_URL ||
    'https://www.instagram.com/joiningjill/'

  return (
    <Box style={{ position: 'absolute', right: 0 }}>
      <CustomView condition={!isMobileOnly}>
        <Box marginTop='15px' marginRight='20px'>
          <HStack spacing='20px'>
            <SocialIcon url={facebookUrl} />
            <SocialIcon url={instagramUrl} />
          </HStack>
        </Box>
      </CustomView>
      <MobileOnlyView>
        <Box marginTop='10px' marginRight='10px'>
          <VStack spacing='10px'>
            <SocialIcon url={facebookUrl} />
            <SocialIcon url={instagramUrl} />
          </VStack>
        </Box>
      </MobileOnlyView>
    </Box>
  )
}

export default SocialIcons
