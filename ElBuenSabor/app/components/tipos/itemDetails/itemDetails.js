var helpers = require('../../../utils/widgets/helper'),

    dialogs = require('ui/dialogs'),

    dataService = require('../../../dataProviders/elBuenSabor');

function navigatedTo(args) {
    var page = args.object;

    page.navigationContext.pageTitle =
        'Detalle del tipo';

    // context changes

    page.bindingContext = page.navigationContext;
}

exports.navigatedTo = navigatedTo;