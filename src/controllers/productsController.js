const controller = {
    detail(req, res) {
        res.render('products/productDetail');
    },
    cart(req, res) {
        res.render('products/productCart');
    }
};

module.exports = controller;