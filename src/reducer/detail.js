export default (detail = [], action) => {
    switch (action.type) {
        case "DETAIL":
          return action.payload
        case "COM":
          return action.payload
        default:
            return detail
    }
}