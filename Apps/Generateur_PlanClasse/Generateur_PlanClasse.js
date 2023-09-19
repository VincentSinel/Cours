// import { jsPDF as pdfcreator } from "../JS/jsPDF/jspdf.umd"
const { jsPDF } = window.jspdf

var Tables = [];


class TableElement{

  Parent;

  Eleve = null;

  UID = -1;

  element;
  nom;
  prenom;
  fixed = false;


  interact;

  angle;
  set_angle( value ){
    this.angle = value;
    var x = parseFloat(this.element.getAttribute('data-x')) || 0;
    var y = parseFloat(this.element.getAttribute('data-y')) || 0;
    this.element.setAttribute('data-a', this.angle);
    this.element.style.transform = 'translate(' + x + 'px, ' + y + 'px) rotate(' + this.angle + 'deg)';
  }


  constructor(parent, ox, oy, angle)
  {
    Tables.push(this);
    this.Parent = parent;
    this.UID = Math.floor(Math.random() * 1000000000);
    this.angle = angle;
    this.CreateHtmlObject(ox, oy);
  }

  CreateHtmlObject(ox, oy)
  {
    ox = Math.round(ox / GridSize) * GridSize
    oy = Math.round(oy / GridSize) * GridSize

    let id = "table" + ox + "-" + oy;
    let trans = 'translate(' + ox + 'px, ' + oy + 'px)';
    trans += ' rotate(' + this.angle + 'deg)'

    this.element = document.createElement("div");
    this.element.classList.add("draggable");
    this.element.style.transform = trans
    this.element.setAttribute('data-a', this.angle)
    this.element.setAttribute('data-x', ox)
    this.element.setAttribute('data-y', oy)
    this.element.id = id;
    this.element.table = this;

    let d = document.createElement("div");
    d.classList.add("draggable_inner");
    
    let c = document.createElement("div");
    
    this.nom = document.createElement("span");
    this.prenom = document.createElement("span");
    
    c.appendChild(this.nom);
    c.appendChild(document.createElement("br"));
    c.appendChild(this.prenom);
    
    let im = document.createElement("img");
    im.src = "Table.svg";

    d.appendChild(c);
    d.appendChild(im);

    this.element.appendChild(d);

    this.AddInteract();
    let This = this;
    this.element.onwheel = (event) => { This.wheelEvent(event)};
  }


  GetData()
  {
    let x = parseFloat(this.element.getAttribute('data-x')) || 0;
    let y = parseFloat(this.element.getAttribute('data-y')) || 0;
    let uid = null
    if (this.Eleve != null) uid = this.Eleve.UID
    return {ox: x, oy: y, angle: this.angle, eleveuid: uid, fixed: this.fixed};
  }

  static LoadData(parent, data)
  {
    let table = new TableElement(parent, data.ox, data.oy, data.angle);
    table.fixed = data.fixed;
    if (parent != null)
    {
      if (parent.Parent != null)
      {
        parent.Parent.ListeEleve.forEach(eleve => {
          if (eleve.UID == data.eleveuid)
          {
            table.Eleve = eleve;
          }
        })
      }
    }
    return table
  }

  UpdateData()
  {
    if (this.Eleve == null)
    {
      if (this.fixed)
        this.nom.innerHTML = "VIDE";
      else
        this.nom.innerHTML = "";
      this.prenom.innerHTML = "";
    }
    else
    {
      this.nom.innerHTML = this.Eleve.Nom;
      this.prenom.innerHTML = this.Eleve.Prenom;
    }
    this.interact.options.drag.modifiers[0] = interact.modifiers.snap({
      targets: [
        interact.snappers.grid({ x: GridSize, y: GridSize })
      ],
      range: Infinity,
      relativePoints: [ { x: 0, y: 0 } ]
    })
  }


  AddInteract()
  {
    let func = this.dragMoveListener
    this.interact = interact(this.element)
      .draggable({
        inertia: true,
        modifiers: [
          interact.modifiers.snap({
            targets: [
              interact.snappers.grid({ x: GridSize, y: GridSize })
            ],
            range: Infinity,
            relativePoints: [ { x: 0, y: 0 } ],
            offset: { x: 0, y: 0 }//'parent'
          }),
          interact.modifiers.restrictRect({
            restriction: 'parent',
            endOnly: true
          })
        ],
        autoScroll: true,
    
        listeners: {
          move: func,
        }
      })
  }
  
  
  dragMoveListener (event) {
    var target = event.target
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
    var a = parseFloat(target.getAttribute('data-a')) || 0
  
    // translate the element
    target.style.transform = 'translate(' + (Math.round(x / GridSize) * GridSize)  + 'px, ' + (Math.round(y / GridSize) * GridSize) + 'px) rotate(' + a + 'deg)'
  
    // update the position attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
  }

  wheelEvent(event)
  {
    this.set_angle(this.angle + 5 * event.deltaY / Math.abs(event.deltaY))
    event.preventDefault();
  }

  SetTextColor(change)
  {
    if (change)
    {
      this.nom.style.color = "#FF0000";
      this.prenom.style.color = "#FF0000";
    }
    else
    {
      this.nom.style.color = "#000";
      this.prenom.style.color = "#000";
    }
  }

  SetEleve(eleve, fixed = false)
  {
    this.Eleve = eleve;
    this.fixed = fixed;
    this.Parent.UpdateData();
  }
}

class Plan{

  Nom = ""
  Parent = null;
  Content;

  UID = -1;

  Tables = [];

  constructor(classe = null)
  {
    this.Parent = classe;
    this.Content = document.getElementById("content");
    this.UID = Math.floor(Math.random() * 1000000000);
    this.Nom = "Salle " + this.UID;
  }

  AddTable(ox, oy, angle)
  {
    ox = Math.max(0, Math.min(ox, PlanSize.x - TableSize.w))
    oy = Math.max(0, Math.min(oy, PlanSize.y - TableSize.h))
    let table = new TableElement(this, ox, oy, angle);
    this.Tables.push(table);
    this.UpdateData();
    return table;
  }

  RemoveTable(uid)
  {
    this.Tables = this.Tables.filter(table => table.UID != uid);
  }

  GetData()
  {
    let _tables = [];
    this.Tables.forEach(e => {
      _tables.push(e.GetData());
    })
    return {tables: _tables, nom: this.Nom}
  }

  LoadData(data)
  {
    this.Tables = [];
    data.tables.forEach(e => {
      let a = TableElement.LoadData(this, e);
      this.Tables.push(a);
    })
    this.Nom = data.nom;
    this.UpdateData();
  }

  ChargeTables()
  {
    this.Content.innerHTML = "";
    this.Tables.forEach(table => {
      this.Content.appendChild(table.element);
    })
  }

  place_simple = [];
  place_double = [];
  place_libres = 0;
  place_fixes = 0;

  UpdateData()
  {
    this.place_simple = [];
    this.place_double = [];
    this.place_libres = 0;
    this.place_fixes = 0;
    this.place_total = 0;
    this.Tables.forEach( table => {

      table.UpdateData();

      if (table.Eleve != null)
      {
        if (!this.place_double.includes(table.Eleve.UID))
        {
          if (this.place_simple.includes(table.Eleve.UID))
          {
            this.place_double.push(table.Eleve.UID);
            this.place_simple.slice(this.place_simple.indexOf(table.Eleve.UID),1);
          }
          else
          {
            this.place_simple.push(table.Eleve.UID)
          }
        }
        if (table.fixed) this.place_fixes++;
      }
      else 
      {
        if (table.fixed) this.place_fixes++;
        this.place_libres++;
      }
    })
    this.Tables.forEach( table => {
      let change = false;
      if (table.Eleve != null)
        if (this.place_double.includes(table.Eleve.UID))
          change = true;
      table.SetTextColor(change);
    })
  }
}

class Eleve{

  Parent;

  UID = -1;

  Nom = "";
  Prenom = "";

  constructor(parent = null)
  {
    this.Parent = parent;
    this.UID = Math.floor(Math.random() * 1000000000);
  }

  GetData()
  {
    return {nom: this.Nom, prenom: this.Prenom, uid: this.UID};
  }

  LoadData(data)
  {
    this.Nom = data.nom;
    this.Prenom = data.prenom;
    this.UID = data.uid;
  }

  ChangeName(nom, prenom)
  {
    this.Nom = nom;
    this.Prenom = prenom;
    if (this.Parent != null)
    {
      this.Parent.UpdateData();
    }
  }
  
  ShortName()
  {
    return this.Prenom + " " + this.Nom
  }
}

class Classe{
  Nom = "";
  ListeEleve = [];
  Plans = [];

  UID = -1;

  constructor()
  {
    this.UID = Math.floor(Math.random() * 1000000000);
    this.Nom = "Classe " + this.UID;
  }

  GetData()
  {
    let _eleves = [];
    this.ListeEleve.forEach(e => {
      _eleves.push(e.GetData());
    })
    let _plans = [];
    this.Plans.forEach(e => {
      _plans.push(e.GetData());
    })
    return {nom: this.Nom, eleves: _eleves, plans: _plans, uid: this.UID};
  }

  LoadData(data)
  {
    this.ListeEleve = []
    this.Plans = []
    this.Nom = data.nom;
    this.UID = data.uid;
    data.eleves.forEach(e => {
      let a = new Eleve(this);
      a.LoadData(e);
      this.ListeEleve.push(a);
    })
    data.plans.forEach(e => {
      let a = new Plan(this);
      a.LoadData(e);
      this.Plans.push(a);
    })
  }

  UpdateData()
  {
    this.Plans.forEach(plan =>{
      plan.UpdateData();
    })
  }
}

class DataBase{

  Classes = [];
  PlanTemplate = [];


  constructor()
  {
  }

  GetData()
  {
    let _classes = [];
    this.Classes.forEach(e => {
      _classes.push(e.GetData());
    })
    let _plans = [];
    this.PlanTemplate.forEach(e => {
      _plans.push(e.GetData());
    })
    return {classes: _classes, plans: _plans}
  }

  LoadData(data)
  {
    this.Classes = []
    this.PlanTemplate = []
    data.classes.forEach(e => {
      let a = new Classe();
      a.LoadData(e);
      this.Classes.push(a);
    })
    data.plans.forEach(e => {
      let a = new Plan(null);
      a.LoadData(e);
      this.PlanTemplate.push(a);
    })
  }

}



var Data;
var PlanSelected = null;
var ClasseSelected = null;
var TableSelected = null;

var GridSize = 5;
var TableSize = {w: 0, h: 0}
var MouseRightClickPosition = {x: 0, y: 0}
var PlanSize = {x: 780, y: 520.65}
var PageSize = {x: 841.89,y: 595.28}

function InitAll()
{
  document.getElementById("listeclasse").innerHTML = "";
  document.getElementById("listeeleve").innerHTML = ""; 
  document.getElementById("listeplan").innerHTML = ""; 
  document.onclick = hideMenu;
  document.oncontextmenu = ClickPlan; 
  document.getElementById("addtable").onclick = AddTable; 
  document.getElementById("asignstudent").onclick = AsignStudent; 
  document.getElementById("asignfree").onclick = AsignFree; 
  document.getElementById("deletetable").onclick = RemoveTable;
  document.getElementById("gridsize").value = GridSize;
  var style = getComputedStyle(document.body)
  TableSize.w = parseInt(style.getPropertyValue('--TableWidth'), 10);
  TableSize.h = TableSize.w * 41.0 / 44.0;
  Data = new DataBase();
  UpdateInfoPlan();
  UpdatePlanTypeSelect();
} 

function AddClasse(select = false, addtoparent = true, classe = null)
{
  if (classe == null) classe = new Classe();
  let id = classe.UID;
  if (addtoparent)
    Data.Classes.push(classe);

  let div = document.createElement("div");
  div.classList.add("listelement");
  div.id = "classe" + id
  div.innerHTML =
  '<input type="text" value="' + classe.Nom + '" id="classe_' + id +
  '_nom" oninput="ClasseNameChange(this.value,' + id + ')"> <div class="icon' +
  'button" onclick="SelectClasse(' + id + ')"><svg xmlns="http:'+
  '//www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" w'+
  'idth="24"> <path fill="currentColor" stroke="currentColor"' +
  'd="M480-326q72.5 0 123.25-50.75T654-500q0-72.5-50.75-123.25'+
  'T480-674q-72.5 0-123.25 50.75T306-500q0 72.5 50.75 123.25T480'+
  '-326Zm.118-68Q436-394 405-424.882q-31-30.883-31-75Q374-544 40'+
  '4.882-575q30.883-31 75-31Q524-606 555-575.118q31 30.883 31 75'+
  'Q586-456 555.118-425q-30.883 31-75 31ZM480-208q-142.5 0-259-7'+
  '9.75T51-500q53.5-132.5 170-212.25T480-792q142.5 0 259 79.75T9'+
  '09-500q-53.5 132.5-170 212.25T480-208Zm0-292Zm0 217q111 0 204'+
  '.5-58.5T827-500q-49-100-142.5-158.5T480-717q-111 0-204.5 58.5'+
  'T133-500q49 100 142.5 158.5T480-283Z"/></svg></div><div class'+
  '="iconbutton" onclick="DeleteClasse(' + id +
  ')"><svg xmlns="http://www.w3.org/2000/svg" height='+
  '"24" viewBox="0 -960 960 960" width="24">' +
  '<path fill="currentColor" stroke="currentColor"' +
  'd="M283-130q-30.938 0-52.969-22.031Q208-174.062 208-205v-512h-39'+
  'v-75h193v-38h237v38h193v75h-39v512q0 30.938-22.031 52.969Q708.93'+
  '8-130 678-130H283Zm395-587H283v512h395v-512ZM365-283.5h75v-355h-'+
  '75v355Zm156 0h75v-355h-75v355ZM283-717v512-512Z"/></svg></div>'

  document.getElementById("listeclasse").appendChild(div);
  if (select) div.firstChild.select();
  UpdateInfoPlan();
  if (select) SelectClasse(id);
}
function DeleteClasse(id)
{
  let doit = confirm("Voulez-vous supprimer cette classe ? (Pas d'annulation possible)");
  if (!doit) return;
  Data.Classes = Data.Classes.filter(classe => classe.UID != id);
  if (id == ClasseSelected)
  {
    document.getElementById("selectedclasse").innerHTML = "Aucune classe selectionné";
    ClasseSelected = null
    
    document.getElementById("selectedplan").innerHTML = "Aucun plan selectionné";
    PlanSelected = null;
  }
  let child = document.getElementById("classe"+id)
  document.getElementById("listeclasse").removeChild(child);

  UpdateInfoPlan();
}
function ClasseNameChange(nom, id)
{
  let classe = Data.Classes.filter(classe => classe.UID == id)[0];
  classe.Nom = nom;
  if (classe == ClasseSelected)
  {
    let t = document.getElementById("classe_" + id + "_nom").value;
    document.getElementById("selectedclasse").innerHTML = 
    "Classe selectionné : " + t;
  }
}
function SelectClasse(id)
{
  let t = document.getElementById("classe_" + id + "_nom").value;
  document.getElementById("selectedclasse").innerHTML = 
  "Classe selectionné : " + t;

  ClasseSelected = Data.Classes.filter(classe => classe.UID == id)[0];
  document.getElementById("listeeleve").innerHTML = "";
  ClasseSelected.ListeEleve.forEach(eleve => { AddToList(eleve) });

  document.getElementById("listeplan").innerHTML = "";
  ClasseSelected.Plans.forEach(plan => { AddPlan(plan.Nom, false, plan) });

  document.getElementById("selectedplan").innerHTML = "Aucun plan selectionné";
  PlanSelected = null;

  document.getElementById("content").innerHTML = "";

  UpdateInfoPlan();
}



function AddEleve(nom = "", prenom = "")
{
  if (ClasseSelected == null) return;
  let e = new Eleve(ClasseSelected);
  e.Nom = nom;
  e.Prenom = prenom;
  ClasseSelected.ListeEleve.push(e);
  AddToList(e);
  UpdateInfoPlan();
}
function AddToList(eleve)
{
  let id = eleve.UID;
  let div = document.createElement("div");
  div.classList.add("listelement");
  div.id = "eleve" + id
  div.innerHTML = 
  '<input type="text" placeholder="NOM" value="' + eleve.Nom + '" id="eleve_' + id + '_nom">'+
  '<input type="text" placeholder="Prenom" value="' + eleve.Prenom + '" id="eleve_' + id + '_prenom">'+
  '<div class="iconbutton" onclick="DeleteEleve(' + id + ')">'+
  '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0'+
  ' -960 960 960" width="24"><path fill="currentColor" stroke="cu'+
  'rrentColor"d="M283-130q-30.938 0-52.969-22.031Q208-174.062 208'+
  '-205v-512h-39v-75h193v-38h237v38h193v75h-39v512q0 30.938-22.03'+
  '1 52.969Q708.938-130 678-130H283Zm395-587H283v512h395v-512ZM36'+
  '5-283.5h75v-355h-75v355Zm156 0h75v-355h-75v355ZM283-717v512-51'+
  '2Z"/></svg></div>'
  document.getElementById("listeeleve").appendChild(div);

}
function DeleteEleve(id)
{
  let doit = confirm("Voulez-vous supprimer cet élève ? (Pas d'annulation possible)");
  if (!doit) return;
  
  ClasseSelected.ListeEleve = ClasseSelected.ListeEleve.filter(eleve => eleve.UID != id);
  let child = document.getElementById("eleve"+id)
  document.getElementById("listeeleve").removeChild(child);

  UpdateInfoPlan();
}



function AddPlan(nom = null, addtoparent = true, plan = null, select = false)
{
  if (ClasseSelected == null) return;
  if(plan == null) plan = new Plan(SelectClasse);
  let id = plan.UID;
  if (addtoparent) ClasseSelected.Plans.push(plan);

  if (nom == null) nom = "Salle " + id;
  let div = document.createElement("div");
  div.classList.add("listelement");
  div.id = "plan" + id
  div.innerHTML =
  '<input type="text" value="' + nom + '" id="plan_' + id +
  '_nom" oninput="PlanNameChange(this.value,' + id + ')"> <div class="icon' +
  'button" onclick="SelectPlan(' + id + ')"><svg xmlns="http:'+
  '//www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" w'+
  'idth="24"> <path fill="currentColor" stroke="currentColor"' +
  'd="M480-326q72.5 0 123.25-50.75T654-500q0-72.5-50.75-123.25'+
  'T480-674q-72.5 0-123.25 50.75T306-500q0 72.5 50.75 123.25T480'+
  '-326Zm.118-68Q436-394 405-424.882q-31-30.883-31-75Q374-544 40'+
  '4.882-575q30.883-31 75-31Q524-606 555-575.118q31 30.883 31 75'+
  'Q586-456 555.118-425q-30.883 31-75 31ZM480-208q-142.5 0-259-7'+
  '9.75T51-500q53.5-132.5 170-212.25T480-792q142.5 0 259 79.75T9'+
  '09-500q-53.5 132.5-170 212.25T480-208Zm0-292Zm0 217q111 0 204'+
  '.5-58.5T827-500q-49-100-142.5-158.5T480-717q-111 0-204.5 58.5'+
  'T133-500q49 100 142.5 158.5T480-283Z"/></svg></div><div class'+
  '="iconbutton" onclick="DeletePlan(' + id +
  ')"><svg xmlns="http://www.w3.org/2000/svg" height='+
  '"24" viewBox="0 -960 960 960" width="24">' +
  '<path fill="currentColor" stroke="currentColor"' +
  'd="M283-130q-30.938 0-52.969-22.031Q208-174.062 208-205v-512h-39'+
  'v-75h193v-38h237v38h193v75h-39v512q0 30.938-22.031 52.969Q708.93'+
  '8-130 678-130H283Zm395-587H283v512h395v-512ZM365-283.5h75v-355h-'+
  '75v355Zm156 0h75v-355h-75v355ZM283-717v512-512Z"/></svg></div>'

  document.getElementById("listeplan").appendChild(div);
  if (select) div.firstChild.select();
  if (select) SelectPlan(id)
}
function DeletePlan(id)
{
  if (ClasseSelected == null) return;
  let doit = confirm("Voulez-vous supprimer ce plan ? (Pas d'annulation possible)");
  if (!doit) return;
  ClasseSelected.Plans = ClasseSelected.Plans.filter(plan => plan.UID != id);
  if (id == PlanSelected)
  {
    document.getElementById("selectedplan").innerHTML = "Aucun plan selectionné";
    PlanSelected = null;
  }
  let child = document.getElementById("plan"+id)
  document.getElementById("listeplan").removeChild(child);
  UpdateInfoPlan();
}
function PlanNameChange(nom, id)
{
  if (ClasseSelected == null) return;
  let plan = ClasseSelected.Plans.filter(plan => plan.UID == id)[0];
  plan.Nom = nom;
  if (plan == PlanSelected)
  {
    let t = document.getElementById("plan_" + id + "_nom").value;
    document.getElementById("selectedplan").innerHTML = 
    "Plan actuel : " + t;
    UpdateInfoPlan();
  }
}
function SelectPlan(id)
{
  if (ClasseSelected == null) return;
  let t = document.getElementById("plan_" + id + "_nom").value;
  document.getElementById("selectedplan").innerHTML = 
  "Plan actuel : " + t;

  PlanSelected = ClasseSelected.Plans.filter(plan => plan.UID == id)[0];
  PlanSelected.ChargeTables();

  UpdateInfoPlan();
}



function LoadEleveFromCSV()
{
  if (ClasseSelected == null) return;
  let input = document.createElement("input");
  input.type = "file";
  input.accept = ".csv";
  input.addEventListener('change', (e) => {
    const [file] = e.target.files;
    readCSV(e, file);
  });
  input.click();
}
function readCSV(e, file) {
    if (!file) { return; }
    var reader = new FileReader();
    reader.onload = function(e) {
      processCSV(e.target.result);
    };
    reader.readAsText(file);
}
function processCSV(contents) {
  // console.log(contents);
  var re = new RegExp("([A-ZÁÀÂÄÅÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜÝÑÇÆ']+ ?-*[A-ZÁÀÂÄÅÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜÝÑÇÆ' ]{2,}) ([A-ZÁÀÂÄÅÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜÝÑÇÆ\\- a-záàâäåãéèêëíìîïóòôöõúùûüýÿçñ']+).*", 'g')
  let ar = Array.from(contents.matchAll(re));

  ar.forEach(element => {
    AddEleve(element[1], element[2])
  });
}



function AddTable()
{
  if (PlanSelected == null) return;
  PlanSelected.AddTable(
    MouseRightClickPosition.x - TableSize.w / 2.0, 
    MouseRightClickPosition.y - TableSize.h / 2.0, 0);
  PlanSelected.ChargeTables();
  UpdateInfoPlan();
}
function RemoveTable()
{
  if (PlanSelected == null) return;
  
  Tables = Tables.filter(table => table.UID != TableSelected.UID);
  PlanSelected.Tables = PlanSelected.Tables.filter(table => table.UID != TableSelected.UID);
  PlanSelected.ChargeTables();
  PlanSelected.UpdateData();
  UpdateInfoPlan();
}
function AsignFree()
{
  if (PlanSelected == null) return;
  TableSelected.SetEleve(null, !TableSelected.fixed);
}
function AsignStudent(e)
{
  e.preventDefault();
  if (PlanSelected == null) return;
  if (ClasseSelected == null) return;
  document.getElementById("selecteurmenu").style.display = 'flex';
  var menu = document.getElementById("Selector")  
  menu.innerHTML = "";
  let init = document.createElement("option")
  init.innerHTML = "(aucun)";
  init.classList.add("notasign");
  menu.appendChild(init);
  ClasseSelected.ListeEleve.forEach(eleve => {
    let op = document.createElement("option")
    if (PlanSelected.place_simple.includes(eleve.UID) ||
      PlanSelected.place_double.includes(eleve.UID))
      op.classList.add("alreadyasign");
    else
      op.classList.add("notasign");
    op.innerHTML = eleve.ShortName();
    menu.appendChild(op);
  })
  menu.selectedIndex = ClasseSelected.ListeEleve.indexOf(TableSelected.Eleve) + 1;
}

function StudentChanged(event)
{
  event.target.className=event.target.options[event.target.selectedIndex].className;
  for(let i = 0; i < event.target.options.length; i++)
  {
    event.target.options[i].disabled = (event.target.selectedIndex == i);
  }
}
function EleveChangeValidation()
{
  let id = document.getElementById("Selector").selectedIndex;
  if (id == 0)
    TableSelected.SetEleve(null, false)
  else
    TableSelected.SetEleve(ClasseSelected.ListeEleve[id-1], true)
  PlanSelected.UpdateData();
  hideMenu();
  UpdateInfoPlan();
}


function ClickPlan(e) { 
  e.preventDefault(); 

  hideMenu();
  MouseRightClickPosition.x = e.layerX;
  MouseRightClickPosition.y = e.layerY;
  if (e.target == document.getElementById("content"))
  {
    var menu = document.getElementById("contextMenu1")      
    menu.style.display = 'block'; 
    menu.style.left = e.pageX + "px"; 
    menu.style.top = e.pageY + "px"; 
  }
  else if (e.target.classList.contains("draggable"))
  {
    TableSelected = e.target.table;
    var menu = document.getElementById("contextMenu2")      
    menu.style.display = 'block';
    menu.style.left = e.pageX + "px";
    menu.style.top = e.pageY + "px";
  }
}
function hideMenu(e) {
  document.getElementById("contextMenu1").style.display = "none"
  document.getElementById("contextMenu2").style.display = "none"
  if (e)
  {
    if (
      e.target.id != "selecteurmenu" &&
      e.target.id != "Selector" &&
      e.target.id != "selecteurvalidation" &&
      e.target.nodeName != "OPTION" &&
      e.target.nodeName != "A"
      )
      document.getElementById("selecteurmenu").style.display = "none"
  }
  else
    document.getElementById("selecteurmenu").style.display = "none"
}



function GenerateClasse(e)
{
  // PlanSelected = new Plan();
  if (PlanSelected == null) return;
  let doit = confirm("Voulez-vous remplacer le plan actuel ? (Pas d'annulation possible)");
  if (!doit) return;
  PlanSelected.Tables = [];
  // let id = document.querySelector('input[name="line-style"]:checked').value;
  let id = document.getElementById("PlanType").selectedIndex;
  
  if (id == 0)  
  {
    let ox = Math.round(PlanSize.x / 2.0 / GridSize) * GridSize;
    let oy = Math.round(PlanSize.y / 2.0 / GridSize) * GridSize;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 5; j++) {
        let x = (ox - (TableSize.w+3)*(i - 2));
        let y = (oy - (TableSize.h+1)*(1.5 * j - 2.5));
        x = Math.round(x / GridSize) * GridSize
        y = Math.round(y / GridSize) * GridSize
        PlanSelected.AddTable(x, y, 0);
      }  
    }
    PlanSelected.ChargeTables();
  }
  else if (id == 1)  
  {
    let ox = Math.round(PlanSize.x / 2.0 / GridSize) * GridSize;
    let oy = Math.round(PlanSize.y / 2.0 / GridSize) * GridSize;
    for (let i = 0; i < 7; i++) {
      if ((i+1) % 4 == 0) continue;
      for (let j = 0; j < 5; j++) {
        let x = (ox - (TableSize.w+3)*(i - 2.5));
        let y = (oy - (TableSize.h+1)*(1.5 * j - 2.5));
        x = Math.round(x / GridSize) * GridSize
        y = Math.round(y / GridSize) * GridSize
        PlanSelected.AddTable(x, y, 0);
      }  
    }
    PlanSelected.ChargeTables();
  }
  else if (id == 2)  
  {
    let ox = Math.round(PlanSize.x / 2.0 / GridSize) * GridSize;
    let oy = Math.round(PlanSize.y / 2.0 / GridSize) * GridSize;
    for (let i = 0; i < 8; i++) {
      if ((i+1) % 3 == 0) continue;
      for (let j = 0; j < 5; j++) {
        let x = (ox - (TableSize.w+3)*(i - 3));
        let y = (oy - (TableSize.h+1)*(1.5 * j - 2.5));
        x = Math.round(x / GridSize) * GridSize
        y = Math.round(y / GridSize) * GridSize
        PlanSelected.AddTable(x, y, 0);
      }  
    }
    PlanSelected.ChargeTables();
  }
  else if (id == 3)  
  {
    let ox = Math.round(PlanSize.x / 2.0 / GridSize) * GridSize;
    let oy = Math.round(PlanSize.y / 2.0 / GridSize) * GridSize;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        for (let k = 0; k < 2; k++) {
          if ((i % 3 == 0) && (j == 3)) continue;
          let x = (ox - (TableSize.w+3)*k - (i - 1.5) * 2 * (TableSize.w+3 + 15));
          let y = (oy - (TableSize.h+1)*(1.5 * j - 1.75));
          if (i % 3 == 0) y = (oy - (TableSize.h+1)*(1.5 * j - 1.25));
          x = Math.round(x / GridSize) * GridSize
          y = Math.round(y / GridSize) * GridSize
          PlanSelected.AddTable(x, y, 0);
        }
      }
    }
    PlanSelected.ChargeTables();
  }
  else if (id == 4)  
  {
    let ox = Math.round(PlanSize.x / 2.0 / GridSize) * GridSize;
    let oy = Math.round(PlanSize.y / 2.0 / GridSize) * GridSize;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        for (let k = 0; k < 2; k++) {
          let x = (ox - (TableSize.w+3)*k - (i - 1.5) * 2 * (TableSize.w+3 + 15));
          let y = (oy - (TableSize.h+1)*(1.5 * j - 1.75));
          x = Math.round(x / GridSize) * GridSize
          y = Math.round(y / GridSize) * GridSize
          PlanSelected.AddTable(x, y, 0);
        }
      }
    }
    PlanSelected.ChargeTables();
  }
  else if (id == 5)
  {
    let ox = Math.round(PlanSize.x / 2.0 / GridSize) * GridSize;
    let oy = Math.round(PlanSize.y / 2.0 / GridSize) * GridSize;
    for (let i = 0; i < 6; i++) {
      let x = (ox - (TableSize.w+3)*(i-2));
      let y = (oy - (TableSize.w+3)* 3);
      x = Math.round(x / GridSize) * GridSize
      y = Math.round(y / GridSize) * GridSize
      PlanSelected.AddTable(x, y, 0);
      if (i % 5 != 0)
      {
        x = Math.round(x / GridSize) * GridSize
        y = Math.round((y+ (TableSize.w*2+3 - TableSize.h)) / GridSize) * GridSize
        PlanSelected.AddTable(x, y, 0);
      }
    }
    for (let i = 0; i < 6; i++) {
      let x = (ox - 3 *(TableSize.w+3) - TableSize.h-3);
      let y = (oy - (TableSize.w+3)* (3-i) + (TableSize.w - TableSize.h) / 2.0);
      x = Math.round(x / GridSize) * GridSize
      y = Math.round(y / GridSize) * GridSize
      PlanSelected.AddTable(x, y, -90);
      x = (ox + 2 *(TableSize.w+3) + TableSize.h+4);
      x = Math.round(x / GridSize) * GridSize
      PlanSelected.AddTable(x, y, 90);
    }
    for (let i = 0; i < 4; i++) {
      let x = (ox - 2*(TableSize.w+3));
      let y = (oy - (TableSize.w+3)* (1-i) + (TableSize.w - TableSize.h) / 2.0);
      x = Math.round(x / GridSize) * GridSize
      y = Math.round(y / GridSize) * GridSize
      PlanSelected.AddTable(x, y, -90);
      x = (ox + (TableSize.w+3));
      x = Math.round(x / GridSize) * GridSize
      PlanSelected.AddTable(x, y, 90);
    }
    PlanSelected.ChargeTables();
  }
  else if (id >= 6)
  {
    console.log(id);
    let plancible = Data.PlanTemplate[id - 6];
    plancible.Tables.forEach(table => {
      let x = parseFloat(table.element.getAttribute('data-x')) || 0;
      let y = parseFloat(table.element.getAttribute('data-y')) || 0;
      PlanSelected.AddTable(x, y, table.angle);
    })
    PlanSelected.ChargeTables();
  }
  UpdateInfoPlan();
}

function UpdatePlanTypeSelect()
{
  let select = document.getElementById("PlanType");
  select.innerHTML = '<option>Autobus 1 colonne (30 tables) </option>'+
                     '<option>Autobus 2 colonnes (30 tables)</option>'+
                     '<option>Autobus 3 colonnes (30 tables)</option>'+
                     '<option>Autobus 4 colonnes (28 tables)</option>'+
                     '<option>Autobus 4 colonnes (32 tables)</option>'+
                     '<option>Classe en U (30 tables)</option>'
  
  Data.PlanTemplate.forEach(plan => {
    let option = document.createElement("option");
    option.innerHTML = plan.Nom;
    select.appendChild(option);
  })
}
function SavePlan()
{
  if (PlanSelected == null) return;
  let nplan = new Plan();
  nplan.Nom = prompt("Entrer un nom pour votre plan (cela écrasera un plan du même nom)");
  if (nplan.Nom == null || nplan.Nom == "") return;
  PlanSelected.Tables.forEach(table => {
    let x = parseFloat(table.element.getAttribute('data-x')) || 0;
    let y = parseFloat(table.element.getAttribute('data-y')) || 0;
    nplan.AddTable(x, y, table.angle);
  })
  Data.PlanTemplate = Data.PlanTemplate.filter(plan => plan.Nom != nplan.Nom);
  Data.PlanTemplate.push(nplan);
  UpdatePlanTypeSelect();
}

function ClearClasse()
{
  if (PlanSelected == null) return;
  let doit = confirm("Voulez-vous supprimer toutes les tables ? (Pas d'annulation possible)");
  if (!doit) return;
  
  PlanSelected.Tables = [];
  PlanSelected.ChargeTables();
  UpdateInfoPlan();
}



function GridSizeChanged(e)
{
  GridSize = document.getElementById("gridsize").valueAsNumber;
  Tables.forEach(table => { table.UpdateData() });
}
function UpdateInfoPlan()
{
  let a = 0; let b = 0; let c = 0; let d = 0; let e = 0; let f = 0; let g = "";
  if (ClasseSelected != null)
  {
    g = ClasseSelected.Nom + " - "
    a = ClasseSelected.ListeEleve.length;
    if (PlanSelected != null)
    {
      ClasseSelected.ListeEleve.forEach(eleve => {
        if (!PlanSelected.place_double.includes(eleve.UID) &&
          !PlanSelected.place_simple.includes(eleve.UID))
          c++;
      })
    }
  }
  if (PlanSelected != null)
  {
    g += PlanSelected.Nom
    b = PlanSelected.place_double.length;
    d = PlanSelected.place_libres;
    e = PlanSelected.place_fixes;
    f = PlanSelected.Tables.length;
  }
  document.getElementById("classeNbr").innerHTML = a;
  document.getElementById("plan_double").innerHTML = b;
  document.getElementById("plan_nasign").innerHTML = c;
  document.getElementById("plan_libre").innerHTML = d;
  document.getElementById("plan_fixe").innerHTML = e;
  document.getElementById("plan_total").innerHTML = f;
  document.getElementById("titreplan").innerHTML = g;
}



function Save()
{
  let data = Data.GetData();
    let filename = "PlanDeClasse_DataBase.json"
    let type = ".json"
    var file = new Blob([JSON.stringify(data, null, "\t")], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}
function Open()
{
  let input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
  input.addEventListener('change', (e) => {
    const [file] = e.target.files;
    readJSON(e, file);
  });
  input.click();
}
function readJSON(e, file) {
  if (!file) { return; }
  var reader = new FileReader();
  reader.onload = function(e) {
    processJSON(e.target.result);
  };
  reader.readAsText(file);
}
function processJSON(contents) {
  Data.LoadData(JSON.parse(contents));

  document.getElementById("listeclasse").innerHTML = "";
  document.getElementById("listeplan").innerHTML = "";
  document.getElementById("listeeleve").innerHTML = "";
  Data.Classes.forEach(classe => {
      AddClasse(false, false, classe);
    })
  UpdatePlanTypeSelect();
}

function Remplir()
{
  if (ClasseSelected == null) return;
  if (PlanSelected == null) return;
  let tablesallowed = [];
  let elevesallowed = [];
  PlanSelected.Tables.forEach(table => {
    if (!table.fixed)
    {
      table.Eleve = null;
      tablesallowed.push(table);
    }
  })
  PlanSelected.UpdateData();
  ClasseSelected.ListeEleve.forEach(eleve => {
    if (PlanSelected.place_simple.includes(eleve.UID)) return;
    if (PlanSelected.place_double.includes(eleve.UID)) return;
    elevesallowed.push(eleve);
  })
  while (elevesallowed.length != 0 && tablesallowed.length != 0)
  {
    let e = elevesallowed.pop();
    let p = Math.floor(Math.random() * tablesallowed.length);
    tablesallowed[p].SetEleve(e, false);
    tablesallowed.splice(p, 1);
  }
  PlanSelected.UpdateData();
  UpdateInfoPlan();
}

var TablePNG = null;
const tablesvg64 = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iM'+
'S4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iVGF'+
'ibGUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpb'+
'ms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0'+
'KCSB2aWV3Qm94PSIwIDAgNDQgNDEiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KICAgI'+
'DxwYXRoIGQ9Ik0zNC42LDExLjVjLTEtMS43LTMuMi0xLTQuNi0xYy0xLjUsMC0yLjc'+
'tMC45LTIuNy0yLjENCiAgICBzMS4yLTIuMSwyLjctMi4xYzIuMywwLDYuNy0wLjQsN'+
'i43LTIuNnMtNS4yLTMuMy0xNC41LTMuMw0KICAgIFM3LjcsMS42LDcuNywzLjhzNC4'+
'zLDIuNiw2LjcsMi42YzEuNSwwLDIuNywwLjksMi43LDIuMQ0KICAgIHMtMS4yLDIuM'+
'S0yLjcsMi4xYy0xLjUsMC0zLjYtMC44LTQuNiwxIE0wLjUsMTEuNWg0M3YyOQ0KICA'+
'gIGgtNDNWMTEuNXoiIHN0eWxlPSJzdHJva2UtbGluZWNhcDogcm91bmQ7IHN0cm9rZ'+
'S1saW5lam9pbjogcm91bmQ7IiANCiAgICBmaWxsPSJub25lIiBzdHJva2U9IiMwMDA'+
'wMDAiIC8+DQo8L3N2Zz4='

function printDiv(divName) 
{

  if (PlanSelected == null) return;
  if (TablePNG == null)
  {
    let scale = PageSize.x / (PlanSize.x + 20)
    let promise = imageUtil.base64SvgToBase64Png(tablesvg64, 44 * 5 * scale);
    promise.then((data) => {
      TablePNG = data;
      if (TablePNG == null) return;
      EndPDFCreation();
    })
  }
  else
  {
    EndPDFCreation();
  }
}

function EndPDFCreation()
{
  var doc = new jsPDF(
    {
      orientation: "landscape",
      unit: "pt",
      format: "a4"
    }
  );
  doc.setFontSize(40);

  let scale = PageSize.x / (PlanSize.x + 20)
  let margin = 10 * scale;

  doc.setFontSize(20 * scale);
  let x = PageSize.x / 2.0;
  let titre = document.getElementById("titreplan").innerHTML;
  doc.text(titre, x, margin + 20 * scale, {align: "center"});

  let ox = margin + TableSize.w*scale / 2.0;
  let oy = margin + 20 * scale + TableSize.h*scale / 2.0;
  PlanSelected.Tables.forEach(table => {
    DrawTableInfo(doc, scale, ox, oy, table)
  })

  doc.save("test.pdf");
}
function DrawTableInfo(doc, scale, ox, oy, table)
{
  let x = parseFloat(table.element.getAttribute('data-x')) || 0;
  let y = parseFloat(table.element.getAttribute('data-y')) || 0;
  let angle = table.angle
  let p = DrawTable(doc, scale, ox + x, oy + y, -angle)
  doc.setFont("Helvetica", "bold")
  let h = 6.0 / 41.0 * TableSize.w*scale;
  doc.setFontSize(h)
  let text = table.nom.innerHTML;
  while(doc.getTextWidth(text) >= TableSize.w*scale * 1.70){
    text = text.substring(0, text.length-1);
  }
  let dw = doc.getTextWidth(text);
  let dh = h;
  if (doc.getTextWidth(text) > TableSize.w*scale * 0.9)
  {
    dw = TableSize.w*scale * 0.9
    dh = h * 2.0;
  }
  dw = TableSize.w*scale * 0.5 - dw/2.0;
  dh = - TableSize.h*scale * 0.5;
  let ang = -angle / 180.0 * Math.PI
  let dx = dw * Math.cos(ang) + dh * Math.sin(ang)
  let dy = (-dw + TableSize.w*scale) * Math.sin(ang) - dh * Math.cos(ang) - TableSize.h*scale

  doc.text(text, p.x + dx, p.y + dy, {
    angle: -angle,
    maxWidth: TableSize.w*scale * 0.90,
    lineHeightFactor: 1
  }, 0)
  text = table.prenom.innerHTML
  doc.setFont("Helvetica", "normal")
  dw = doc.getTextWidth(text);
  dw = TableSize.w*scale * 0.5 - dw/2.0;
  dh += h*2
  dx = dw * Math.cos(ang) + dh * Math.sin(ang)
  dy = (-dw + TableSize.w*scale) * Math.sin(ang) - (dh - h*4)  * Math.cos(ang) - TableSize.h*scale
  doc.text(text, p.x + dx, p.y + dy, { 
    angle: -angle,
    maxWidth: TableSize.w*scale * 0.90,
    lineHeightFactor: 1
  }, 0)
}
function DrawTable(doc, scale, x, y, angle)
{
  let dw = TableSize.w*scale / 2.0;
  let dh = TableSize.h*scale / 2.0;
  let ang = angle / 180.0 * Math.PI
  let dx = -dw * Math.cos(ang) + dh * Math.sin(ang)
  let dy = -dw * Math.sin(ang) - dh * Math.cos(ang) + TableSize.h*scale
  doc.addImage(TablePNG, 'PNG', x + dx, y - dy, TableSize.w*scale, TableSize.h*scale, 'Table', "NONE", angle)
  return {x: x+dx,y: y+dy};
}



let imageUtil = {};
/**
 * converts a base64 encoded data url SVG image to a PNG image
 * @param originalBase64 data url of svg image
 * @param width target width in pixel of PNG image
 * @param secondTry used internally to prevent endless recursion
 * @return {Promise<unknown>} resolves to png data url of the image
 */
imageUtil.base64SvgToBase64Png = function (originalBase64, width, secondTry) {
  return new Promise(resolve => {
      let img = document.createElement('img');
      img.onload = function () {
          if (!secondTry && (img.naturalWidth === 0 || img.naturalHeight === 0)) {
              let svgDoc = base64ToSvgDocument(originalBase64);
              let fixedDoc = fixSvgDocumentFF(svgDoc);
              return imageUtil.base64SvgToBase64Png(svgDocumentToBase64(fixedDoc), width, true).then(result => {
                  resolve(result);
              });
          }
          document.body.appendChild(img);
          let canvas = document.createElement("canvas");
          let ratio = (img.clientWidth / img.clientHeight) || 1;
          document.body.removeChild(img);
          canvas.width = width;
          canvas.height = width / ratio;
          let ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          try {
              let data = canvas.toDataURL('image/png');
              resolve(data);
          } catch (e) {
              resolve(null);
          }
      };
      img.src = originalBase64;
  });
}
function fixSvgDocumentFF(svgDocument) {
  try {
      let widthInt = parseInt(svgDocument.documentElement.width.baseVal.value) || 500;
      let heightInt = parseInt(svgDocument.documentElement.height.baseVal.value) || 500;
      svgDocument.documentElement.width.baseVal.newValueSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PX, widthInt);
      svgDocument.documentElement.height.baseVal.newValueSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PX, heightInt);
      return svgDocument;
  } catch (e) {
      return svgDocument;
  }
}
function svgDocumentToBase64(svgDocument) {
  try {
      let base64EncodedSVG = btoa(new XMLSerializer().serializeToString(svgDocument));
      return 'data:image/svg+xml;base64,' + base64EncodedSVG;
  } catch (e) {
      return null;
  }
}

function base64ToSvgDocument(base64) {
  let svg = atob(base64.substring(base64.indexOf('base64,') + 7));
  svg = svg.substring(svg.indexOf('<svg'));
  let parser = new DOMParser();
  return parser.parseFromString(svg, "image/svg+xml");
}

InitAll();