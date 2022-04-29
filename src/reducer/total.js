export default (total = "", action) => {
    switch (action.type) {
        case "TOTAL":
         return action.payload.totalPage
        default:
            return total
    }
}