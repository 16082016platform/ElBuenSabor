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