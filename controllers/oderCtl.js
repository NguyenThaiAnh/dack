var Order = require('../models/order');
indexOfObject = require('array-indexofobject');
exports.daystatistical = function (req, res, next) {
    Order.find({'date': req.body.date, 'month': req.body.month, 'year': req.body.year}, function (err, rs) {
        function Statistical(_id, title, idcustomer, count) {
            this._id = _id;
            this.title = title;
            this.idcustomer = idcustomer;
            this.count = count;
        };
        var arr = [];
        for (var i = 0; i < rs.length; i++) {
            for (var key in rs[i].cart.items) {
                var newStatistical = new Statistical(rs[i].cart.items[key].item._id, rs[i].cart.items[key].item.title, rs[i].user, rs[i].cart.items[key].qty);
                arr.push(newStatistical);
            }
        }
        var arrs = [];
        for (var i = 0; i < arr.length; i++) {
            // console.log(arr[i]);
            if (indexOfObject(arrs, arr[i], '_id') < 0) {

                arrs.push(arr[i]);
            }
            else {
                arrs[indexOfObject(arrs, arr[i], '_id')].count += arr[i].count;
            }
        }
        res.json(arrs);
    });
};
exports.monthstatistical = function (req, res, next) {
    Order.find({'month': req.body.month, 'year': req.body.year}, function (err, rs) {
        function Statistical(_id, title, idcustomer, count) {
            this._id = _id;
            this.title = title;
            this.idcustomer = idcustomer;
            this.count = count;
        };
        var arr = [];
        for (var i = 0; i < rs.length; i++) {
            for (var key in rs[i].cart.items) {
                var newStatistical = new Statistical(rs[i].cart.items[key].item._id, rs[i].cart.items[key].item.title, rs[i].user, rs[i].cart.items[key].qty);
                arr.push(newStatistical);
            }
        }
        var arrs = [];
        for (var i = 0; i < arr.length; i++) {
            // console.log(arr[i]);
            if (indexOfObject(arrs, arr[i], '_id') < 0) {

                arrs.push(arr[i]);
            }
            else {
                arrs[indexOfObject(arrs, arr[i], '_id')].count += arr[i].count;
            }
        }
        res.json(arrs);
    });
};
exports.quarterstatistical = function (req, res, next) {

    var month1, month2, month3;

    var month = parseInt(req.body.month);

    if (month >= 10 && month <= 12) {
        month1 = '10';
        month2 = '11';
        month3 = '12';
    }
    if (month >= 1 && month <= 3) {
        month1 = '01';
        month2 = '02';
        month3 = '03';

    }
    if (month >= 4 && month <= 6) {
        month1 = '04';
        month2 = '05';
        month3 = '06';

    }
    if (month >= 7 && month <= 9) {
        month1 = '07';
        month2 = '08';
        month3 = '09';

    }

    Order.find({'month': month1, 'month': month2, 'month': month3, 'year': req.body.year}, function (err, rs) {

        function Statistical(_id, title, idcustomer, count) {
            this._id = _id;
            this.title = title;
            this.idcustomer = idcustomer;
            this.count = count;
        };
        var arr = [];
        for (var i = 0; i < rs.length; i++) {
            for (var key in rs[i].cart.items) {
                var newStatistical = new Statistical(rs[i].cart.items[key].item._id, rs[i].cart.items[key].item.title, rs[i].user, rs[i].cart.items[key].qty);
                arr.push(newStatistical);
            }
        }
        var arrs = [];
        for (var i = 0; i < arr.length; i++) {
            // console.log(arr[i]);
            if (indexOfObject(arrs, arr[i], '_id') < 0) {

                arrs.push(arr[i]);
            }
            else {
                arrs[indexOfObject(arrs, arr[i], '_id')].count += arr[i].count;
            }
        }
        res.json(arrs);
    });
};
exports.yearstatistical = function (req, res, next) {
    Order.find({'year': req.body.year}, function (err, rs) {
        function Statistical(_id, title, idcustomer, count) {
            this._id = _id;
            this.title = title;
            this.idcustomer = idcustomer;
            this.count = count;
        };
        var arr = [];
        for (var i = 0; i < rs.length; i++) {
            for (var key in rs[i].cart.items) {
                var newStatistical = new Statistical(rs[i].cart.items[key].item._id, rs[i].cart.items[key].item.title, rs[i].user, rs[i].cart.items[key].qty);
                arr.push(newStatistical);
            }
        }
        var arrs = [];
        for (var i = 0; i < arr.length; i++) {
            // console.log(arr[i]);
            if (indexOfObject(arrs, arr[i], '_id') < 0) {

                arrs.push(arr[i]);
            }
            else {
                arrs[indexOfObject(arrs, arr[i], '_id')].count += arr[i].count;
            }
        }
        res.json(arrs);
    });
};

function compare(a, b) {
    if (a.count > b.count)
        return -1;
    if (a.count < b.count)
        return 1;
    return 0;
}

exports.top10 = function (req, res, next) {


    Order.find(function (err, rs) {
        function Statistical(_id, title, idcustomer, count) {
            this._id = _id;
            this.title = title;
            this.idcustomer = idcustomer;
            this.count = count;
        };
        var arr = [];
        for (var i = 0; i < rs.length; i++) {
            for (var key in rs[i].cart.items) {
                var newStatistical = new Statistical(rs[i].cart.items[key].item._id, rs[i].cart.items[key].item.title, rs[i].user, rs[i].cart.items[key].qty);
                arr.push(newStatistical);
            }
        }
        var arrs = [];
        for (var i = 0; i < arr.length; i++) {
            // console.log(arr[i]);
            if (indexOfObject(arrs, arr[i], '_id') < 0) {

                arrs.push(arr[i]);
            }
            else {
                arrs[indexOfObject(arrs, arr[i], '_id')].count += arr[i].count;
            }
        }
        arrs.sort(compare);
        var top10 = [];
        for (var i = 0; i < arrs.length; i++) {
            top10.push(arrs[i]);
            if(i==10)
            {
                break;
            }
        }
        res.json(top10);
    });
};


exports.loadDaGiao = function (req, res, next)
{
    Order.find({'status': 1}, function (err, rs)
    {
        res.json(rs);
    });
}
exports.loadDangGiao = function (req, res, next)
{
    Order.find({'status': 0}, function (err, rs)
    {
        res.json(rs);
    });
}
exports.loadChuaGiao = function (req, res, next)
{
    Order.find({'status': 0}, function (err, rs)
    {
        res.json(rs);
    });
}