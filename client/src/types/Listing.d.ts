export interface ListingImage {
  url_75x75: string
  url_170x135: string
  url_570xN: string
  url_fullxfull: string
  full_height: number
  full_width: number
}

export interface Listing {
  Images: ListingImage[]
  currency_code: string
  description: string
  is_vintage: boolean
  item_dimensions_unit: string
  item_height: string
  item_length: string
  item_weight: string
  item_weight_unit: string
  item_width: string
  listing_id: number
  matrials: string[]
  price: string
  quantity: number
  tags: string[]
  title: string
  url: string
}
