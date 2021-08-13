import requests from '../../requests'

export interface Brand {
    _id: string
    title: string
    main: boolean,
    __v: number
}

export type BrandState = {
    elements: Brand[]
}
type BrandsAction = {
    type: string
    elements: BrandState
}
type DispatchType = (args: BrandsAction) => BrandsAction
const SET_BRANDS = "src/redux/reducers/SET_BRANDS"

let initialState: BrandState = {
    elements: []
}
export let brandsReducer = (state: BrandState = initialState, action: BrandsAction) => {
    switch (action.type) {
        case SET_BRANDS: {
            return {
                ...state,
                elements: action.elements
            }
        }
        default: return state
    }
}

const setBrandsAC = (elements: BrandState) => ({ type: SET_BRANDS, elements })

export const getBrands = () => async (dispatch: DispatchType) => {
    let elements = await requests.getBrands()
    dispatch(setBrandsAC(elements.data))

}

