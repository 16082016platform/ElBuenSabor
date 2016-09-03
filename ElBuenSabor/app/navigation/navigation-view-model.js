'use strict';
var menuItems,
    observable = require('data/observable'),
    navigationViewModel = new observable.Observable();

menuItems = [{
    "title": "Login",
    "moduleName": "components/homeView/homeView",
    "icon": "\ue0dd"
}, {
    "title": "Sucursales",
    "moduleName": "components/sucursales/sucursales",
    "icon": "\ue0dd"
}, {
    "title": "Sugerencias",
    "moduleName": "components/sugerencias/sugerencias",
    "icon": "\ue204"
}, {
    "title": "Nosotros",
    "moduleName": "components/nosotros/nosotros",
    "icon": "\ue0de"
}, {
    "title": "Tipos",
    "moduleName": "components/tipos/tipos"
}, {
    "title": "Categorias",
    "moduleName": "components/categorias/categorias"
}, {
    "title": "Platos",
    "moduleName": "components/platos/platos",
    "icon": "\ue204"
}, {
    "title": "Salir",
    "moduleName": "components/homeView/homeView",
    "icon": "\ue1ff",
    "context": {
        "logout": true
    }
}];

navigationViewModel.set('menuItems', menuItems);
navigationViewModel.set('backButtonHidden', true);

module.exports = navigationViewModel;