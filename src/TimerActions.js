
export const TIMER_MINUTE_TICK = "TIMER_MINUTE_TICK";

export function setTimerMinuteTick(tickDate) {
    return {
        type: TIMER_MINUTE_TICK,
        oneMinuteTick:tickDate
    }
}

