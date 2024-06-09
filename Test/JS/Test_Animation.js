
// var draw = SVG().addTo('body').size(300, 300)
// var svgEle = draw.rect(100, 100);

// var btn = document.getElementById('testBtn');
// var stopBtn = document.getElementById('testStop');
// var pbtn = document.getElementById('testPrevious');
// var nbtn = document.getElementById('testNext');

// var x = 0, y = 0, width = 50, height = 50;
// var Runners = []
// Runners.push(new SVG.Runner(400))
// Runners.push(new SVG.Runner(400, 400))
// Runners.push(new SVG.Runner(400, 800))
// Runners.push(new SVG.Runner(1500, 1200))

// Runners[0].opacity(0);
// Runners[1].scale(0.2, 0.2, x, y + height / 2);
// Runners[2].opacity(1);
// Runners[3].scale(4, 4, x, y + height / 2);
// svgEle.timeline().persist(true);
// for(var i = 0; i < Runners.length; i++)
// {
// 	Runners[i].element(svgEle)
// 	svgEle.timeline().schedule(Runners[i], 0, 'after')
// }

// btn.addEventListener('click', () => {
// 	svgEle.timeline().stop()
// 	let time = 0
// 	for(var i = 0; i < Runners.length; i++)
// 	{
// 		Runners[i].reset()
// 		svgEle.timeline().unschedule(Runners[i])
// 		svgEle.timeline().schedule(Runners[i], time, 'absolute')
// 		time += Runners[i].duration()
// 	}
// 	console.log(svgEle.timeline())
// 	svgEle.timeline().play()
// })


// stopBtn.addEventListener('click', () => {
// 	svgEle.timeline().stop()
// })


// pbtn.addEventListener('click', () => {
// 	svgEle.timeline().seek(-100);
// })

// nbtn.addEventListener('click', () => {
// 	svgEle.timeline().seek(100);
// })