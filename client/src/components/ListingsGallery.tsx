import {
  Center,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import Gallery, { PhotoProps } from 'react-photo-gallery'
import { Listing, ListingImage } from '../types/Listing'
import ListingCarousel from './ListingCarousel'

// Display thumbnails of all listings in a gallery
const ListingsGallery: React.FC<{
  listings: Listing[]
}> = ({ listings }) => {
  const [images, setImages] = useState<PhotoProps[]>([])
  const [selectedListing, setSelectedListing] = useState<Listing>({} as Listing)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    photoGalleryConvert()
  }, [listings])

  const photoGalleryConvert = () => {
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

  const openCarousel = useCallback(
    (event, { photo, index }) => {
      if (!listings[index] || !listings[index].Images) return
      setSelectedListing(listings[index])
      onOpen()
    },
    [listings]
  )

  return (
    <div>
      {/* <SRLWrapper elements={selectedListingImages}></SRLWrapper> */}

      <Gallery photos={images} onClick={openCarousel} />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW='890px'>
          <ModalBody>
            <ListingCarousel listing={selectedListing} />
          </ModalBody>
          <ModalHeader>
            <Center>
              <Link href={selectedListing.url} isExternal>
                View it on Etsy!
              </Link>
            </Center>
          </ModalHeader>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ListingsGallery
