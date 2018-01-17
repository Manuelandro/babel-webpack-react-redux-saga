import { createSelector } from 'reselect'

export const $selector = state => state.selector
 
export const mk$Selector = () => createSelector($selector, mem => mem)

export const mk$Combined = () =>
    createSelector(mk$Selector(), (mem) => {
       return // some stuff
    })
