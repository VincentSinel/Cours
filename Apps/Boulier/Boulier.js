const TCOLONNE = 12

window.addEventListener("load", () => {ChangeSize(TCOLONNE, 0)});
const BOULE = '<svg viewBox="0 0 100 100" class="boule"><circle cx="50" cy="50" r="49" fill="currentColor" stroke="#442C40" stroke-width="2"/></svg><div class="empty"></div>'

// Esri color ramps - Metro Movement
// rgba(237, 81, 81, 1),rgba(20, 158, 206, 1),rgba(167, 198, 54, 1),rgba(158, 85, 156, 1),rgba(252, 146, 31, 1),rgba(255, 222, 62, 1),rgba(247, 137, 216, 1),rgba(183, 129, 74, 1),rgba(60, 175, 153, 1),rgba(107, 107, 214, 1),rgba(181, 71, 121, 1),rgba(127, 127, 127, 1)
const COLORS = ["rgba(237, 81, 81, 0.5)", "rgba(20, 158, 206, 0.5)", "rgba(167, 198, 54, 0.5)", "rgba(158, 85, 156, 0.5)", "rgba(252, 146, 31, 0.5)", "rgba(255, 222, 62, 0.5)", "rgba(247, 137, 216, 0.5)", "rgba(183, 129, 74, 0.5)", "rgba(60, 175, 153, 0.5)", "rgba(107, 107, 214, 0.5)", "rgba(181, 71, 121, 0.5)", "rgba(127, 127, 127, 0.5)"];

var tColonne = 0;
var unitpos = TCOLONNE-1;
var typeBoulier = 0;

function Generate(tcolonne, newt)
{
    tColonne = tcolonne;
    typeBoulier = newt;
    let nu = document.getElementById("numbers");
    let lu = document.getElementById("unitline");
    let l1 = document.getElementById("line1");
    let l2 = document.getElementById("line2");
    nu.innerHTML = "";
    lu.innerHTML = "";
    l1.innerHTML = "";
    l2.innerHTML = "";
    let d; let t;
    for (let i = 0; i < tcolonne; i++) {
        //Create numbers line.
        d = document.createElement("label");
        d.innerHTML = "0";
        if (i == unitpos) d.innerHTML = "0" + ",";
        d.setAttribute("value", 0);
        nu.appendChild(d);

        //Create unit button.
        d = document.createElement("div");
        d.classList.add("unitbutton");
        d.innerHTML = '<input type="radio" name="unit" id="unit' + i + '" checked><label for="unit' + i + '">U</label>'
        d.children[0].addEventListener("click", (event) => { ClicUnit(i, event)})
        lu.appendChild(d);
        
        //Create first line.
        d = document.createElement("div");
        d.classList.add("colonne");
        t = '<div class="empty emptyexpand"></div>';
        t += BOULE
        if (typeBoulier == 0) t += BOULE;
        d.innerHTML = t;
        d.style.color = COLORS[i % COLORS.length];
        l1.appendChild(d);

        //Create second line.
        d = document.createElement("div");
        d.classList.add("colonne");
        t = '<div class="empty emptyexpand"></div>';
        for( let i = 0 ; i < 4; i++) t += BOULE;
        if (typeBoulier == 0) t += BOULE;
        d.innerHTML = t;
        d.style.color = COLORS[i % COLORS.length];
        l2.appendChild(d);
    }

    l1.children[l1.children.length - 1].classList.add("unitcolor")
    l2.children[l2.children.length - 1].classList.add("unitcolor")

    let allboule = document.getElementsByClassName("boule");
    for(let i = 0; i < allboule.length; i++)
    {
        allboule[i].addEventListener("click", ClicBoule);
    }
}

function ClicUnit(id, e)
{
    let nu = document.getElementById("numbers");
    let l1 = document.getElementById("line1");
    let l2 = document.getElementById("line2");

    for (let i = 0; i < l1.children.length; i++) {
        l1.children[i].classList.remove("unitcolor")
        l2.children[i].classList.remove("unitcolor")

        let txt = nu.children[i];
        let a = parseInt(txt.getAttribute("value"));
        txt.innerHTML = a
    }
    l1.children[id].classList.add("unitcolor")
    l2.children[id].classList.add("unitcolor")

    let txt = nu.children[id];
    let a = parseInt(txt.getAttribute("value"));
    txt.innerHTML = a + ",";

    unitpos = id;
}

function ClicBoule(e)
{
    let b = e.target.parentNode;
    if (b.tagName != "svg") return;
    let c = b.parentNode;
    let line = c.parentNode;
    let children = Array.from(c.children);
    let id = children.indexOf(b);
    let fid = 0;
    for(i = 0; i < children.length; i+=2)
    {
        if (children[i].classList.contains("emptyexpand"))
        {
            fid = i;
            children[i].classList.remove("emptyexpand");
        }
    }
    let nu = document.getElementById("numbers");
    let col = Array.from(line.children).indexOf(c);
    let txt = nu.children[col];
    if (id > fid)
    {
        children[id+1].classList.add("emptyexpand");
        let a = parseInt(txt.getAttribute("value"));
        if (line.id == "line1") a += 5 * (id - fid + 1) / 2;
        if (line.id == "line2") a += 1 * (id - fid + 1) / 2;
        txt.setAttribute("value", a);
    }
    else
    {
        children[id-1].classList.add("emptyexpand");
        let a = parseInt(txt.getAttribute("value"));
        if (line.id == "line1") a -= 5 * (fid - id + 1) / 2
        if (line.id == "line2") a -= 1 * (fid - id + 1) / 2;
        txt.setAttribute("value", a);
    } 
    UpdateText(0, nu.children.length - 1);
}

function UpdateText(ret, id)
{
    let nu = document.getElementById("numbers");
    let txt = nu.children[id];
    let ptxt = nu.children[id- 1];
    let a = parseInt(txt.getAttribute("value"));
    if (ptxt != undefined)
    {
        txt.innerHTML = (a + ret) % 10
        if (id == unitpos) txt.innerHTML = txt.innerHTML + ",";
        UpdateText(Math.floor((a + ret) / 10), id-1)
        return;
    }
    else
    {
        txt.innerHTML = (a + ret)
        if (id == unitpos) txt.innerHTML = txt.innerHTML + ",";
    }
}

function AfficherNombre()
{
    document.getElementById("numbers").classList.toggle("hide");
}

function RemiseZero()
{
    Generate(tColonne, typeBoulier)
    let lu = document.getElementById("unitline");
    lu.children[unitpos].children[0].checked = true
    ClicUnit(unitpos, null)
}

function ChangeSize(value)
{
    document.getElementById("bouliersize").value = value;
    unitpos = value-1;
    Generate(value, typeBoulier);
}

function PleinEcran()
{
    let elem = document.body;
    if (!document.fullscreenElement) {
        elem.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
}

function ChangeType()
{
    typeBoulier = (typeBoulier + 1) % 2
    Generate(tColonne, typeBoulier)
    RemiseZero()
}