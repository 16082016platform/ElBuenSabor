'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),
    navigationProperty = require('../../utils/widgets/navigation-property'),

    service = require('./platos-service'),
    // additional requires

    viewModel = require('./platos-view-model');

function onListViewItemTap(args) {
    var itemData = viewModel.get('listItems')[args.index];

    helpers.navigate({
        moduleName: 'components/platos/itemDetails/itemDetails',
        context: itemData.details
    });
}
exports.onListViewItemTap = onListViewItemTap;



function buttonForwardTap(args) {
    helpers.navigate({
        moduleName: 'components/pedidos/pedidos'
    });
}
exports.buttonForwardTap = buttonForwardTap;


function flattenLocationProperties(dataItem) {
    var propName, propValue,
        isLocation = function (value) {
            return propValue && typeof propValue === 'object' &&
                propValue.longitude && propValue.latitude;
        };

    for (propName in dataItem) {
        if (dataItem.hasOwnProperty(propName)) {
            propValue = dataItem[propName];
            if (isLocation(propValue)) {
                dataItem[propName] =
                    'Latitude: ' + propValue.latitude +
                    'Longitude: ' + propValue.longitude;
            }
        }
    }
}


//actualizar footer y botones
function verificarCantidad(id, total) {
    var fs = require("file-system");
    var documents = fs.knownFolders.documents();
    var fileName = "platosSeleccionados.json";
    var myFile = documents.getFile(fileName);
    var cantidad = 0;
    myFile.readText()
        .then(function (data) {
            // Successfully read the file's content.
            data = JSON.parse(data);
            for (var i = 0; i < data.length; i++) {
                if (data[i].Id == id) {
                    cantidad = data[i].cantidad;
                    alert(cantidad);
                }
                total += (data[i].cantidad * data[i].precio) ;
            }
        }, function (error) {
            // Failed to read from the file.
            alert(error);
        });
        return cantidad;
}


// additional functions

function pageLoaded(args) {
    var page = args.object;

    helpers.platformInit(page);
    page.bindingContext = viewModel;

    viewModel.set('isLoading', true);
    viewModel.set('listItems', []);

    function _fetchData() {
        var context = page.navigationContext;

        if (context && context.filter) {
            return service.getAllRecords(context.filter);
        }

        return service.getAllRecords();
    };


    _fetchData()
        .then(function (result) {
            var itemsList = [];

            result.forEach(function (item) {
                flattenLocationProperties(item);

                itemsList.push({

                    icon: '\ue0dc', //globe

                    image: item.foto ? item.expandImagen.ruta : item.expandImagen.ruta, //image: item.foto,

                    header: item.nombre,

                    description: item.etiqueta,

                    cantidad: 1,

                    // singleItem properties
                    details: item,
                });
            });

            viewModel.set('listItems', itemsList);
            viewModel.set('isLoading', false);
            alert(itemsList.length);
        })
        .catch(function onCatch() {
            viewModel.set('isLoading', false);
        });
    // additional pageLoaded
    if (isInit) {
        isInit = false;

        // additional pageInit

    }
}

// START_CUSTOM_CODE_platos
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_platos
exports.pageLoaded = pageLoaded;



function aumentarCantidad(args) {
    // clearFile();
    // agregarCantidad(args)
}
exports.disminuirCantidad = disminuirCantidad;


function agregarCantidad(args) {
    var page = args.object;
    var item = page.bindingContext.details;

    // readFile(item);

    var parent = page.parent;
    var id = JSON.stringify(page.id).replace(/"/g, "");

    // args.object.isEnabled = false;

    var btnDisminuir = parent.getViewById(id.replace(/agregar/g, "disminuir"));
    btnDisminuir.opacity = "1"; //ITS WORK


    var fs = require("file-system");
    var documents = fs.knownFolders.documents();

    var fileName = "platosSeleccionados.json";
    var myFile = documents.getFile(fileName);

    myFile.readText()
        .then(function (data) {
            // Successfully read the file's content.
            var array = [];
            var pedidos = "";
            if (data.length > 0) {//si no es el primer pedido
                var guardado = [data];
                var nuevo = [JSON.stringify(item)];
                var sumar = -1;

                var g = JSON.parse(guardado);
                var n = JSON.parse(nuevo);
                for (var i = 0; i < g.length; i++) {
                    if (g[i].Id == n.Id) {
                        sumar = i;
                    }
                }
                if (sumar == -1) { // si no existe
                    item.cantidad = 1;
                    pedidos = data;
                    pedidos = pedidos.slice(0, -1);
                    pedidos += ", " + JSON.stringify(item) + "]";

                    // Writing text to the file.
                    myFile.writeText(pedidos)
                        .then(function () {
                            args.object.text = 1;
                        }, function (error) {
                            // Failed to write to the file.
                            alert(error);
                        });
                } else {//sumar 1 a cantidad
                    g[sumar].cantidad += 1;
                    myFile.writeText(JSON.stringify(g))
                        .then(function () {
                            args.object.text = g[sumar].cantidad;
                        }, function (error) {
                            // Failed to write to the file.
                            alert(error);
                        });
                }
            } else {
                item.cantidad = 1;
                array.push(item);

                // Writing text to the file.
                myFile.writeText(JSON.stringify(array))
                    .then(function () {
                        args.object.text = 1;
                    }, function (error) {
                        // Failed to write to the file.
                        alert(error);
                    });
            }
        }, function (error) {
            // Failed to read from the file.
            alert(error);
        });

}
exports.agregarCantidad = agregarCantidad;




// Function read file
function readFile(item) {

    var fs = require("file-system");
    var documents = fs.knownFolders.documents();

    var fileName = "platosSeleccionados.json";
    var myFile = documents.getFile(fileName);

    myFile.readText()
        .then(function (data) {
            // Successfully read the file's content.
            writeFile(item, data);
        }, function (error) {
            // Failed to read from the file.
            alert(error);
        });
}

//Clear file function
function clearFile() {
    var fs = require("file-system");
    var documents = fs.knownFolders.documents();
    var fileName = "platosSeleccionados.json";
    var myFile = documents.getFile(fileName);

    // var written: boolean;
    // Writing text to the file.
    myFile.writeText("")
        .then(function () {
            // Succeeded writing to the file.
            // Getting back the contents of the file.
            myFile.readText()
                .then(function (content) {
                    // Successfully read the file's content.
                    alert(content);
                }, function (error) {
                    // Failed to read from the file.
                    alert(error);
                });
        }, function (error) {
            // Failed to write to the file.
            alert(error);
        });
}


//Removing file function
function removeFile() {
    var fs = require("file-system");
    var documents = fs.knownFolders.documents();

    var fileName = "platosSeleccionados.json";
    var file = documents.getFile(fileName);
    file.remove()
        .then(function (result) {
            // Success removing the file.
            alert(fileName + " File removido");
        }, function (error) {
            // Failed to remove the file.
            alert(error);
        });
}

function disminuirCantidad(args) {
    var page = args.object;
    var parent = page.parent;
    var id = JSON.stringify(page.id).replace(/"/g, "");

    var btnAugmentar = parent.getViewById(id.replace(/disminuir/g, "agregar"));


    var fs = require("file-system");
    var documents = fs.knownFolders.documents();
    var fileName = "platosSeleccionados.json";
    var myFile = documents.getFile(fileName);
    myFile.readText()
        .then(function (data) {
            // Successfully read the file's content.
            data = JSON.parse(data);
            for (var i = 0; i < data.length; i++) {
                if ("disminuir" + data[i].Id == id) {
                    data[i].cantidad -= 1;
                    if (data[i].cantidad == 0) {
                        data.splice(i, 1);
                        args.object.opacity = "0";
       	                btnAugmentar.text = "Agregar";
                    } else {
                        btnAugmentar.text = data[i].cantidad;
                    }
                    // Writing text to the file.
                    myFile.writeText(data.length > 0 ? JSON.stringify(data) : "")
                        .then(function () {

                        }, function (error) {
                            // Failed to write to the file.
                            alert(error);
                        });

                }
            }

        }, function (error) {
            // Failed to read from the file.
            alert(error);
        });

}
exports.aumentarCantidad = aumentarCantidad;


