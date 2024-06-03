import api from '../api'
import {
    WISH_ADD_ITEM,
    WISH_REMOVE_ITEM,

} from '../constants/wishConstants'


export const addToWish = (id) => async (dispatch, getState) => {
    const { data } = await api.get(`api/products/${id}`)

    dispatch({
        type: WISH_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: "http://localhost:8000/".concat(data.image),
            price: data.price,
            countInStock: data.countInStock,
        }
    })
    localStorage.setItem('wishItems', JSON.stringify(getState().wish.wishItems))
}



export const removeFromWish = (id) => (dispatch, getState) => {
    dispatch({
        type: WISH_REMOVE_ITEM,
        payload: id,
    })

    localStorage.setItem('wishItems', JSON.stringify(getState().wish.wishItems))
}
