var $ = require('jquery');
var _ = require('lodash');
var productTemplate = require('../../templates/partials/_product.tpl');

module.exports = {
    init: function() {
        $.ajax('/products').done(function(products) {
            var $products = $('.js-products');
            _.map(products, function(product) {
                var compiledTemplate = _.template(productTemplate);
                $products.append(compiledTemplate(product));
            });
        });
    }
};
