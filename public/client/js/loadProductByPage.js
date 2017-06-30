$(document).ready(function(){
    loadByPage(0);
});
function loadByPage(pageIndex){
    if(pageIndex < 0)
        pageIndex == 0;
    $.ajax({
        url: "http://shoppinga.herokuapp.com/product/product-by-page/" + pageIndex ,
        // the URL for the request
        type: "GET",
        // whether this is a POST or GET request
        dataType: "json",


        // the type of data we expect back
        success: function (responseJson) {
            console.log(responseJson);
            var innerHtml = '';
            for(var i = 0; i < responseJson.Result.length; i++){
                innerHtml += '<div class="col-xs-12 col-md-6">';
                innerHtml += '<div class="prod-info-main prod-wrap clearfix">';
                innerHtml += ' <div class="row">';
                innerHtml += '<div class="col-md-5 col-sm-12 col-xs-12">';
                innerHtml += '<div class="product-image">';
                innerHtml += '<img src="' + responseJson.Result[i].imagePath1 + '" class="img-responsive rotprod customImage">';
                innerHtml += '<span class="tag2 hot">';
                innerHtml += 'HOT' +
                            '</span>'+
                            '</div>'+
                            '</div>' +
                            '<div class="col-md-7 col-sm-12 col-xs-12">' +
                            '<div class="product-deatil">'+
                            '<h5 class="name">'+
                            '<a href="#">'+
                    responseJson.Result[i].title +
                            '</a>';
                innerHtml += '<a href="#">' +
                            '<span>Danh mục sản phẩm</span>' +
                                '</a>' +

                    '</h5>' +
                    '<p class="price-container">'+
                    '<span>' + responseJson.Result[i].price + '</span>' +
                    '</p>' +
                    '<span class="tag1"></span>'+
                    '</div>' +
                    '<div class="description">'+
                    '<p> ' + responseJson.Result[i].description + '</p>'+
                    '</div>'+
                    '<div class="product-info smart-form">'+
                    '<div class="row">'+
                    '<div class="col-md-12">'+
                    '<a href="/product/' + responseJson.Result[i]._id + '" class="btn btn-info"><span>Chi tiết...</span></a>' +
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+

                    '</div>'+

                    '</div>'+


                    '</div>';
            }

            $('#contentProduct').html(innerHtml);
            console.log(responseJson.TotalPage);
            paginButton(pageIndex, responseJson.TotalPage);
        },
        error: function (xhr, status) {
            // code run if request fails; raw request and status
            console.log("Sorry, there was a problem!");
        },
        complete: function (xhr, status) {  	// code to run regardless of success or failure
            console.log("The request is complete!");
        }
    })
}

function loadByCateGory(category){
    console.log(category);
    $.ajax({
        url: "http://shoppinga.herokuapp.com/product/product-by-category/" + category ,
        // the URL for the request
        type: "GET",
        // whether this is a POST or GET request
        dataType: "json",


        // the type of data we expect back
        success: function (responseJson) {
            var innerHtml = '';
            for(var i = 0; i < responseJson.Result.length; i++){
                innerHtml += '<div class="col-xs-12 col-md-6">';
                innerHtml += '<div class="prod-info-main prod-wrap clearfix">';
                innerHtml += ' <div class="row">';
                innerHtml += '<div class="col-md-5 col-sm-12 col-xs-12">';
                innerHtml += '<div class="product-image">';
                innerHtml += '<img src="' + responseJson.Result[i].imagePath1 + '" class="img-responsive rotprod customImage">';
                innerHtml += '<span class="tag2 hot">';
                innerHtml += 'HOT' +
                    '</span>'+
                    '</div>'+
                    '</div>' +
                    '<div class="col-md-7 col-sm-12 col-xs-12">' +
                    '<div class="product-deatil">'+
                    '<h5 class="name">'+
                    '<a href="#">'+
                    responseJson.Result[i].title +
                    '</a>';
                innerHtml += '<a href="#">' +
                    '<span>Danh mục sản phẩm</span>' +
                    '</a>' +

                    '</h5>' +
                    '<p class="price-container">'+
                    '<span>' + responseJson.Result[i].price + '</span>' +
                    '</p>' +
                    '<span class="tag1"></span>'+
                    '</div>' +
                    '<div class="description">'+
                    '<p> ' + responseJson.Result[i].description + '</p>'+
                    '</div>'+
                    '<div class="product-info smart-form">'+
                    '<div class="row">'+
                    '<div class="col-md-12">'+
                    '<a href="/product/' + responseJson.Result[i]._id + '" class="btn btn-info"><span>Chi tiết...</span></a>' +
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+

                    '</div>'+

                    '</div>'+


                    '</div>';
            }

            $('#contentProduct').html(innerHtml);
            console.log(responseJson.TotalPage);
            paginButton(pageIndex, responseJson.TotalPage);
        },
        error: function (xhr, status) {
            // code run if request fails; raw request and status
            console.log("Sorry, there was a problem!");
        },
        complete: function (xhr, status) {  	// code to run regardless of success or failure
            console.log("The request is complete!");
        }
    })
}

function paginButton(pageIndex, totalPage){
    $('#pagingGroup').empty();
          var innerHtml = '';

        innerHtml +='<a class="btn current" onclick="loadByPage(' + 0 + ')">' + 'Đầu' +'</a>';
        innerHtml += pageIndex <= 0? '<a style="font-weight: bold; font-size: 20px" class="btn current" onclick="loadByPage(' + parseInt(0) + ')">' + '<<' +'</a>' : '<a style="font-weight: bold; font-size: 20px" class="btn current" onclick="loadByPage(' + parseInt(pageIndex - 1) + ')">' + '<<' +'</a>';
        innerHtml +='<a style="font-weight: bold; font-size: 20px" class="btn current disabled" disabled="">' + parseInt( pageIndex + 1) +'</a>';
        innerHtml += pageIndex >= totalPage?'<a style="font-weight: bold; font-size: 20px" class="btn current" onclick="loadByPage(' + parseInt(totalPage - 1) + ')">' + '>>' +'</a>' : '<a style="font-weight: bold; font-size: 20px" class="btn current" onclick="loadByPage(' + parseInt(pageIndex + 1) + ')">' + '>>' +'</a>';
        innerHtml +='<a class="btn current" onclick="loadByPage(' + parseInt(totalPage - 1) + ')">' + 'Cuối' +'</a>';

        $('#pagingGroup').html(innerHtml);
}

