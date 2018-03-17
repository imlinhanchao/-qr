window.onload = function () {
    var query = window.query.list();
    var content = query.q;
    var title = query.t || '二维码生成';
    var size = parseInt(query.s) || 300;
    document.title = title;
    qrcode(document.getElementById("qr"), content, size);
    if (query.r) {
        history.replaceState({ 'qrcode': content }, title, '/');
    }
}

function qrcode(ele, text, size) {
    size = size || 300;
    if (window.innerWidth < size) size = window.innerWidth - 50;
    if (window.innerHeight < size) size = window.innerHeight - 50;
    var width = size;
    var height = size;
    ele.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" \
    xmlns:xlink="http://www.w3.org/1999/xlink" width="' + width +
        '" height="' + height + '">\
        <g id="qrcode"/>\
    </svg>';
    var qrcode = new QRCode(document.getElementById('qrcode'), {
        text: text,
        width: width,
        height: height,
        useSVG: true
    });
    document.getElementById('wrapper').style.height = height + 'px';
}

window.query = {
    list: function () {
        var url = location.search;
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    },
    get: function (key) {
        var result = location.search.match(new RegExp("[\?\&]" + key + "=([^\&]+)", "i"));
        if (result == null || result.length < 1) {
            return "";
        }
        return result[1];
    }
}