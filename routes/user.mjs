import { userLogin, userRegister } from "../controllers/UserController.mjs";

export default function(app) {
    app.route('/user/register').post(userRegister);
    app.route('/user/login').post(userLogin);
}