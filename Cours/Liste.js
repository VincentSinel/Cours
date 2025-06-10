function toggleMenu()
{
    let menu = document.getElementById("menu");
    menu.classList.toggle("asideshow");
}

// Selecting the iframe element
var frame = document.getElementById("Iframe");
var lastselected = null;

var SelectedChapter = null
    
frame.onload = function() { ReajustIframe() }
window.onload = function(){ ShowCollegeSelect(); CreatePDFButton() }
window.onresize = function() { ReajustIframe() }

function ReajustIframe()
{
    if (frame.contentWindow.document.documentURI == "about:blank") return;
    frame.style.height = frame.contentWindow.document.body.scrollHeight + 120 + 'px';
}

function ClicChapter(path, a, element)
{
    SelectedChapter = element;
    document.getElementById("noiframe").style.display = "none"
    frame.src = path
    if (lastselected != null)
        lastselected.classList.remove("selected")
    lastselected = a
    lastselected.classList.add("selected")
    window.scrollTo(0, 0);
    menu.classList.remove("asideshow");
    frame.addEventListener( "load", function() {
        SetDownloadButton(path, element);
        SetTitle(element)
    });
}

function SetTitle(chapter)
{
    if (chapter.hasOwnProperty("chapter"))
        frame.contentDocument.getElementById("ChapitreNumero").innerHTML = chapter.chapter;
    else
        frame.contentDocument.getElementById("ChapitreNumero").innerHTML = "Chapitre " + chapter.id.toString();
    frame.contentDocument.getElementById("ChapitreNom").innerHTML = "- " + chapter.nom;
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
    but_default.classList.add("deactivate")
    but_pdf1.classList.add("deactivate")
    but_pdf2.classList.add("deactivate")
    but_docx1.classList.add("deactivate")
    but_docx2.classList.add("deactivate")
    but_odt1.classList.add("deactivate")
    but_odt2.classList.add("deactivate")
    but_xlsx.classList.add("deactivate")
    but_exo.classList.add("deactivate")
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
    
    }
    else
    {
    var pageUrl = encodeURIComponent("https://vsinel.fr" + path);
    var opts = ['save-link=' + pageUrl, 'pageOrientation=portrait', 'pageSize=a4', 'pageMargin=2cm'];
    but_default.href = 'https://www.sejda.com/html-to-pdf?' + opts.join('&');
    but_default.classList.remove("deactivate")
    }
}

function SelectCollege(name)
{
    College_Selected = name;
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
    frame.src = ""
    frame.style.height = 120 + 'px';
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
                ClicChapter('/Cours/' + folder + '/' + element.page, this, element); }
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


