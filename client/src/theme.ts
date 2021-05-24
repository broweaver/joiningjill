import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'
const theme = extendTheme({
  colors: {
    brand: {
      100: '#299EBF',
      200: '#945ACB'
    }
  },
  components: {
    Button: {
      variants: {
        solid: {
          bg: 'brand.100',
          color: 'white',
          _hover: {
            bg: 'brand.200'
          },
          _active: {
            bg: 'brand.200'
          }
        }
      }
    }
  },
  breakpoints: createBreakpoints({
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    xxl: '2000px'
  })
})
export default theme
