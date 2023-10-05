const controller = {
    detail(req, res) {
        res.render('products/productDetail');
    },
    cart(req, res) {
        res.render('products/productCart');
    },
    create(req, res) {
        res.render('products/productCreate');
    },
    edit(req, res) {
        res.render('products/productEdit');
    }
};

module.exports = controller;