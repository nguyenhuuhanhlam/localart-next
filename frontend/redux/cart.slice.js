import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
	name: 'cart',
	initialState: [],
	reducers: {
		addToCart: (state, action) => {
			const itemExists = state.find((item) => item.id === action.payload.id)
			
			if (itemExists) {
				alert('Item Exists')
			}
			else {
				state.push({ ...action.payload })
			}
		},
		removeFromCart: (state, action) => {
			console.log('removeFromCart:state:/',state,'/')
		}
	}
})

export const cartReducer = cartSlice.reducer
export const {
	addToCart,
	removeFromCart,
} = cartSlice.actions