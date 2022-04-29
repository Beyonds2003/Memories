import { combineReducers } from "redux";
import postdata from "./posts"
import auth from "./auth"
import totalPage from "./total"
import checkLoad from "./load"
import postdetail from "./detail"
import errorMsg from "./error"

const reducers = combineReducers({
    posts: postdata,
    auth: auth,
    total: totalPage,
    load: checkLoad,
    detail: postdetail,
    error: errorMsg
})

export default reducers