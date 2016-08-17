'use strict';
var menuItems,
    observable = require('data/observable'),
    navigationViewModel = new observable.Observable();

menuItems = [{"title":"Login","moduleName":"components/homeView/homeView","icon":""},{"title":"Sucursales","moduleName":"components/sucursales/sucursales","icon":""},{"title":"Sugerencias","moduleName":"components/sugerencias/sugerencias","icon":""},{"title":"Direcciones","moduleName":"components/direcciones/direcciones","icon":""},{"title":"Nosotros","moduleName":"components/nosotros/nosotros","icon":""},{"title":"Salir","moduleName":"components/homeView/homeView","icon":"","context":{"logout":true}}];

navigationViewModel.set('menuItems', menuItems);
navigationViewModel.set('backButtonHidden', true);

module.exports = navigationViewModel;