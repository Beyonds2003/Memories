export default (auth = {authData: null}, action) => {
   switch (action.type) {
        case "AUTH":
        case "SEND":
        case "CHECK":
         localStorage.setItem("profile", JSON.stringify(action.data))
         return {...auth, authData: action?.data}
         case "LOGOUT":
         localStorage.clear()
         return auth = {authData: null}
       default:
           return auth
   }
}