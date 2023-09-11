
class TableElement{

  element;
  nom;
  prenom;

  angle;
  set_angle( value ){
    this.angle = value;
    var x = parseFloat(this.element.getAttribute('data-x')) || 0;
    var y = parseFloat(this.element.getAttribute('data-y')) || 0;
    this.element.setAttribute('data-a', this.angle);
    this.element.style.transform = 'translate(' + x + 'px, ' + y + 'px) rotate(' + this.angle + 'deg)';
  }


  constructor(ox, oy, angle)
  {
    let content = document.getElementById("content");
    
    this.angle = angle;
    let id = "table" + ox + "-" + oy;
    let trans = 'translate(' + ox + 'px, ' + oy + 'px)';
    trans += ' rotate(' + this.angle + 'deg)'

    this.element = document.createElement("div");
    this.element.classList.add("draggable");
    this.element.style.transform = trans
    this.element.setAttribute('data-a', angle)
    this.element.setAttribute('data-x', ox)
    this.element.setAttribute('data-y', oy)
    this.element.id = id;

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

    content.appendChild(this.element);
    this.AddInteract();
    let This = this;
    this.element.onwheel = (event) => { This.wheelEvent(event)};
  }


  AddInteract()
  {
    let func = this.dragMoveListener
    interact(this.element)
      .draggable({
        inertia: true,
        modifiers: [
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
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px) rotate(' + a + 'deg)'
  
    // update the position attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
  }

  wheelEvent(event)
  {
    this.set_angle(this.angle + 5 * event.deltaY / Math.abs(event.deltaY))
    event.preventDefault();
  }
}

class Classe{

  Tables = [];

  constructor()
  {
  }

  AddTable(ox, oy, angle)
  {
    let table = new TableElement(ox, oy, angle);
    this.Tables.push(table);
    return table;
  }
}

function CreateTables()
{
  for (let i = 0; i < 8; i++) {
    if ((i+1) % 3 == 0) continue;
    for (let j = 0; j < 5; j++) {
      let x = (60 + 70*i);
      let y = (60 + 65*j);
      let a = Math.floor(Math.random() * 360);

      let table = new TableElement(x, y, a);
      table.nom.innerHTML = "SINEL"
      table.prenom.innerHTML = "Vincent"
    }  
  }
}

// function AddInteract(item, xo = 0, yo = 0)
// {
//   // target elements with the "draggable" class
//   interact(item)
//     .draggable({
//       // enable inertial throwing
//       inertia: true,
//       // keep the element within the area of it's parent
//       modifiers: [
//         interact.modifiers.restrictRect({
//           restriction: 'parent',
//           endOnly: true
//         })
//       ],
//       // enable autoScroll
//       autoScroll: true,
  
//       listeners: {
//         // call this function on every dragmove event
//         move: dragMoveListener,
  
//         // call this function on every dragend event
//         end (event) {
          
//         }
//       }
//     })
//     // .origin({x: xo, y: yo});
// }



// function dragMoveListener (event) {
//   var target = event.target
//   // keep the dragged position in the data-x/data-y attributes
//   var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
//   var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
//   var a = parseFloat(target.getAttribute('data-angle')) || 0

//   // translate the element
//   target.style.transform = 'translate(' + x + 'px, ' + y + 'px) rotate(' + a + 'deg)'

//   // update the posiion attributes
//   target.setAttribute('data-x', x)
//   target.setAttribute('data-y', y)
// }

  // this function is used later in the resizing and gesture demos
// window.dragMoveListener = dragMoveListener

CreateTables();