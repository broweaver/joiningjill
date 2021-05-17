import * as React from 'react'
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme
} from '@chakra-ui/react'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery'
import { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Listing, ListingImage } from './types/Listing'
import 'react-image-gallery/styles/css/image-gallery.css'

export const App = () => {
  const [listings, setListings] = useState<Listing[]>([])
  const [images, setImages] = useState<ReactImageGalleryItem[]>([])

  useEffect(() => {
    loadListings()
  }, [])

  const imageGalleryConvert = (
    listings: Listing[]
  ): ReactImageGalleryItem[] => {
    const items: ReactImageGalleryItem[] = []
    for (let i = 0; i < listings.length; i++) {
      if (!listings[i].Images[0]) continue
      const listing = listings[i]
      const firstImage = listing.Images[0]

      // Jill authors titles as comma-separated lists with last entry as most descriptive
      const titleArray = listing.title.split(',')
      const lastTitle = titleArray[titleArray.length - 1]
      // TODO - explore srcSet and sizes HTML5 attributes
      items.push({
        // fullscreen: firstImage.url_fullxfull,
        original: firstImage.url_fullxfull,
        thumbnail: firstImage.url_75x75,
        description: listing.title
      })
    }
    return items
  }

  const loadListings = async () => {
    const baseUrl: string = process.env.REACT_APP_SERVER_URL as string
    const response: AxiosResponse = await axios.get(`${baseUrl}/listings`)
    const listings: Listing[] = response.data
    const imageGalleryImages: ReactImageGalleryItem[] =
      imageGalleryConvert(listings)
    setListings(listings)
    setImages(imageGalleryImages)
  }

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign='center' fontSize='xl'>
        <Grid minH='100vh'>
          {/* <ColorModeSwitcher justifySelf='flex-end' /> */}
          <ImageGallery
            items={images}
            thumbnailPosition='right'
            autoPlay={true}
          />
        </Grid>
      </Box>
    </ChakraProvider>
  )
}
