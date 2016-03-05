var $ = require('jquery');
var _ = require('lodash');

var minicartItemTemplate = require('../../templates/partials/_minicart-item.tpl');

var minicartItems = [];

var addItemToCart = function(product) {
    if (!_.some(minicartItems, product)) {
        minicartItems.push(product);
    } else {
        alert('You have already added this item to the cart.');
    }
};

var renderMinicart = function() {
    renderMinicartItems();

    // update cart total
    $('.js-minicart__count').html(minicartItems.length);

    // update price total
    var total = _.reduce(minicartItems, function(currentTotal, item) {
        var currentPrice = parseInt(item.price.replace('$', ''), 10);
        return currentTotal + currentPrice;
    }, 0);
    $('.js-minicart__total').html('$' + total);
};

var renderMinicartItems = function() {
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

        renderMinicart();
    });
};

module.exports = {
    add: function(product) {
        addItemToCart(product);
        renderMinicart();
    },
    init: function() {
        bindRemoveMinicartItem();
    }
};
