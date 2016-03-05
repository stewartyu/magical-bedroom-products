var $ = require('jquery');
var _ = require('lodash');
var minicart = require('./minicart');
var productTemplate = require('../../templates/partials/_product.tpl');

var allProducts = [];

var showProducts = function(products) {
    var $products = $('.js-products');
    _.map(products, function(product) {
        var compiledTemplate = _.template(productTemplate);
        $products.append(compiledTemplate(product));
    });
};

var bindEvents = function() {
    $('.js-product__cta').on('click', function() {
        var id = parseInt($(this).attr('data-id'), 10);
        var index = _.findIndex(allProducts, function(product) {
            return product.id === id;
        });
        var product = allProducts[index];

        minicart.add(product);
    });
};

module.exports = {
    init: function() {
        $.ajax('/products').done(function(products) {
            showProducts(products);
            bindEvents();

            allProducts = products;
        });

        minicart.init();
    }
};
