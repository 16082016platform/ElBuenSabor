'use strict';
var ViewModel,
    Observable = require('data/observable').Observable;
// additional requires

ViewModel = new Observable({

    pageTitle: 'Platos',

    isLoading: false,
    listItems: [],

    // additional properties
    categorias: [],
    listFilter: [],
});
module.exports = ViewModel;