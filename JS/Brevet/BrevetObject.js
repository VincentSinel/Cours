class BrevetObject
{

    static BrevetSerie = [
        "Generale",
        "Professionnel"
    ]

    static BrevetSujet = [
        "Amerique du Nord",
        "Amerique du Sud",
        "Centres Etrangers",
        "Grèce",
        "Asie",
        "Antilles - Guyanne",
        "La réunion",
        "Métropole - La réunion",
		"Métropole - Antilles - Guyanne",
        "Polynesie",
        "Nouvelle Caledonie",
        "Brevet Blanc"
    ];

    static BrevetPeriode = [
        "Normale",
        "Rattrapage",
		"Secours"
    ];

    static BrevetDifficulty = [
        "Tres Dur",
        "Dur",
        "Moyen",
        "Facile",
        "Tres Facile",
    ];

    constructor(imgname, data)
    {
        this.Tags = {};
        this.Selected = false;
        
        this.Serie = data["Serie"];
        this.Sujet = data["Sujet"];
        this.Annee = data["Annee"];
        this.Periode = data["Periode"];
        this.Number = data["Number"];
        this.Points = data["Points"];
        this.Difficulte = data["Difficulte"];
        this.Tags = data["Tags"];
        this.Image = data["Image"];
    }

    GetTitle()
    {
        var title = "[GEN] - ";
        if (this.Serie == 1)
            title = "[PRO] - "

        this.Sujet.forEach(sujet => {
            switch (sujet)
            {
                case "AN": title += "Amérique du nord - "; break;
                case "AS": title += "Amérique du sud - "; break;
                case "CE": title += "Centres étrangers - "; break;
                case "AG": title += "Antilles Guyanne - "; break;
                case "R": title += "La Réunion - "; break;
                case "M": title += "Métropole - "; break;
                case "P": title += "Polynésie - "; break;
                case "NC": title += "Nouvelle-Calédonie - "; break;
                case "G": title += "Grèce - "; break;
                case "A": title += "Asie - "; break;
                case "BB": title += "Brevet blanc - "; break;
                case "AU": title += "Autre - "; break;
            }
        });
        title += this.Annee + " - Exercice " + this.Number;
        return title
    }

    CreateHtmlResultat(indexexo)
    {
        var ligneblock = document.createElement("div");
        ligneblock.setAttribute("class", "Result");
        ligneblock.setAttribute("indexexo", indexexo);
        ligneblock.name = this.Name;
        ligneblock.id = this.Index;
        ligneblock.onclick = function()
        {
            SelectExercice(this);
        }

        var label = document.createElement("label");
        label.setAttribute("class", "titreExo");
        label.innerHTML = this.GetTitle();
        ligneblock.appendChild(label);
        ligneblock.appendChild(document.createElement("br"));

        
        var tags = document.createElement("div");
        tags.setAttribute("class", "tagholder");

        let _this = this;
        var tagslist = Object.keys(this.Tags).map(function(key) {
            return [key, _this.Tags[key]];
        });
        tagslist.sort(function(a, b){
            if (a[0] == b[0]) {
                if (a[1] < b[1]) return -1;
                if (a[1] > b[1]) return 1;
                return 0;
            }
            return b[1]-a[1]
        })


        for(var i = 0; i < tagslist.length; i++){
            var tag = document.createElement("div");
            tag.setAttribute("class", "tag");
            var content = document.createElement("a");
            content.setAttribute("style", "font-size: " + (18 * ((tagslist[i][1] + 100) / 200.0)) + "px;");
            content.innerHTML = tagslist[i][0];
            content.onclick = function(){
                tagsclick = true; 
                Rechercher(this.innerHTML)
            };
            tag.appendChild(content);
            tags.appendChild(tag);
        }


        ligneblock.appendChild(tags);

        ligneblock.setAttribute("selected", "false");
        if (this.Selected)
        {
            ligneblock.setAttribute("selected", "true");
            ligneblock.classList.add("selected_result");
            this.AddCheckMark(ligneblock);
        }

        return ligneblock;
    }

    AddCheckMark(UIElement)
    {
        let div = document.createElement("div");
        div.setAttribute("class", "CheckMark");
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 33 33');

        let poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        poly.setAttribute('points', '6 17 16.5 27 27 6 16.5 21 6 17');

        svg.appendChild(poly);
        div.appendChild(svg);
        UIElement.appendChild(div);
    }

    CreateHtmlExo()
    {
        var ligneblock = document.createElement("div");
        ligneblock.setAttribute("class", "Result");
        ligneblock.name = this.Name;
        ligneblock.id = this.Index;
        ligneblock.style.background = 'white';
        ligneblock.style.minHeight = 'unset';

        var label = document.createElement("a");
        label.setAttribute("class", "titreExo");
        label.setAttribute("style", "color: #222222;");
        label.innerHTML = this.GetTitle();
        ligneblock.appendChild(label);
        ligneblock.appendChild(document.createElement("br"));

        var image = new Image();
        image.classList.add("exercice_img")
        image.src = this.Image;
        ligneblock.appendChild(image);

        let but = document.createElement("a");
        but.setAttribute("class", "PDFButton");
        but.href = this.DownloadPDF();
        but.target="_blank";
        but.download="Sujet.pdf"

        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '27');
        svg.setAttribute('height', '33');
        svg.setAttribute('viewBox', '0 0 213.51 262.5');

        let path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        let path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        let path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        let path4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        let path5 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        let path6 = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        path1.setAttribute(
            'd',
            'M27.11,0A27.16,27.16,0,0,0,0,27.12V235.38A27.15,27.15,0,0,0,27.11,262.5H186.36a27.15,27.15,0,0,0,27.11-27.12V64.13a22.38,22.38,0,0,0-1.75-9.89,27.38,27.38,0,0,0-5.36-7.76l0,0L166.82,7.69l-.07-.06a31,31,0,0,0-8.37-5.36,30.55,30.55,0,0,0-12-2.26H27.11Z'
        );
        path2.setAttribute(
            'd',
            'M27.11,8.91H146.6a25.64,25.64,0,0,1,8.27,1.54,22.94,22.94,0,0,1,5.76,3.64l0,0,39.41,38.67a21.55,21.55,0,0,1,3.53,5.08,19.18,19.18,0,0,1,1,5.89,1.15,1.15,0,0,1,0,.19V235.38a18.06,18.06,0,0,1-18.2,18.21H27.11a18.07,18.07,0,0,1-18.2-18.21V27.12A18.07,18.07,0,0,1,27.11,8.91Z'
        );
        path3.setAttribute(
            'd',
            'M53.3,156.29c-6.13-6.13.5-14.55,18.5-23.49l11.32-5.63,4.42-9.65c2.42-5.31,6-14,8-19.25l3.64-9.6-2.51-7.1C93.63,72.84,92.53,59.72,94.49,55c2.65-6.4,11.32-5.74,14.75,1.11,2.68,5.35,2.41,15-.77,27.26l-2.61,10,2.3,3.9a136.61,136.61,0,0,0,8.19,11.31l6.1,7.58,7.59-1c24.1-3.14,32.36,2.2,32.36,9.87,0,9.67-18.93,10.47-34.82-.69a48.49,48.49,0,0,1-6-5s-10,2-14.86,3.35c-5.06,1.36-7.59,2.22-15,4.72,0,0-2.6,3.77-4.3,6.52-6.3,10.22-13.66,18.68-18.92,21.76C62.58,159.16,56.41,159.4,53.3,156.29Zm9.62-3.44c3.45-2.12,10.42-10.37,15.25-18l2-3.1-8.9,4.48c-13.74,6.91-20,13.42-16.76,17.36,1.84,2.21,4,2,8.46-.71Zm89.28-25c3.37-2.36,2.88-7.12-.93-9-3-1.49-5.36-1.8-13.06-1.68-4.73.32-12.34,1.27-13.63,1.56,0,0,4.18,2.89,6,4A79.34,79.34,0,0,0,143.47,128c4.33,1.32,6.83,1.18,8.73-.17Zm-35.9-14.92a88.35,88.35,0,0,1-7.71-9.95,55.47,55.47,0,0,1-4.31-6.43s-2.11,6.76-3.83,10.83l-5.38,13.3-1.56,3s8.29-2.72,12.51-3.83c4.47-1.16,13.54-2.95,13.54-2.95ZM104.73,66.49c.52-4.37.74-8.73-.66-10.93-3.89-4.25-8.59-.7-7.79,9.41a69.24,69.24,0,0,0,2.24,12.8l2.06,6.51,1.44-4.9a126,126,0,0,0,2.71-12.89Z'
        );
        path4.setAttribute(
            'd',
            'M63.73,184.67h10a26.93,26.93,0,0,1,7.74.92,9,9,0,0,1,5,4,13,13,0,0,1,2,7.39,13.41,13.41,0,0,1-1.64,6.83,9.66,9.66,0,0,1-4.45,4.12c-1.84.84-4.69,1.27-8.54,1.27H70.38v15.69H63.73Zm6.65,5.15v14h3.3q4.41,0,6.09-1.65t1.71-5.36a8.06,8.06,0,0,0-1.12-4.47,4.58,4.58,0,0,0-2.47-2.12,15.25,15.25,0,0,0-4.21-.42Z'
        );
        path5.setAttribute(
            'd',
            'M93.55,184.67h9q6.55,0,10.48,2.33a14.43,14.43,0,0,1,5.94,6.92,24.78,24.78,0,0,1,2,10.18,28.35,28.35,0,0,1-1.82,10.51,16.68,16.68,0,0,1-5.54,7.42q-3.71,2.83-10.59,2.83H93.55ZM100.2,190v29.53H103q5.81,0,8.42-4T114,204.78Q114,190,103,190Z'
        );
        path6.setAttribute(
            'd',
            'M127.43,184.67h22.32V190H134.09v12h12.54v5.33H134.09v17.52h-6.66Z'
        );

        path1.setAttribute('fill' , '#ff2116');
        path2.setAttribute('fill' , '#f5f5f5');
        path3.setAttribute('fill' , '#ff2116');
        path4.setAttribute('fill' , '#2c2c2c');
        path5.setAttribute('fill' , '#2c2c2c');
        path6.setAttribute('fill' , '#2c2c2c');

        svg.appendChild(path1)
        svg.appendChild(path2)
        svg.appendChild(path3)
        svg.appendChild(path4)
        svg.appendChild(path5)
        svg.appendChild(path6)

        but.appendChild(svg);

        ligneblock.appendChild(but);

        return ligneblock
    }

    DownloadPDF() {
        var dirname = this.Image.match(/(.*)[\/\\]/)[1]||'';
        dirname +="\\Sujet.pdf";
        return dirname 
    }
}