import { createSlice, current } from '@reduxjs/toolkit'

const cartSlice = createSlice({
	name: 'cart',
	initialState: [],
	reducers: {
		addToCart: (state, action) => {
			const itemExists = state.find(item => item.id === action.payload.id)
			
			if (itemExists) {
				alert('Item Exists')
			}
			else {
				state.push({ ...action.payload })
			}
		},
		removeFromCart: (state, action) => {
			// console.log(current(state))
			const cur = state.findIndex(v => v.id === action.payload.id)
			state.splice(cur,1)
		},
		preOrder: (state, action) => {
			console(current(state))
		}
	}
})

export const cartReducer = cartSlice.reducer
export const {
	addToCart,
	removeFromCart,
	preOrder
} = cartSlice.actions