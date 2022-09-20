import moment from "moment";

export function returnDate(time) {
    return moment(time).format('MM月DD日')
}

export function returnYear(time) {
    let now = moment().format('YYYY')
    let newsTime = moment(time).format('YYYY')
    if(now == newsTime) {
        return ''
    } else {
        return moment(time).format('YYYY年')
    }
}