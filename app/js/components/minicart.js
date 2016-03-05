var $ = require('jquery');
var _ = require('lodash');

var minicartItemTemplate = require('../../templates/partials/_minicart-item.tpl');

var minicartItems = [];

var addItemToCart = function(product) {
    minicartItems.push(product);
};

var showMinicartItems = function() {
    var $minicartItems = $('.js-minicart__items');

    var minicartItemsHtml = _.reduce(minicartItems, function(html, item) {
        var compiledTemplate = _.template(minicartItemTemplate);
        return compiledTemplate(item) + html;
    }, '');

    $minicartItems.html(minicartItemsHtml);
};

var bindRemoveMinicartItem = function() {
    $('.js-minicart').on('click', '.js-minicart-item__remove', function() {
        var id = parseInt($(this).attr('data-id'), 10);
        minicartItems = _.reject(minicartItems, function(item) {
            return item.id === id;
        });

        showMinicartItems();
    });
};

module.exports = {
    add: function(product) {
        addItemToCart(product);
        showMinicartItems();
    },
    init: function() {
        bindRemoveMinicartItem();
    }
};
