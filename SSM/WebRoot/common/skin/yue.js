function Xmlhttp_FY() {

    var http_request;
    if (window.XMLHttpRequest) {
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType("text/xml");
        }
    }
    else if (window.ActiveXObject) {
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) { }
        }
    }
    if (!http_request) {
        window.alert("can't create XMLHttpRequest object.");
        return null;
    }
    return http_request;
}
//验证码
function yzmzs(img_id) {

    var xhttp = new Xmlhttp_FY();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState > 0 && xhttp.readyState <= 3) {

        }
        if (xhttp.readyState == 4 && (xhttp.status == 200 || window.location.href.indexOf("http") == -1)) {
            // document.getElementById("myDiv").innerHTML = xhttp.responseText;
            // alert(4);
            var myDate = new Date();

            img_id.src = "ValidateCode.aspx?id" + myDate.toLocaleString();
            // alert(img_id.src);
            // alert(img_id.src);
            //addadd(xhttp.responseText)
            xhttp.abort();
            xhttp = null;
        }
    }
    xhttp.open("get", "ValidateCode.aspx", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send(null);
}
//留言ajax
function feedb_add(state) {

    xhttp = Xmlhttp_FY();
    xhttp.onreadystatechange = function() {

        if (xhttp.readyState > 0 && xhttp.readyState <= 3) {

        }
        if (xhttp.readyState == 4 && (xhttp.status == 200 || window.location.href.indexOf("http") == -1)) {

            Alert_login(xhttp.responseText);
            xhttp.abort();
            xhttp = null;
        }
    }

    var SendBody = "txt1=" + encodeURIComponent(encodeURIComponent(document.getElementById("txt1").value));
    SendBody += "&txt2=" + encodeURIComponent(encodeURIComponent(document.getElementById("txt2").value));
    SendBody += "&txt3=" + encodeURIComponent(encodeURIComponent(document.getElementById("txt3").value));
    SendBody += "&txt4=" + encodeURIComponent(encodeURIComponent(document.getElementById("txt4").value));
    SendBody += "&txt5=" + encodeURIComponent(encodeURIComponent(document.getElementById("txt5").value));
    SendBody += "&txt6=" + encodeURIComponent(encodeURIComponent(document.getElementById("txt6").value));
    SendBody += "&txt7=" + encodeURIComponent(encodeURIComponent(document.getElementById("txt7").value));
    SendBody += "&yzm=" + encodeURIComponent(encodeURIComponent(document.getElementById("yzm").value));
    SendBody += "&state=" + state;


    xhttp.open("post", "ashx/feed.ashx", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send(SendBody);
}
function login_wb() {

    xhttp = Xmlhttp_FY();
    xhttp.onreadystatechange = function() {

        if (xhttp.readyState > 0 && xhttp.readyState <= 3) {

        }
        if (xhttp.readyState == 4 && (xhttp.status == 200 || window.location.href.indexOf("http") == -1)) {

            Alert_login(xhttp.responseText);
            xhttp.abort();
            xhttp = null;
        }
    }

    var SendBody = "txt1=" + encodeURIComponent(encodeURIComponent(document.getElementById("menuser").value));
    SendBody += "&txt2=" + encodeURIComponent(encodeURIComponent(document.getElementById("menpwd").value));
    xhttp.open("post", "ashx/login.ashx", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send(SendBody);
}
function pwd_wb() {

    xhttp = Xmlhttp_FY();
    xhttp.onreadystatechange = function() {

        if (xhttp.readyState > 0 && xhttp.readyState <= 3) {

        }
        if (xhttp.readyState == 4 && (xhttp.status == 200 || window.location.href.indexOf("http") == -1)) {
            Alert_pwd(xhttp.responseText);
            xhttp.abort();
            xhttp = null;
        }
    }

    var SendBody = "txt1=" + encodeURIComponent(encodeURIComponent(document.getElementById("menuser").value));
    xhttp.open("post", "ashx/pwd.ashx", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send(SendBody);
}
function members_add() {

    xhttp = Xmlhttp_FY();
    xhttp.onreadystatechange = function() {

        if (xhttp.readyState > 0 && xhttp.readyState <= 3) {

        }
        if (xhttp.readyState == 4 && (xhttp.status == 200 || window.location.href.indexOf("http") == -1)) {

            Alert_login(xhttp.responseText);
            xhttp.abort();
            xhttp = null;
        }
    }

    var SendBody = "txt1=" + encodeURIComponent(encodeURIComponent(document.getElementById("txt1").value));
    SendBody += "&txt2=" + encodeURIComponent(encodeURIComponent(document.getElementById("txt2").value));
    SendBody += "&txt4=" + encodeURIComponent(encodeURIComponent(document.getElementById("txt4").value));
    SendBody += "&txt5=" + encodeURIComponent(encodeURIComponent(document.getElementById("txt5").value));
    SendBody += "&txt6=" + encodeURIComponent(encodeURIComponent(document.getElementById("txt6").value));
    SendBody += "&txt7=" + encodeURIComponent(encodeURIComponent(document.getElementById("txt7").value));
    SendBody += "&txt8=" + encodeURIComponent(encodeURIComponent(document.getElementById("txt8").value));
    SendBody += "&yzm=" + encodeURIComponent(encodeURIComponent(document.getElementById("yzm").value));


    xhttp.open("post", "ashx/members.ashx", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send(SendBody);
}

//退出
function login_exit() {
    xhttp = Xmlhttp_FY();
    xhttp.onreadystatechange = function() {

        if (xhttp.readyState > 0 && xhttp.readyState <= 3) {

        }
        if (xhttp.readyState == 4 && (xhttp.status == 200 || window.location.href.indexOf("http") == -1)) {
            history.go(0);
            xhttp.abort();
            xhttp = null;
        }
    }
    xhttp.open("post", "ashx/out_exit.ashx", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send("null");
}
