let monitorear= true;

let FREC_MIN=45;
let FREC_MAX=75;

let AMP_MIN=0.04;
let AMP_MAX=0.05;


let mic;
let pitch;
let AudioContext;

let gestorAmp;
let gestorPitch;

let haySonido;
let antesHabiaSonido;
//----------------CONTROL DE ESTADOS-POR MILISEGUNDOS------------------
let estados= "agregar";
let marcas;
let tiempoLimiteAgregar=3000;
let tiempoLimiteMovY=3000;
let tiempoLimiteAnch=5000;
let tiempoLimiteAlt=5000;
let tiempoLimiteSeparacion=3000;
let tiempoLimitePaleta=3000;
let tiempoLimiteFin=3000;



const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';
//----------------VARIABLES DE DIBUJO-------------------
let imgFormas = [];
let cant=6;
let miPaleta1;
let miPaleta2;
let miPaleta3;
let formasInstancia;
let ejecutado = false;
let num = 5;
let conjunto= [];
let cantidad=0;
let bandera;
let filtro;
let palet=1;

let canFilas=0;

//--------------PRELOAD: DE IMAGENES--------------------
function preload() {
  miPaleta1 = new Paleta ("data/P_001.png");
  miPaleta2 = new Paleta ("data/P_002.png");
  miPaleta3 = new Paleta ("data/P_003.png");
  filtro = loadImage("data/filtro.png");

  for (let i = 1; i < cant; i++) {
    let nombre = "data/formas_00" + i + ".png";
   imgFormas[i] = loadImage(nombre);
  }
}

function setup() 
{
	createCanvas(350, 650);
  imageMode(CENTER)
   //inicializo la escucha de sonido
   audioContext = getAudioContext();;
  userStartAudio();
    mic= new p5.AudioIn();//Inicial el mic
    mic.start(startPitch);//Se enciende el mic y le transmito el analisis de la frecuencia (pitch) al mic. Conecto la libreria al mic.

    gestorAmp = new GestorSenial(AMP_MIN, AMP_MAX);
    gestorPitch = new GestorSenial(FREC_MAX, FREC_MAX);
    
    antesHabiaSonido= false;

    push();
        conjunto.push(new Formas(5, 170, 200));
        conjunto.push(new Formas(2, 330, 200));
        conjunto.push(new Formas(5, 300, 300));
        conjunto.push(new Formas(3, 260, 150));
        conjunto.push(new Formas(4,85,230));
        conjunto.push(new Formas(1, 20, 250));
        conjunto.push(new Formas(3, 140, 300));
        conjunto.push(new Formas(1, 220,350));
        conjunto.push(new Formas(2, 40, 400));
        conjunto.push(new Formas(2, 300, 500));
        conjunto.push(new Formas(1, 110, 500));
        conjunto.push(new Formas(3, 270, 600));
        conjunto.push(new Formas(5,230,680));
        conjunto.push(new Formas(4,195,580));
        conjunto.push(new Formas(1, 340, 650));
        conjunto.push(new Formas(2, 160, 700));
        conjunto.push(new Formas(3, 3, 600));
        conjunto.push(new Formas(4,40,650));
        conjunto.push(new Formas(5,100,700));
    pop();

}


function draw()
{
    background(15);
    let vol = mic.getLevel(); //cargamos el "vol" la amplitud del mic (señal cruda).
    gestorAmp.actualizar(vol);

    haySonido = gestorAmp.filtrada > 0.01;//umbral de ruido que define el estado haySonido.

    let iniciaElSonido = haySonido && !antesHabiaSonido; //evento de inicio de un sonido
    let findelSonido = !haySonido && antesHabiaSonido; // evento fin del sonido
    
    for(let i=0;i<conjunto.length;i++){
      conjunto[i].dibujar();
    }




//------------
    if(estados == "agregar"){
      if(iniciaElSonido){ //evento
        if(canFilas < 10){
         conjunto.push(new Formas(int(random(1,5)),int(random(0,350)),int(random(-10,700)))); 
         canFilas++;
        } 
      }
      // if(haySonido){} Estado
      if(findelSonido){//Evento
        marcas=millis();
      }
      if(!haySonido){//Estado
        let ahora=millis();
        if(ahora>marcas + tiempoLimiteAgregar){
          estados="movY";
          marcas=millis();    
        }
      }
    }


//------------
    else if (estados == "movY"){
      if(iniciaElSonido){ //evento
        
      }
      if(haySonido){//Estado

      }
      if(haySonido){//Estado
        for(let i=0;i<conjunto.length;i++){
          conjunto[i].movY();
          console.log("si,finciona");
        }
      }
      if(findelSonido){//Evento 
        marcas=millis();
      }
      if(!haySonido){//Estado
        let ahora=millis();
        if(ahora>marcas + tiempoLimiteMovY){
          estados="anch";
          marcas=millis();    
        }
      }

    }
//------------
else if (estados == "anch"){
  if(iniciaElSonido){ //evento
    
  }
  if(haySonido){//Estado

  }
  if(haySonido){//Estado
    for(let i=0;i<conjunto.length;i++){
      conjunto[i].anch(gestorPitch.filtrada);
      console.log("si,finciona");
    }
  }
  if(findelSonido){//Evento 
    marcas=millis();
  }
  if(!haySonido){//Estado
    let ahora=millis();
    if(ahora>marcas + tiempoLimiteAnch){
      estados="alt";
      marcas=millis();    
    }
  }

}
//------------
else if (estados == "alt"){
  // if(iniciaElSonido){} Evento
  if(haySonido){//Estado
    for(let i=0;i<conjunto.length;i++){
      conjunto[i].alt(gestorPitch.filtrada);
      console.log("si,finciona");
    }
  }
  if(findelSonido){//Evento 
    marcas=millis();
  }
  if(!haySonido){//Estado
    let ahora=millis();
    if(ahora>marcas + tiempoLimiteAlt){
      estados="separacion";
      marcas=millis();    
    }
  }

}
//------------
else if (estados == "separacion"){
  // if(iniciaElSonido){} //evento
  if(haySonido){//Estado
    for(let i=0;i<conjunto.length;i++){
      conjunto[i].sep(gestorPitch.filtrada);
      console.log("si,finciona");
    }
  }
  if(findelSonido){//Evento 
    marcas=millis();
  }
  if(!haySonido){//Estado
    let ahora=millis();
    if(ahora>marcas + tiempoLimiteSeparacion){
      estados="paleta";
      marcas=millis();    
    }
  }

}
//------------
    else if (estados == "paleta"){
      if(iniciaElSonido){ //Evento
        if(val<3){
          val = val+1;
        }else if(val=4){
          val=1;
      } 
    }
      // if(haySonido){//Estado}
      if(findelSonido){//Evento 
        marcas=millis();
      }
      if(!haySonido){//Estado
        let ahora=millis();
        if(ahora>marcas + tiempoLimitePaleta){
          estados="fin";
          marcas=millis();    
        }
      }
    }






//------------
    else  if (estados == "fin"){
      if(iniciaElSonido){ //evento
        marcas=millis();
      }
      if(haySonido){//Estado
        let ahora=millis();
        if(ahora >marcas+ tiempoLimiteFin){
          estados="reinicio";
          marcas =millis();
        }
      }
      // if(findelSonido){//Evento}
      // if(!haySonido){//Estado}

    }


//------------
    else if (estados == "reinicio"){

      push();
      conjunto.push(new Formas(5, 170, 200));
      conjunto.push(new Formas(2, 330, 200));
      conjunto.push(new Formas(5, 300, 300));
      conjunto.push(new Formas(3, 260, 150));
      conjunto.push(new Formas(4,85,230));
      conjunto.push(new Formas(1, 20, 250));
      conjunto.push(new Formas(3, 140, 300));
      conjunto.push(new Formas(1, 220,350));
      conjunto.push(new Formas(2, 40, 400));
      conjunto.push(new Formas(2, 300, 500));
      conjunto.push(new Formas(1, 110, 500));
      conjunto.push(new Formas(3, 270, 600));
      conjunto.push(new Formas(5,230,680));
      conjunto.push(new Formas(4,195,580));
      conjunto.push(new Formas(1, 340, 650));
      conjunto.push(new Formas(2, 160, 700));
      conjunto.push(new Formas(3, 3, 600));
      conjunto.push(new Formas(4,40,650));
      conjunto.push(new Formas(5,100,700));
      pop();
      
      estados="agregar";
      val=1;

    }

    for(let i=0;i<conjunto.length;i++){
      conjunto[i].dibujar();
    }
//--------herramientas para monitorear
    
    // if(monitorear){
      // text(vol,100,20);
    //     gestorAmp.dibujar(100,100);
    //     gestorPitch.dibujar(100,300);
    
    // }
    console.log(estados);
    push();
    tint(255, 30);
    image(filtro,0,0);
    pop();
    

    antesHabiaSonido = haySonido;

}

//-----------------------PTCH---------------------------------------------
function startPitch() {
    pitch = ml5.pitchDetection(model_url, audioContext , mic.stream, modelLoaded);
  }
  //--------------------------------------------------------------------
  function modelLoaded() {
  //select('#status').html('Model Loaded');
  getPitch();
  // console.log( "entro aca !" );
  
  }
  //--------------------------------------------------------------------
  function getPitch() {
    pitch.getPitch(function(err, frequency) {
    if (frequency) {    	
      let midiNum = freqToMidi(frequency);
    // console.log( midiNum );
  
      gestorPitch.actualizar( midiNum );
  
    }
    getPitch();
  })
  }