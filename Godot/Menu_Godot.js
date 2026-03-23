var last_selected_content

function toggleMenu()
{
    let menu = document.getElementById("menu");
    menu.classList.toggle("asideshow");
}

function RefreshMenu()
{
    var nav_menu = document.getElementById("navigation_menu");

    nav_menu.innerHTML = "";

    for (let index = 0; index < MenuContent.length; index++) {
        const main_menu = MenuContent[index];

        let p = document.createElement("p");
        p.classList.add("caption")
        p.onclick = () => {
            ClickMainMenu(p)
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
                a.setAttribute("path_target", sub_menu.path)
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
                    if (!sub_menu.ready)
                        a.classList.add("not-ready")
                    a.setAttribute("path_target", sub_menu2.path)
                    a.onclick = () => {ClickContent(a)}
                    a.innerText = sub_menu2.name
                    li.appendChild(a)
                }
            }
        }
        
    }
}

function ClickMainMenu(p)
{
    p.classList.toggle("active")
    let ul = p.nextSibling;
    if (p.classList.contains("active"))
    {
        ul.classList.add("active")
    }
    else
    {
        ul.classList.remove("active")
    }
}

function ClickContent(a)
{
    let path = a.getAttribute("path_target")
    console.log(a)

    a.classList.toggle("active")

    if (last_selected_content)
        last_selected_content.classList.remove("active");
    if (a.classList.contains("reference"))
        last_selected_content = a;

    if (path == "###")
    {
        let ul = a.nextSibling;
        if (a.classList.contains("active"))
        {
            ul.classList.add("active")
        }
        else
        {
            ul.classList.remove("active")
        }
    }
    else
    {

    }
}