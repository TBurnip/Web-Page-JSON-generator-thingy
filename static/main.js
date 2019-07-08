var data
var pageselector

var page

var filename
var title
var type
var descp
var info
var subcatselector

var subcat

var namebox
var link


function load() {
    pageselector = document.getElementById("pageselector")
    filename = document.getElementById("filename")
    title = document.getElementById("title")
    type = document.getElementById("typeselector")
    descp = document.getElementById("descp")
    info = document.getElementById("info")
    subcatselector = document.getElementById("subcatselector")
    namebox = document.getElementById("name")
    link = document.getElementById("link")

    getrequest("/data.json", {}, function (r) {
        resp = JSON.parse(r.responseText);
        console.log(resp["Page"])
        data = resp
        fillpageselector(data)
        pageselector.selectedIndex = 0
        pageselectorchange(pageselector)
    })
}

function fillpageselector(data) {
    html = ""
    data["Page"].forEach(page => {
        html += "<option value=\"" + page["filename"] + "\">" + page["filename"] + "</option>"
    });
    pageselector.innerHTML = html
}

function removepage() {
    data["Page"].splice(index,1)
    fillpageselector(data)
}

function addpage() {
    f = prompt("What should be the filename for the new page?")
    data["Page"].push({"filename":f,"title":"","type":"category","descp":"","info":""})
    fillpageselector(data)
    pageselector.selectedIndex = data["Page"].length - 1
    pageselectorchange(pageselector)
}

function pageselectorchange(t) {
    updatepage()
    index = t.selectedIndex
    page = data["Page"][index]
    filename.value = page["filename"]
    title.value = page["title"]
    type.value = page["type"]
    descp.value = page["descp"]
    info.value = page["info"]

    namebox.value = ""
    link.value = ""

    fillsubcat()
}

function fillsubcat() {
    subcatselector.innerHTML = ""
    if (page["subcats"] != undefined) {
        page["subcats"].forEach(subcat => {
            subcatselector.innerHTML += "<option value=\"" + subcat["link"] + "\">" + subcat["link"] + "</option>"
            namebox.value = subcat["name"]
            link.value = subcat["link"]
        });
    }
}

function updatepage() {
    if (page != undefined) {
        page["filename"] = filename.value
        page["title"] = title.value
        page["type"] = type.value
        page["descp"] = descp.value
        page["info"] = info.value
        
    }
}

function subcatselectorchange(t) {
    updatesubcat()
    index = t.selectedIndex
    subcat = page["subcats"][index]
    namebox.value = subcat["name"]
    link.value = subcat["link"]
}

function updatesubcat(params) {
    if (subcat != undefined) {
        subcat["name"] = namebox.value
        subcat["link"] = link.value
    }
}

function removesubcat() {
    page["subcats"].splice(index,1)
    fillsubcat()
    updatesubcat()
}

function addsubcat() {
    linkname = prompt("What should be the link for the new subcat?")
    page["subcats"].push({"name":"","link":linkname})
    fillsubcat()
    subcatselector.selectedIndex = page["subcats"].length - 1
    subcatselectorchange(subcatselector)
}

function exporttojson() {
    jsondata = document.getElementById("jsondata")
    jsondata.value = JSON.stringify(data)
}

function improtfromjson() {
    jsondata = document.getElementById("jsondata")
    data = JSON.parse(jsondata.value)
}