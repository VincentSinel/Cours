var last_selected_content

var pages_index = []

function toggleMenu()
{
    let menu = document.getElementById("menu");
    menu.classList.toggle("asideshow");
}

function Init()
{
    document.getElementById("Iframe").onload = function() { ReajustIframe() }
    RefreshMenu();
    GetCurrentHash();
}

function RefreshMenu()
{
    var nav_menu = document.getElementById("navigation_menu");

    nav_menu.innerHTML = "";

    pages_index = []

    for (let index = 0; index < MenuContent.length; index++) {
        const main_menu = MenuContent[index];

        let p = document.createElement("p");
        p.classList.add("caption")
        p.onclick = () => {
            p.classList.toggle("active")
        }
        nav_menu.appendChild(p);

        let span = document.createElement("span");
        span.classList.add("caption-text")
        span.innerText = main_menu.name
        p.appendChild(span);

        let ul = document.createElement("ul")
        nav_menu.appendChild(ul);
        
        for (let i = 0; i < main_menu.content.length; i++) {
            const sub_menu = main_menu.content[i];
            
            let li = document.createElement("li")
            li.classList.add("tree-1")
            ul.appendChild(li)

            let a = document.createElement("a")
            a.onclick = () => {ClickContent(a)}
            li.appendChild(a)

            if (sub_menu.hasOwnProperty("content"))
            {
                let but = document.createElement("button")
                but.classList.add("tree-expand")
                a.classList.add("tree-root")
                a.setAttribute("path_target", "###")
                a.appendChild(but)
            }
            else
            {
                a.classList.add("reference")
                let data = {path: sub_menu.path, button: a}
                pages_index.push(data)
                a.setAttribute("path_target", pages_index.indexOf(data))
                if (!sub_menu.ready)
                    a.classList.add("not-ready")
            }
            
            span = document.createElement("span")
            span.innerText = sub_menu.name
            a.appendChild(span);

            if (sub_menu.hasOwnProperty("content"))
            {
                let ul = document.createElement("ul")
                li.appendChild(ul);

                for (let j = 0; j < sub_menu.content.length; j++) {
                    const sub_menu2 = sub_menu.content[j];
                    
                    let li = document.createElement("li")
                    li.classList.add("tree-2")
                    ul.appendChild(li)

                    let a = document.createElement("a")
                    a.classList.add("reference")
                    if (!sub_menu2.ready)
                        a.classList.add("not-ready")
                    let data = {path: sub_menu2.path, button: a, sub: ul}
                    pages_index.push(data)
                    a.setAttribute("path_target", pages_index.indexOf(data))
                    a.onclick = () => {ClickContent(a)}
                    a.innerText = sub_menu2.name
                    li.appendChild(a)
                }
            }
        }
        
    }
}

function ClickContent(a)
{
    let path = a.getAttribute("path_target")

    if (last_selected_content)
        last_selected_content.classList.remove("active");
    if (a.classList.contains("reference"))
        last_selected_content = a;

    a.classList.toggle("active")

    if (path != "###")
    {
        OpenPage(path)
    }
}

function OpenPage(path_index)
{
    document.location.hash = path_index;

    
    let data = pages_index[path_index];

    document.getElementById("noiframe").style.display = "none"
    document.getElementById("Iframe").src = data.path
}

function ReajustIframe()
{
    console.log("ready")
    if (document.getElementById("Iframe").contentWindow.document.documentURI == "about:blank") return;
    document.getElementById("Iframe").style.height = document.getElementById("Iframe").contentWindow.document.body.scrollHeight + 120 + 'px';
}


function GetCurrentHash()
{
    var list = location.hash.split("#");

    if (list.length != 2) return;
    let data = pages_index[parseInt(list[1])];

    if (data.hasOwnProperty("sub"))
    {
        data.sub.previousSibling.classList.add("active")
    }
    last_selected_content = data.button;
    data.button.classList.add("active")

    let parent = data.button.parentElement
    while(parent.parentElement.tagName != 'DIV')
        parent = parent.parentElement

    parent.previousSibling.classList.add("active")

    OpenPage(parseInt(list[1]))
}