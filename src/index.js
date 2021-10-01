import "bootstrap/dist/css/bootstrap.min.css";

//importo el inicializador de router
import {routerInit} from "../router/router";
const d = document;
const routes = [
    {
        name: "register",
        component: Register,
    },
    {
        name: "login",
        component: Login,
    },
    {
        name: "chat",
        component: Chat,
    },
    {
        name: "profile",
        component: Profile,
    },
];

const root = d.getElementById("main-root");

//Inicializo el router

routerInit({
    routes: routes,
    rootElem: root,
    initialroute: "login",
});
