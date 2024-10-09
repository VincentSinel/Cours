window.onload = function(){
	ShowCollegeSelect()
    SelectCollege("roger_vailland")
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
                clic('/Cours/' + folder + '/' + element.page, this, element); }
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
