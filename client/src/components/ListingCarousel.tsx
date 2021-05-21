import React, { useEffect, useState } from 'react'
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import { Listing, ListingImage } from '../types/Listing'

// Takes an array of ListingImages and displays them
const ListingCarousel: React.FC<{
  listing: Listing
}> = ({ listing }) => {
  const [images, setImages] = useState<ReactImageGalleryItem[]>([])

  useEffect(() => {
    imageGalleryConvert(listing.Images)
  }, [listing])

  // Convert the listing's images to objects recognized by the react-image-gallery
  // plugin
  const imageGalleryConvert = (listingImages: ListingImage[]): void => {
    const carouselImages: ReactImageGalleryItem[] = []
    for (let i = 0; i < listingImages.length; i++) {
      const listingImage: ListingImage = listingImages[i]
      // TODO - explore srcSet and sizes HTML5 attributes
      const item: ReactImageGalleryItem = {
        // fullscreen: firstImage.url_fullxfull,
        original: listingImage.url_fullxfull,
        thumbnail: listingImage.url_75x75
        // description: listing.title
      }
      carouselImages.push(item)
      setImages(carouselImages)
    }
  }

  return (
    <ImageGallery
      items={images}
      thumbnailPosition='right'
      showPlayButton={false}
      showNav={false}
    />
  )
}

export default ListingCarousel
