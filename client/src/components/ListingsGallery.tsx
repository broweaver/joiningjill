import {
  Center,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { isMobileOnly } from 'react-device-detect'
import Gallery, { PhotoProps } from 'react-photo-gallery'
import { Listing, ListingImage } from '../types/Listing'
import ListingCarousel from './ListingCarousel'

// Converts listings into a form understood by the react-photo-gallery component
const photoGalleryConvert = ({
  listings,
  setImages
}: {
  listings: Listing[]
  setImages: React.Dispatch<React.SetStateAction<PhotoProps[]>>
}) => {
  const listingsImages: PhotoProps[] = []
  for (let i = 0; i < listings.length; i++) {
    const listing: Listing = listings[i]
    if (!listing.Images || !listing.Images[0]) continue
    const firstImage: ListingImage = listing.Images[0]
    const image: PhotoProps = {
      src: firstImage.url_570xN,
      width: firstImage.full_width * 0.5,
      height: firstImage.full_height * 0.5,
      key: listing.listing_id.toString(),
      alt: listing.title
    }

    listingsImages.push(image)
    setImages(listingsImages)
  }
}

// Display thumbnails of all listings in a gallery
const ListingsGallery: React.FC<{
  listings: Listing[]
}> = ({ listings }) => {
  const [images, setImages] = useState<PhotoProps[]>([])
  const [selectedListing, setSelectedListing] = useState<Listing>({} as Listing)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    photoGalleryConvert({ listings, setImages })
  }, [listings])

  const openCarousel = useCallback(
    (event, { photo, index }) => {
      if (!listings[index] || !listings[index].Images) return
      setSelectedListing(listings[index])
      // If viewing on a mobile device simply link to Etsy - viewport too small
      // to comfortably accomodate carousel in modal.
      // A possible extension in the future would be to link to a separate page
      // with the carousel arranged in a more mobile-friendly way.
      if (isMobileOnly) {
        window.open(listings[index].url, '_blank')
        return
      }
      onOpen()
    },
    [listings, onOpen]
  )

  return (
    <div>
      <Gallery photos={images} onClick={openCarousel} />
      <Modal isOpen={isOpen} onClose={onClose} isCentered autoFocus={false}>
        <ModalOverlay />
        <ModalContent maxW={{ md: '590px', xl: '890px', xxl: '1200px' }}>
          <ModalHeader>
            <Center>
              <Link href={selectedListing.url} isExternal>
                View it on Etsy!
              </Link>
            </Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ListingCarousel listing={selectedListing} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ListingsGallery
