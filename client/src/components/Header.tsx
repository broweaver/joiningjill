import React from 'react'
import background from './../images/jjheader.jpg'
import SocialIcons from './SocialIcons'
import { Box, Image } from '@chakra-ui/react'

const Header = () => {
  return (
    <Box style={{ position: 'relative' }}>
      {/* <SocialIcons /> */}
      <Image src={background} alt='Joining Jill Homemade Crafts' />
    </Box>
  )
}

export default Header
