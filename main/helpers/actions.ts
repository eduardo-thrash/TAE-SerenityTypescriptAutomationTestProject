import { actorInTheSpotlight, Duration } from '@serenity-js/core'
import { Click, Enter, isVisible, Scroll, Wait } from '@serenity-js/webdriverio'

export const click = async (id : any, timeOut = 59) => {
    Wait.upTo(Duration.ofSeconds(timeOut)).until(id , isVisible())
    return Click.on(id)
}

export const enterValue = async (id : any, value: any, timeOut = 59) => {
    Wait.upTo(Duration.ofSeconds(timeOut)).until(id, isVisible())
    return Enter.theValue(value).into(id)
}

export const webScroll = async (id : any, timeOut = 59) => {
    Wait.upTo(Duration.ofSeconds(timeOut)).until(id, isVisible())
    return Scroll.to(id)
}

export const swipe = async (from : any, to : any, duration = 1000, timeOut = 59) => {
    Wait.upTo(Duration.ofSeconds(timeOut)).until(from, isVisible())
    Wait.upTo(Duration.ofSeconds(timeOut)).until(to, isVisible())
    
    from = await from.answeredBy(actorInTheSpotlight())
    to = await to.answeredBy(actorInTheSpotlight())
    
    return from.touchAction([
        { action: 'press', element: from },
        { action: 'wait', ms: duration},
        { action: 'moveTo', element: to },
        'release'
    ])
}

export const SwipeToCoordinate = async (from: any, a = 0, b = 0, type: any, duration = 1000, timeOut = 59) => {

    from = actorInTheSpotlight().answer(from)

    const whereX = type === 'left' ? a*-1 : a
    const whereY = type === 'bottom' ? b*-1 : b
    Wait.upTo(Duration.ofSeconds(timeOut)).until(from, isVisible())
    return from.touchAction([{ action: 'press', element: from}, 
        { action: 'wait', ms: duration }, 
        { action: 'moveTo', x: whereX, y: whereY }, 
        'release'
    ])
}

export const scrollToPosition = async (fromElement: any, coordinateX = 0, coordinateY = 0, typeOfMovement: any, durationOfMovement = 1000, timeOut = 59) => {
    const finalCoordX = typeOfMovement === 'left' ? coordinateX*-1 : coordinateX
    const finalCoordY = typeOfMovement === 'bottom' ? coordinateY*-1 : coordinateY
    Wait.upTo(Duration.ofSeconds(timeOut)).until(fromElement, isVisible())
    return fromElement.touchAction([{ action: 'press', element: fromElement}, 
        { action: 'wait', ms: durationOfMovement }, 
        { action: 'moveTo', x: finalCoordX, y: finalCoordY }, 
        'release'
    ])
}