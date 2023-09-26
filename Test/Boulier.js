const TCOLONNE = 12

window.addEventListener("load", () => {Generate(TCOLONNE)});
const BOULE = '<svg viewBox="0 0 100 100" class="boule"><circle cx="50" cy="50" r="49" fill="currentColor" stroke="#442C40" stroke-width="2"/></svg><div class="empty"></div>'

// Esri color ramps - Metro Movement
// rgba(237, 81, 81, 1),rgba(20, 158, 206, 1),rgba(167, 198, 54, 1),rgba(158, 85, 156, 1),rgba(252, 146, 31, 1),rgba(255, 222, 62, 1),rgba(247, 137, 216, 1),rgba(183, 129, 74, 1),rgba(60, 175, 153, 1),rgba(107, 107, 214, 1),rgba(181, 71, 121, 1),rgba(127, 127, 127, 1)
const COLORS = ["rgba(237, 81, 81, 0.5)", "rgba(20, 158, 206, 0.5)", "rgba(167, 198, 54, 0.5)", "rgba(158, 85, 156, 0.5)", "rgba(252, 146, 31, 0.5)", "rgba(255, 222, 62, 0.5)", "rgba(247, 137, 216, 0.5)", "rgba(183, 129, 74, 0.5)", "rgba(60, 175, 153, 0.5)", "rgba(107, 107, 214, 0.5)", "rgba(181, 71, 121, 0.5)", "rgba(127, 127, 127, 0.5)"];

function Generate(tcolonne)
{
    let l1 = document.getElementById("line1");
    let l2 = document.getElementById("line2");
    l1.innerHTML = "";
    l2.innerHTML = "";
    let d; let t;
    for (let i = 0; i < tcolonne; i++) {
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