   
   function refresh(){
    const iframe = document.querySelector('iframe');
    console.log(iframe);
    if(iframe)
    {
      const bd = iframe.parentNode;
      iframe.parentNode.removeChild(iframe);
      let div_frame = document.createElement("div");
      div_frame.setAttribute("id", "view");
      bd.appendChild(div_frame);
    }
    
      const library = document.querySelector('#view');
      library.innerHTML = '';
  
      const section = document.querySelector('section');
      section.classList.add("hidden");
  
  }
   
   var tag = document.createElement('script');
   var iframe;    

   tag.src = "https://www.youtube.com/iframe_api";
   var firstScriptTag = document.getElementsByTagName('script')[0];
   console.log(firstScriptTag);
   firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

   var player;


   function onYouTubeIframeAPIReady(json) {

  refresh();
	const library = document.querySelector('#view');

	
	console.log(json);
    let video_id = json.items[0].id.videoId; 
    console.log(video_id);

     player = new YT.Player(library, {
       height: '50%',
       width: '80%',
       videoId: video_id,
       events: {
         'onReady': onPlayerReady,
         'onStateChange': onPlayerStateChange
       }
     });

     
   }

   function onPlayerReady(event) {
     event.target.playVideo();
   }

   var done = false;
   function onPlayerStateChange(event) {

   }
   function stopVideo() {
     player.stopVideo();
   }



function onJson(json){

    console.log('JSON ricevuto');
    console.log(json);
    const library = document.querySelector('script');
    library.innerHTML = '';

    const div= document.createElement('div');
    div.classList.add('eroe');


function onJsonEroe(json){
    console.log('JSON ricevuto');
    console.log (json);

    refresh();

    const library = document.querySelector('#view');

    const description= json.data.results[0].description;
    const eroe_id= json.data.results[0].id;
    const image =json.data.results[0].thumbnail.path + '.jpg';

    const eroe= document.createElement('div');
    eroe.classList.add('eroe');
    eroe.textContent= description;
    const img = document.createElement('img');
    img.src= image;
   
    library.appendChild(img);
    library.appendChild(eroe);
}

function onJsonFumetto(json){
    console.log('JSON ricevuto');
    console.log (json);

    refresh();
    const library = document.querySelector('#view');

    const div= document.createElement('div');
    library.appendChild(div);
    const results =json.data.results;

    for(result of results){
       const image= result.images[0].path + '.jpg';
    const img = document.createElement('img');
    img.classList.add('album');
    img.src= image;
   
    div.appendChild(img);
    img.addEventListener('click', apriModale);

    }
    
}

function apriModale(event) {
	const image = document.createElement('img');
	image.id = 'immagine_post';
	image.src = event.currentTarget.src;
	modale.appendChild(image);
	modale.classList.remove('hidden');
	document.body.classList.add('no-scroll');
}


function chiudiModale(event) {
	console.log(event);
	if(event.key === 'Escape')
	{
		console.log(modale);
		modale.classList.add('hidden');
		img = modale.querySelector('img');
		img.remove();
		document.body.classList.remove('no-scroll');
	}
}

function prevent(event) {
	event.preventDefault();
}

function onResponse(response) {
    console.log('Response ricevuta')
  return response.json();
}


function search(event)
{
	event.preventDefault();
  
    const content = document.querySelector('#content').value;

    if(content) {
	    const text = encodeURIComponent(content);
		console.log('Eseguo ricerca elementi riguardanti: ' + text);

		const tipo = document.querySelector('#tipo').value;
		console.log('Ricerco elementi di tipo: ' +tipo);
        
        if (tipo ==='eroe'){
        let rest_url = " https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=" +text + "&limit=100"+"&apikey=" + public_key + "&hash=" + hash + "&ts=" + ts;

        console.log('URL: ' + rest_url);
    // Esegui fetch
        fetch(rest_url).then(onResponse).then(onJsonEroe);
        }

        else if (tipo==='fumetto'){
            let url = "https://gateway.marvel.com:443/v1/public/comics?title=" + text +  "&apikey=" + public_key + "&hash=" + hash + "&ts=" + ts;
            console.log('URL: ' + url);
            fetch(url).then(onResponse).then(onJsonFumetto);
        }
        else if (tipo==='youtube'){
           let url="https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCvC4D8onUfXzvjTOM-dBfEA&q="+ text +" "+ "movie trailer" +"&type=video&key=" + y_key;
           console.log('URL: ' + url);
            fetch(url).then(onResponse).then(onYouTubeIframeAPIReady);
        }
    }
	else {
		alert("Inserisci il testo per cui effettuare la ricerca");
    }
}



const y_key='AIzaSyBZGR2lG8uWKW4tY-owas7Hcyo-3QHUxmk';
const private_key='90450d86b24d67cf8f3d44645ac14eaf89067c14';
const public_key= 'd0008d8be0532c9951ffff820cae2bc8';

var video_id;
var ts = Math.floor(Date.now() / 1000);
var ts = new Date().getTime();

var stringToHash = ts + private_key + public_key;
var hash = CryptoJS.MD5(ts + private_key + public_key).toString();


const form = document.querySelector('form');
form.addEventListener('submit', search);

const modale = document.querySelector('#modale');
window.addEventListener('keydown', chiudiModale);




const home = document.querySelector('#home');
home.addEventListener('click', refresh);


function gemme(){
  const iframe = document.querySelector('iframe');
	console.log(iframe);
	if(iframe)
	{
		const bd = iframe.parentNode;
		iframe.parentNode.removeChild(iframe);
		let div_frame = document.createElement("div");
		div_frame.setAttribute("id", "view");
		bd.appendChild(div_frame);
	}
  
    const library = document.querySelector('#view');
    library.innerHTML = '';

    const section= document.querySelector('section');
    section.classList.remove("hidden");

}

const about = document.querySelector('#About');
about.addEventListener('click', gemme);