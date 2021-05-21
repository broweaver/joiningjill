import * as React from 'react'
import { ChakraProvider, Box, Grid, extendTheme } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Listing } from './types/Listing'
import ListingsGallery from './components/ListingsGallery'
import './App.scss'
import Header from './components/Header'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const App = () => {
  const [listings, setListings] = useState<Listing[]>([])

  useEffect(() => {
    loadListings()
  }, [])

  const loadListings = async () => {
    const baseUrl: string = process.env.REACT_APP_SERVER_URL as string
    const response: AxiosResponse = await axios.get(`${baseUrl}/listings`)
    const listings: Listing[] = response.data
    setListings(listings)
  }

  // Define chakra ui breakpoints
  const breakpoints = createBreakpoints({
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    xxl: '2000px'
  })

  const theme = extendTheme({ breakpoints })

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign='center' fontSize='xl'>
        <Grid minH='100vh'>
          <Header />
          <ListingsGallery listings={listings} />
        </Grid>
      </Box>
    </ChakraProvider>
  )
}

export default App
