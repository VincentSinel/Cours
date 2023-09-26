window.addEventListener("load", Generate);

const TCOLONNE = 9
const BOULE = '<svg viewBox="0 0 100 100" class="boule"><circle cx="50" cy="50" r="49" fill="currentColor" stroke="#442C40" stroke-width="2"/></svg><div class="empty"></div>'
// Esri color ramps - Circling Circus
// rgba(217, 43, 48, 1),rgba(0, 149, 186, 1),rgba(60, 204, 180, 1),rgba(171, 82, 179, 1),rgba(255, 178, 89, 1),rgba(255, 223, 60, 1),rgba(235, 130, 235, 1),rgba(194, 124, 48, 1),rgba(160, 209, 125, 1),rgba(242, 96, 161, 1)
const COLORS = ["rgba(217, 43, 48, 0.5)", "rgba(0, 149, 186, 0.5)", "rgba(60, 204, 180, 0.5)", "rgba(171, 82, 179, 0.5)", "rgba(255, 178, 89, 0.5)", "rgba(255, 223, 60, 0.5)", "rgba(235, 130, 235, 0.5)", "rgba(194, 124, 48, 0.5)", "rgba(160, 209, 125, 0.5)", "rgba(242, 96, 161, 0.5)"];

function Generate()
{
    let l1 = document.getElementById("line1");
    let l2 = document.getElementById("line2");
    l1.innerHTML = "";
    l2.innerHTML = "";
    let d; let t;
    for (let i = 0; i < TCOLONNE; i++) {
        //Create first line.
        d = document.createElement("div");
        d.classList.add("colonne");
        t = '<div class="empty emptyexpand"></div>';
        t += BOULE;
        d.innerHTML = t;
        d.style.color = COLORS[i % COLORS.length];
        l1.appendChild(d);

        //Create second line.
        d = document.createElement("div");
        d.classList.add("colonne");
        t = '<div class="empty emptyexpand"></div>';
        for( let i = 0 ; i < 4; i++) t += BOULE;
        d.innerHTML = t;
        d.style.color = COLORS[i % COLORS.length];
        l2.appendChild(d);
    }

    let allboule = document.getElementsByClassName("boule");
    for(let i = 0; i < allboule.length; i++)
    {
        allboule[i].addEventListener("click", ClicBoule);
    }
}

function ClicBoule(e)
{
    let b = e.target.parentNode;
    if (b.tagName != "svg") return;
    let c = b.parentNode;
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
    if (id > fid) children[id+1].classList.add("emptyexpand");
    else children[id-1].classList.add("emptyexpand");
}