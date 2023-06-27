var ListExercices
/**
 * Charge le fichier xml
 */
 function LoadDataListe()
 {
     var xmlhttp = new XMLHttpRequest();
     xmlhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) {
         XmlLoaded(this);
       }
     };
     xmlhttp.open("GET", "/Brevet/BrevetData.xml" , true);
     xmlhttp.send();
 }
 
 /**
  * Lance le chargement de la base de donnée lorsque le fichier xml est chargé
  * @param {XMLFile} xml Fichier XML chargé
  */
 function XmlLoaded(xml)
 {
     var child, node;
     var xmlDoc = xml.responseXML;
     var x = xmlDoc.getElementsByTagName("DataObject");
     var xt = xmlDoc.getElementsByTagName("Tags")[0].childNodes;
 
     Tags = {};
     ListExercices = [];
 
     for(var i = 0; i < xt.length; ++i) {
         node = xt[i];
         if (node.nodeName === 'Tag') {
             AddTag(node)
         }
     }
 
     for(var i = 0; i < x.length; ++i) {
         node = x[i];
         ListExercices.push(new BrevetObject(node));
     }
 
 
     Rechercher("");
 }
 
 /**
  * Charge un Tag dans la liste des tags
  * @param {XElement} x XElement représentant le tag
  */
 function AddTag(x)
 {
     var a = [], child, name;
     
     for(var i = 0; i < x.childNodes.length; ++i) {
         child = x.childNodes[i];
         if (child.nodeName === 'Tag_Infos') {
             name = child.getAttribute("Name");
         }
         else if (child.nodeName === "Tag_Alias")
         {
             var child2;
             for(var j = 0; j < child.childNodes.length; ++j) {
                 child2 = child.childNodes[j];
                 if (child2.nodeName === 'Alias') {
                     a.push(child2.getAttribute("Name"));
                 }
             }
         }
     }
     Tags[name] = a;
 }