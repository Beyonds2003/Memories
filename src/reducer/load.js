export default (load = true, action) => {
    switch (action.type) {
        case "START_LOADING":
          return load = true
        case "END_LOADING":
            return load = false
        default:
            return load
    }
}