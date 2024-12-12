import { Dayjs } from "dayjs"

function displayDate(date: Dayjs) {
    return (date.date() + "/" + (date.month() + 1) + "/" + date.year())
}

export { displayDate }