import React from 'react'
import headerImage from './../images/jjheader.png'
import headerImageMobile from './../images/jjheader_mobile.png'
import { Box, Image } from '@chakra-ui/react'
import { CustomView, isMobileOnly, MobileOnlyView } from 'react-device-detect'
import SocialIcons from './SocialIcons'
import Subscribe from './Subscribe'

// Show the full header image if on desktop or tablet, zoomed in version for mobile
const Header = () => {
  return (
    <Box style={{ position: 'relative' }}>
      <Subscribe />
      <SocialIcons />
      <CustomView condition={!isMobileOnly}>
        <Image src={headerImage} alt='Joining Jill Homemade Crafts' />
      </CustomView>
      <MobileOnlyView>
        <Image src={headerImageMobile} alt='Joining Jill Homemade Crafts' />
      </MobileOnlyView>
    </Box>
  )
}

export default Header
