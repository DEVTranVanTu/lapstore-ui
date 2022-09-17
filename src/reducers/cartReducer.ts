const CHANGE_CART_AMOUNT = 'CHANGE_CART_AMOUNT'

export const cartInitialState = {
  cartList: [
    {
      price: 29000000,
      name: 'Atech Cam 1080p',
      imgUrl: '/images/products/Electronics/4.LumixDSLR.png',
      category: 'electronics',
      off: 20,
      rating: 4,
      qty: 2,
      id: '90973424722372',
    },
    {
      price: 29000000,
      name: 'Tony a9',
      imgUrl: '/images/products/Electronics/5.AtechCam1080p.png',
      category: 'electronics',
      off: 20,
      rating: 4,
      qty: 2,
      id: '9465764680962303',
    },
    {
      price: 29000000,
      name: 'beat sw3',
      imgUrl: '/images/products/Electronics/6.Sonya9.png',
      category: 'electronics',
      off: 20,
      rating: 4,
      qty: 1,
      id: '749862900000094311961',
    },
  ],
}

export type CartItem = {
  id: string | number
  name: string
  qty: number
  price: number
  category?: string
  rating?: number
  off?: number
  imgUrl?: string
}

export type cartStateType = {
  cartList: CartItem[]
}

export type cartActionType = {
  type: typeof CHANGE_CART_AMOUNT
  payload: CartItem
}

export const cartReducer = (state: cartStateType, action: cartActionType) => {
  switch (action.type) {
    case CHANGE_CART_AMOUNT:
      let cartList = state.cartList
      let cartItem = action.payload
      let exist = cartList.find((item) => item.id === cartItem.id)

      if (cartItem.qty < 1)
        return {
          cartList: cartList.filter((item) => item.id !== cartItem.id),
        }
      else if (exist)
        return {
          cartList: cartList.map((item) => {
            if (item.id === cartItem.id) return { ...item, qty: cartItem.qty }
            else return item
          }),
        }
      else
        return {
          cartList: [...cartList, cartItem],
        }

    default: {
    }
  }
}
