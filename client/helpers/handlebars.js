Handlebars.registerHelper('pluralize', function (n, thing) {
    if (n == 1) {
        return '1 ' + thing;
    } else {
        return n + ' ' + thing + 's';
    }
});
