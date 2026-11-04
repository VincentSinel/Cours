function toggleMenu()
{
    let menu = document.getElementById("menu");
    menu.classList.toggle("asideshow");
}

// Selecting the iframe element
var frame = document.getElementById("Iframe");
var lastselected = null;

var SelectedChapter = null
var CustomDownloadButtons = []
    
frame.addEventListener("load", function() { LoadFrame() })
frame.contentWindow.addEventListener("page_content_loaded", function() { ReajustIframe(); })
window.addEventListener("load", function(){ ShowCollegeSelect(); CreatePDFButton(); GetCurrentHash(); })
window.addEventListener("resize", function() { ReajustIframe() })

function ReajustIframe()
{
    if (frame.contentWindow.document.documentURI == "about:blank") return;
    frame.style.height = frame.contentWindow.document.body.scrollHeight + 120 + 'px';
}

function ClicChapter(folder, a, element)
{
    document.location.hash = College_Selected + "#" + folder + "#" + element.id.toString();

    SelectedChapter = element;
    document.getElementById("noiframe").style.display = "none"

    if (element.page.endsWith(".html"))
        frame.src = '/Cours/' + folder + '/' + element.page
    else
        frame.src = '/Cours/PageCours.html#' + folder + '/' + element.page.substr(0, element.page.length - 11)

    let iframedoc = frame.contentDocument || frame.contentWindow.document;
    if (iframedoc.readyState == "complete")
        LoadFrame();

    if (lastselected != null)
        lastselected.classList.remove("selected")
    lastselected = a
    lastselected.classList.add("selected")
    window.scrollTo(0, 0);
    menu.classList.remove("asideshow");
}

function LoadFrame()
{
    if (SelectedChapter == null) return;
    SetDownloadButton(SelectedChapter.page, SelectedChapter);
    SetTitle(SelectedChapter)
    ReajustIframe()
    frame.contentWindow.addEventListener("page_content_loaded", function() { ReajustIframe(); })
}

function SetTitle(chapter)
{
    let title = "";
    if (chapter.hasOwnProperty("chapter"))
        title = chapter.chapter;
    else
        title = "Chapitre " + chapter.id.toString();
    let iframedoc = frame.contentDocument || frame.contentWindow.document;
    if (iframedoc.getElementById("ChapitreNumero") == null) return;
    iframedoc.getElementById("ChapitreNumero").innerHTML = title;
    iframedoc.getElementById("ChapitreNom").innerHTML = "- " + chapter.nom;
    let element = iframedoc.getElementById("ChapitreParent")
    if (chapter.hasOwnProperty("group"))
    {
        if (element)
        {
            element.innerHTML = chapter.group;
            element.classList.remove("hidden");
        }
        else if (element != null)
            element.classList.add("hidden");
    }
    else
    {
        if (element)
        {
            element.classList.add("hidden");
        }
    }
    iframedoc.title = title + " - " + chapter.nom;
}

function CreatePDFButton()
{
    
    let but = document.getElementById("PdfButton");
    but.target="_blank";
    but.download="Cours complet.pdf"
    
    but = document.getElementById("PdfDefault");
    but.target="_blank";
    but.download="Cours complet.pdf"

    but = document.getElementById("PdfButton2");
    but.target="_blank";
    but.download="Cours à trous.pdf"

    but = document.getElementById("DocxButton");
    but.target="_blank";
    but.download="Cours complet.docx"

    but = document.getElementById("DocxButton2");
    but.target="_blank";
    but.download="Cours à trous.docx"

    but = document.getElementById("OdtButton");
    but.target="_blank";
    but.download="Cours complet.odt"

    but = document.getElementById("OdtButton2");
    but.target="_blank";
    but.download="Cours à trous.odt"

    but = document.getElementById("XlsxButton");
    but.target="_blank";
    but.download="Fichier excel.xlsx"

    but = document.getElementById("PdfButtonExo");
    but.target="_blank";
    but.download="Exercices.pdf"

    but = document.getElementById("DocxButtonAct");
    but.target="_blank";
    but.download="Activité d'introduction.docx"

    but = document.getElementById("PdfButtonAct");
    but.target="_blank";
    but.download="Activité d'introduction.pdf"

    but = document.getElementById("PdfButtonImg");
    but.target="_blank";
    but.download="Image cours.pdf"
}

function SetDownloadButton(path, element)
{
    let but_default = document.getElementById("PdfDefault");
    let but_pdf1 = document.getElementById("PdfButton");
    let but_pdf2 = document.getElementById("PdfButton2");
    let but_docx1 = document.getElementById("DocxButton");
    let but_docx2 = document.getElementById("DocxButton2");
    let but_odt1 = document.getElementById("OdtButton");
    let but_odt2 = document.getElementById("OdtButton2");
    let but_xlsx = document.getElementById("XlsxButton");
    let but_exo = document.getElementById("PdfButtonExo");
    let but_actx = document.getElementById("DocxButtonAct");
    let but_act = document.getElementById("PdfButtonAct");
    let but_img = document.getElementById("PdfButtonImg");
    but_default.classList.add("deactivate")
    but_pdf1.classList.add("deactivate")
    but_pdf2.classList.add("deactivate")
    but_docx1.classList.add("deactivate")
    but_docx2.classList.add("deactivate")
    but_odt1.classList.add("deactivate")
    but_odt2.classList.add("deactivate")
    but_xlsx.classList.add("deactivate")
    but_exo.classList.add("deactivate")
    but_actx.classList.add("deactivate")
    but_act.classList.add("deactivate")
    but_img.classList.add("deactivate")

    CustomDownloadButtons.forEach( b => {
        document.getElementById("DownloadButtons").removeChild(b);
    })
    CustomDownloadButtons = []

    if (element.hasOwnProperty("download"))
    {
        let list = element.download;

        // PDF complet
        if (list.hasOwnProperty("pdf"))
        { 
            but_pdf1.href = list.pdf;
            but_pdf1.download= list.pdf.substr(list.pdf.lastIndexOf("/") + 1);
            but_pdf1.classList.remove("deactivate")
        }
        else
        {
            var pageUrl = encodeURIComponent("https://vsinel.fr" + path);
            var opts = ['save-link=' + pageUrl, 'pageOrientation=portrait', 'pageSize=a4', 'pageMargin=2cm'];
            but_default.href = 'https://www.sejda.com/html-to-pdf?' + opts.join('&');
            but_default.classList.remove("deactivate")
        }

        // PDF trou
        if (list.hasOwnProperty("pdf_trou"))
        { 
            
            but_pdf2.href = list.pdf_trou;
            but_pdf2.download= list.pdf_trou.substr(list.pdf_trou.lastIndexOf("/") + 1);
            but_pdf2.classList.remove("deactivate")
        }
        
        // DOCX complet
        if (list.hasOwnProperty("docx"))
        { 
            but_docx1.href = list.docx;
            but_docx1.download= list.docx.substr(list.docx.lastIndexOf("/") + 1);
            but_docx1.classList.remove("deactivate")
        }

        // DOCX trou
        if (list.hasOwnProperty("docx_trou"))
        { 
            but_docx2.href = list.docx_trou;
            but_docx2.download= list.docx_trou.substr(list.docx_trou.lastIndexOf("/") + 1);
            but_docx2.classList.remove("deactivate")
        }
        
        // ODT complet
        if (list.hasOwnProperty("odt"))
        { 
            but_odt1.href = list.odt;
            but_odt1.download= list.odt.substr(list.odt.lastIndexOf("/") + 1);
            but_odt1.classList.remove("deactivate")
        }

        // ODT trou
        if (list.hasOwnProperty("odt_trou"))
        { 
            but_odt2.href = list.odt_trou;
            but_odt2.download= list.odt_trou.substr(list.odt_trou.lastIndexOf("/") + 1);
            but_odt2.classList.remove("deactivate")
        }

        // XLSX
        if (list.hasOwnProperty("xlsx"))
        {
            but_xlsx.href = list.xlsx;
            but_xlsx.download= list.xlsx.substr(list.xlsx.lastIndexOf("/") + 1);
            but_xlsx.classList.remove("deactivate")
        }

        // Exercices
        if (list.hasOwnProperty("exo"))
        {
            but_exo.href = list.exo;
            but_exo.download= list.exo.substr(list.exo.lastIndexOf("/") + 1);
            but_exo.classList.remove("deactivate")
        }

        // Activité Docx
        if (list.hasOwnProperty("actx"))
        {
            but_actx.href = list.actx;
            but_actx.download= list.actx.substr(list.act.lastIndexOf("/") + 1);
            but_actx.classList.remove("deactivate")
        }

        // Activité
        if (list.hasOwnProperty("act"))
        {
            but_act.href = list.act;
            but_act.download= list.act.substr(list.act.lastIndexOf("/") + 1);
            but_act.classList.remove("deactivate")
        }

        // Image PDF
        if (list.hasOwnProperty("img"))
        {
            but_img.href = list.img;
            but_img.download= list.img.substr(list.img.lastIndexOf("/") + 1);
            but_img.classList.remove("deactivate")
        }

        // Custom file
        if (list.hasOwnProperty("custom"))
        {
            for(let i = 0; i < list.custom.length; i++)
            {
                let data = list.custom[i]
                let ext = data.substr(data.lastIndexOf(".") + 1)
                let name = data.substr(data.lastIndexOf("/") + 1)
                name = name.substr(0, name.length - ext.length - 1)
                let a = createDownloadButton(name, ext)
                a.href = data
                CustomDownloadButtons.push(a);
                document.getElementById("DownloadButtons").appendChild(a)
            }
        }
    
    }
    else
    {
        var pageUrl = encodeURIComponent("https://vsinel.fr" + path);
        var opts = ['save-link=' + pageUrl, 'pageOrientation=portrait', 'pageSize=a4', 'pageMargin=2cm'];
        but_default.href = 'https://www.sejda.com/html-to-pdf?' + opts.join('&');
        but_default.classList.remove("deactivate")
    }
}

function createDownloadButton(text, type = "pdf")
{
    let a = document.createElement("a");
    a.classList.add("unselectable");
    a.target = "_blank";

    let div = document.createElement("div")
    div.classList.add("flexparameters");
    a.appendChild(div)
    
    let txt = text;
    if(type == "pdf")
    {
        txt += "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\" viewBox=\"0 0 213.51 262.5\" width=\"27\" height=\"33\"><path style=\"fill: #ff2116;\" d=\"M27.11,0A27.16,27.16,0,0,0,0,27.12V235.38A27.15,27.15,0,0,0,27.11,262.5H186.36a27.15,27.15,0,0,0,27.11-27.12V64.13a22.38,22.38,0,0,0-1.75-9.89,27.38,27.38,0,0,0-5.36-7.76l0,0L166.82,7.69l-.07-.06a31,31,0,0,0-8.37-5.36,30.55,30.55,0,0,0-12-2.26H27.11Z\"/><path style=\"fill: #f5f5f5;\" d=\"M27.11,8.91H146.6a25.64,25.64,0,0,1,8.27,1.54,22.94,22.94,0,0,1,5.76,3.64l0,0,39.41,38.67a21.55,21.55,0,0,1,3.53,5.08,19.18,19.18,0,0,1,1,5.89,1.15,1.15,0,0,1,0,.19V235.38a18.06,18.06,0,0,1-18.2,18.21H27.11a18.07,18.07,0,0,1-18.2-18.21V27.12A18.07,18.07,0,0,1,27.11,8.91Z\"/><path style=\"fill: #ff2116;\" d=\"M148.1,109.4L148.1,126.8L65.4,126.8L65.4,109.4L49.5,109.4L49.5,142.7L164,142.7L164,109.4Z M107.1,119.6L138.8,64.6L123,64.6L123,39.2L91.2,39.2L91.2,64.6L75.4,64.6Z\"/><path style=\"fill: #2c2c2c;\" d=\"M63.73,184.67h10a26.93,26.93,0,0,1,7.74.92,9,9,0,0,1,5,4,13,13,0,0,1,2,7.39,13.41,13.41,0,0,1-1.64,6.83,9.66,9.66,0,0,1-4.45,4.12c-1.84.84-4.69,1.27-8.54,1.27H70.38v15.69H63.73Zm6.65,5.15v14h3.3q4.41,0,6.09-1.65t1.71-5.36a8.06,8.06,0,0,0-1.12-4.47,4.58,4.58,0,0,0-2.47-2.12,15.25,15.25,0,0,0-4.21-.42Z\"/><path style=\"fill: #2c2c2c;\" d=\"M93.55,184.67h9q6.55,0,10.48,2.33a14.43,14.43,0,0,1,5.94,6.92,24.78,24.78,0,0,1,2,10.18,28.35,28.35,0,0,1-1.82,10.51,16.68,16.68,0,0,1-5.54,7.42q-3.71,2.83-10.59,2.83H93.55ZM100.2,190v29.53H103q5.81,0,8.42-4T114,204.78Q114,190,103,190Z\"/><path style=\"fill: #2c2c2c;\" d=\"M127.43,184.67h22.32V190H134.09v12h12.54v5.33H134.09v17.52h-6.66Z\"/></svg>"
    }
    if (type == "docx")
    {
        txt += "<svg version=\"1.1\" id=\"Calque_1\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 27 33\" width=\"27\" height=\"33\"><path style=\"fill:#295497\" d=\"M3.5,0C1.6,0,0.1,1.5,0.1,3.4v26.2c0,1.9,1.5,3.4,3.4,3.4h20c1.9,0,3.4-1.5,3.4-3.4V8.1c0-0.4-0.1-0.9-0.2-1.2c-0.2-0.4-0.4-0.7-0.7-1l0,0l-5-4.9l0,0c-0.3-0.3-0.7-0.5-1.1-0.7C19.5,0.1,19,0,18.5,0L3.5,0L3.5,0z\"/><path style=\"fill:#F5F5F5\" d=\"M3.5,1.1h15c0.4,0,0.7,0.1,1,0.2c0.3,0.1,0.5,0.3,0.7,0.5l0,0l5,4.9c0.2,0.2,0.3,0.4,0.4,0.6c0.1,0.2,0.1,0.5,0.1,0.7c0,0,0,0,0,0v21.6c0,1.3-1,2.3-2.3,2.3c0,0,0,0,0,0h-20c-1.3,0-2.3-1-2.3-2.3c0,0,0,0,0,0V3.4C1.2,2.2,2.2,1.1,3.5,1.1C3.5,1.1,3.5,1.1,3.5,1.1z\"/><path style=\"fill:#295497\" d=\"M18.7,13.8v2.2H8.3v-2.2h-2v4.2h14.4v-4.2H18.7z M13.5,15l4-6.9h-2V4.9h-4v3.2h-2L13.5,15z\"/><path style=\"fill:#2C2C2C\" d=\"M6.4,23h1.3c1.3,0,1.8,0.9,1.8,2.5c0,1.8-0.5,2.7-1.9,2.7H6.4V23z M7.3,27.6h0.4c0.8,0,1.1-0.6,1.1-2c0-1.3-0.3-1.8-1.1-1.8H7.3V27.6z\"/><path style=\"fill:#2C2C2C\" d=\"M13.4,25.6c0,1.9-0.5,2.7-1.7,2.7c-1.1,0-1.6-0.9-1.6-2.7c0-1.8,0.6-2.6,1.7-2.6C12.9,23,13.4,23.8,13.4,25.6z M11,25.6c0,1.3,0.2,2.1,0.8,2.1c0.6,0,0.8-0.7,0.8-2.1c0-1.3-0.2-1.9-0.8-1.9C11.2,23.7,11,24.3,11,25.6z\"/><path style=\"fill:#2C2C2C\" d=\"M17.1,26.8c0,0.3-0.1,1.6-1.5,1.6c-1.5,0-1.6-1.4-1.6-2.7c0-1.6,0.5-2.7,1.7-2.7c1.3,0,1.4,1.2,1.5,1.6h-0.8c0-0.2,0-0.9-0.7-0.9c-0.7,0-0.8,0.9-0.8,2c0,1,0.1,2,0.8,2c0.6,0,0.7-0.7,0.7-0.9H17.1z\"/><path style=\"fill:#2C2C2C\" d=\"M19.8,28.3l-0.8-2h0l-0.9,2h-0.9l1.3-2.7L17.3,23h0.9l0.8,1.8l0,0l0.8-1.8h0.9l-1.2,2.5l1.3,2.8H19.8z\"/></svg>"
    }
    if (type == "odt")
    {
        txt += "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 27 33\" width=\"27\" height=\"33\"><path style=\"fill:#fb6400;\" d=\"M3.5,0C1.6,0,0.1,1.5,0.1,3.4v26.2c0,1.9,1.5,3.4,3.4,3.4h20c1.9,0,3.4-1.5,3.4-3.4V8.1c0-0.4-0.1-0.9-0.2-1.2 c-0.2-0.4-0.4-0.7-0.7-1l0,0L21,1l0,0c-0.3-0.3-0.7-0.5-1.1-0.7C19.5,0.1,19,0,18.5,0H3.5L3.5,0z\"/><path style=\"fill:#F5F5F5;\" d=\"M3.5,1.1h15c0.4,0,0.7,0.1,1,0.2s0.5,0.3,0.7,0.5l0,0l5,4.9c0.2,0.2,0.3,0.4,0.4,0.6s0.1,0.5,0.1,0.7l0,0v21.6 c0,1.3-1,2.3-2.3,2.3l0,0h-20c-1.3,0-2.3-1-2.3-2.3l0,0V3.4C1.2,2.2,2.2,1.1,3.5,1.1L3.5,1.1z\"/><path style=\"fill:#fb6400;\" d=\"M18.7,13.8V16H8.3v-2.2h-2V18h14.4v-4.2H18.7z M13.5,15l4-6.9h-2V4.9h-4v3.2h-2L13.5,15z\"/><path style=\"fill:#2C2C2C;\" d=\"M11.8,23h1.3c1.3,0,1.8,0.9,1.8,2.5c0,1.8-0.5,2.7-1.9,2.7h-1.2V23z M12.7,27.6h0.4c0.8,0,1.1-0.6,1.1-2 c0-1.3-0.3-1.8-1.1-1.8h-0.4V27.6z\"/><path style=\"fill:#2C2C2C;\" d=\"M11.2,25.6c0,1.9-0.5,2.7-1.7,2.7c-1.1,0-1.6-0.9-1.6-2.7c0-1.8,0.6-2.6,1.7-2.6S11.2,23.8,11.2,25.6z M8.8,25.6c0,1.3,0.2,2.1,0.8,2.1s0.8-0.7,0.8-2.1c0-1.3-0.2-1.9-0.8-1.9S8.8,24.3,8.8,25.6z\"/><path style=\"fill:#2C2C2C;\" d=\"M15.4,23.7V23h3.5v0.7H15.4z M16.8,28.3V23h0.7v5.3H16.8z\"/></svg>"
    }
    if (type == "xlsx")
    {
        txt += "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 26.8 33\" width=\"27\" height=\"33\"><path fill=\"#4C9D71\" d=\"M3.4,0C1.5,0,0,1.5,0,3.4v26.2C0,31.5,1.5,33,3.4,33h20c1.9,0,3.4-1.5,3.4-3.4V8.1c0-0.4-0.1-0.9-0.2-1.2c-0.2-0.4-0.4-0.7-0.7-1l0,0l-5-4.9l0,0c-0.3-0.3-0.7-0.5-1.1-0.7S18.9,0,18.4,0C18.4,0,3.4,0,3.4,0z\"/><path fill=\"#F5F5F5\" d=\"M3.4,1.1h15c0.4,0,0.7,0.1,1,0.2s0.5,0.3,0.7,0.5l0,0l5,4.9c0.2,0.2,0.3,0.4,0.4,0.6s0.1,0.5,0.1,0.7l0,0v21.6c0,1.3-1,2.3-2.3,2.3h-20c-1.3,0-2.3-1-2.3-2.3l0,0V3.4C1.1,2.2,2.1,1.1,3.4,1.1C3.4,1.1,3.4,1.1,3.4,1.1z\"/><path fill=\"#4C9D71\" d=\"M18.6,13.8V16H8.2v-2.2h-2V18h14.4v-4.2H18.6z M13.4,15l4-6.9h-2V4.9h-4v3.2h-2C9.4,8.1,13.4,15,13.4,15z\"/><polygon fill=\"#2D2D2D\" points=\"9,23 8,23 7.1,24.9 6.1,23 5.1,23 6.6,25.7 5.1,28.4 6.1,28.4 7.1,26.6 8,28.4 9,28.4 7.5,25.7\"/><polygon fill=\"#2D2D2D\" points=\"10.3,23 9.4,23 9.4,28.4 12.7,28.4 12.7,27.5 10.3,27.5\"/><path fill=\"#2D2D2D\" d=\"M14.9,23.8c0.2,0,0.3,0,0.5,0.1c0.2,0.1,0.3,0.2,0.5,0.4l0.1,0.1l0.6-0.7l-0.1-0.1c-0.2-0.2-0.5-0.4-0.7-0.5c-0.3-0.1-0.5-0.2-0.9-0.2c-0.5,0-0.8,0.1-1.1,0.4c-0.3,0.3-0.4,0.6-0.4,1.1c0,0.4,0.1,0.7,0.3,0.9c0.2,0.2,0.4,0.4,0.8,0.6l0.8,0.4c0.2,0.1,0.4,0.3,0.4,0.6c0,0.2-0.1,0.4-0.2,0.5c-0.1,0.1-0.3,0.2-0.6,0.2c-0.2,0-0.4,0-0.6-0.1c-0.2-0.1-0.4-0.1-0.7-0.3l-0.1-0.1l-0.1,0.9l0.1,0c0.2,0.1,0.4,0.2,0.7,0.2c0.2,0,0.5,0.1,0.8,0.1c0.6,0,1-0.1,1.3-0.4c0.3-0.3,0.4-0.6,0.4-1.1c0-0.4-0.1-0.7-0.3-0.9c-0.2-0.2-0.5-0.5-0.8-0.6L14.7,25c-0.1-0.1-0.3-0.2-0.3-0.3c-0.1-0.1-0.1-0.2-0.1-0.4c0-0.2,0.1-0.4,0.2-0.5C14.6,23.9,14.7,23.8,14.9,23.8z\"/><polygon fill=\"#2D2D2D\" points=\"19.3,25.7 20.8,23 19.8,23 18.8,24.9 17.9,23 16.9,23 18.4,25.7 16.9,28.4 17.9,28.4 18.8,26.6 19.7,28.3 19.8,28.4 20.8,28.4\"/></svg>"
    }

    div.innerHTML = txt;

    return a;
}

function SelectCollege(name)
{
    College_Selected = name;
    document.location.hash = name;

    document.getElementById("HoverMenu").style.display = "none";
    document.getElementById("titrepagecollege").className = "";
    document.getElementById("titrepagedate").className = "";
    document.getElementById("titrepagecollege").classList.add("titrepagecollege_" + name);
    document.getElementById("titrepagedate").classList.add("titrepagedate_" + name);
    CreateNavBar()
}

function ShowCollegeSelect()
{
    document.getElementById("HoverMenu").style.display = "flex";

    document.getElementById("noiframe").style.display = "block"

    for(var i = 2; i < document.getElementById("HoverMenu").childElementCount; i++)
    {
        document.getElementById("HoverMenu").getElementsByClassName("hovermenu_block")[i].classList.add("hidden");
    }
    document.getElementById("HoverMenu").getElementsByClassName("hovermenu_block")[1].classList.remove("hidden")

    SelectedChapter = null;

    frame.src = ""
    frame.style.height = 0 + 'px';
}

function SelectClasse(id)
{
    // var v1 = document.getElementById("Cours3emePM");
    var w1 = document.getElementById("Cours3eme");
    var x1 = document.getElementById("Cours4eme");
    var y1 = document.getElementById("Cours5eme");
    var z1 = document.getElementById("Cours6eme");
    // var v2 = document.getElementById("niveau3PM");
    var w2 = document.getElementById("niveau3");
    var x2 = document.getElementById("niveau4");
    var y2 = document.getElementById("niveau5");
    var z2 = document.getElementById("niveau6");
    // var list = [v1, w1, x1, y1, z1]
    var list = [w1, x1, y1, z1]
    // var list2 = [v2, w2, x2, y2, z2]
    var list2 = [w2, x2, y2, z2]
    i = 0;
    list.forEach(element => {
        if (i == id)
        {
            list2[i].classList.add("selected");
            element.style.visibility = "visible";
            element.style.overflowY = "auto";
            element.style.height = "auto";
        }
        else
        {
            list2[i].classList.remove("selected");
            element.style.visibility = "hidden";
            element.style.overflowY = "hidden";
            element.style.height = "0px";
        }
        i++;
    });
}

function CreateNavBar()
{
    // var v = document.getElementById("Cours3emePM");
    var w = document.getElementById("Cours3eme");
    var x = document.getElementById("Cours4eme");
    var y = document.getElementById("Cours5eme");
    var z = document.getElementById("Cours6eme");
    // v.innerHTML = '';
    w.innerHTML = '';
    x.innerHTML = '';
    y.innerHTML = '';
    z.innerHTML = '';
    // v.style.visibility = "hidden";
    w.style.visibility = "hidden";
    x.style.visibility = "hidden";
    y.style.visibility = "hidden";
    z.style.visibility = "hidden";
    // CreateDiv(v, "troisiemePM", "3emePM")
    CreateDiv(w, "troisieme", "3eme")
    CreateDiv(x, "quatrieme", "4eme")
    CreateDiv(y, "cinquieme", "5eme")
    CreateDiv(z, "sixieme", "6eme")
    SelectClasse(3)
}

function CreateDiv(parent, name, folder)
{
    var list = ListeCours[name][College_Selected];
    for (let i = 0; i < list.length; i++) {
        const element = list[i];

        var a = document.createElement("div");
        a.classList.add("chapitrebutton")
        if (!element.ready)
        {
            a.classList.add("deactivated")
        }
        if (element.ready)
        {
            a.onclick = function() { 
                ClicChapter(folder, this, element);
            }
        }
        
        var b = document.createElement("div");
        b.className += "chapitrebuttonflex"

        var c = document.createElement("img");
        c.className += "chapitrebuttonimg";
        c.src = "/Images/Icone_Chapitres/Icones-"+ (element.icone.toString()).padStart(2, '0') + ".svg"
        
        var d = document.createElement("div");
        var e = document.createElement("p");
        e.className += "chapitrebuttonnumber"
        if (element.hasOwnProperty("chapter"))
            e.innerHTML = element.chapter;
        else
            e.innerHTML = "Chapitre " + element.id;

        var f = document.createElement("p");
        f.className += "chapitrebuttonname"
        f.innerHTML = element.nom;
        
        
        d.appendChild(e);
        d.appendChild(f);
        b.appendChild(c);
        b.appendChild(d);
        a.appendChild(b);
        parent.appendChild(a);
    }
}


function GetCurrentHash()
{
    var list = location.hash.split("#");
    if (list.length != 4) return;
    SelectCollege(list[1]);
    switch (list[2])
    {
        case "3eme":
            SelectClasse(0);
            SelectChapter("troisieme", list[2], list[3]);
            break;
        case "4eme":
            SelectClasse(1);
            SelectChapter("quatrieme", list[2], list[3]);
            break;
        case "5eme":
            SelectClasse(2);
            SelectChapter("cinquieme", list[2], list[3]);
            break;
        case "6eme":
            SelectClasse(3);
            SelectChapter("sixieme", list[2], list[3]);
            break;
    }
}

function SelectChapter(classe, folder, id)
{
    var list = ListeCours[classe][College_Selected];
    for (let i = 0; i < list.length; i++) {
        const cours = list[i];
        if (cours.id == id)
        {
            let element = document.getElementById("Cours" + folder).children[i];
            ClicChapter(folder, element, cours); 
            return
        }
    }
}