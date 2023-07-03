let cantidadFig;
let val = 1;

class Formas{
    constructor(cual,posX,posY){
        imageMode(CENTER);
                    this.y = posY;
                    this.x = posX;
                    this.colores1 = miPaleta1.darColor();
                    this.colores2 = miPaleta2.darColor();
                    this.colores3 = miPaleta3.darColor();

                    // this.opacidad = 20;
                    this.ancho=[];
                    this.alto=[];
                    this.cual=[1,2,3,4,5];
                    this.separacion=[];
                    this.cual= cual;
                    let c = [1,2,3,4,5,6];
                    cantidadFig=6;

                    this.colorInicial1= color(this.colores1[1]);
                    this.colorFinal1= color(this.colores1[5]);
                    
                    this.colorInicial2= color(this.colores2[1]);
                    this.colorFinal2= color(this.colores2[5]);

                    this.colorInicial3= color(this.colores3[1]);
                    this.colorFinal3= color(this.colores3[5]);

                    

                    for(let i = 0; i < cantidadFig; i++) {                      
                      this.ancho[i]=int(random(45, 90));
                      this.alto[i]=int(random(80, 90));
                      this.separacion[i]=int(random(30,50));
                      
                    }

    }

    dibujar(){

        let Yinicial=this.y;
        let cualForma= this.cual;

        push();

        for(let i = 0; i < cantidadFig; i++) {     
          this.opacidad = map(i,0,cantidadFig-2,10,255);
          let mezcla = map(i,0,cantidadFig-1,0,1);
          //tint dependiendo la paleta

         if(val==1){

          this.colores1[i] = lerpColor(this.colorInicial1,this.colorFinal1,mezcla);
          tint(red(this.colores1[i]),green(this.colores1[i]),blue(this.colores1[i]));

         }else if(val==2){

          // this.colores2[i] = lerpColor(this.colorInicial2,this.colorFinal2,mezcla);
          tint(red(this.colores2[i]),green(this.colores2[i]),blue(this.colores2[i]));

         }else if(val==3){
          // this.colores3[i] = lerpColor(this.colorInicial3,this.colorFinal3,mezcla);
          tint(red(this.colores3[i]),green(this.colores3[i]),blue(this.colores3[i]));
         }


          image(imgFormas[cualForma], this.x , Yinicial, this.ancho[i],  this.alto[i]);
          Yinicial = Yinicial- this.separacion[i];
        } 
        
        pop();

    }
    movY(){ 
      this.y= this.y + random(-10,10); //random(-10,10);
    }
    anch(valor){
      for(let i = 0; i < cantidadFig; i++) {                      
        this.ancho[i]= map(valor,0,1,60,90);//int(random(30, 90));
        
      }
    }
    alt(valor){
      for(let i = 0; i < cantidadFig; i++) {                      
         this.alto[i]=map(valor,0,1,80,110); //int(random(80, 90)); 
      }
    }
    sep(valor){
      for(let i = 0; i < cantidadFig; i++) {                      
        this.separacion[i]=map(valor,0,1,30,60);  //int(random(30,60));  
        // this.x= this.x + random(-5,5);
        
      }

    }
    pal(palet){
      if(palet === 1){
        val=1;
      }
      if(palet ===2){
        val=2;
      }
      if(palet === 3){
        val=3;
      }
    }
}

// function keyPressed() {
//     if(key ==="1"){
//       if(val<3){
//         val = val+1;
//       }else if(val=4){
//         val=1;
//       }
//     } 
//   }
// for(let i = 0; i < cantidadFig; i++) {                      
//   this.ancho[i]= map(valor,0,1,30,90);//int(random(30, 90));
//   this.alto[i]=map(valor,0,1,80,90); //int(random(80, 90));
//   this.separacion[i]=map(valor,0,1,30,60);  //int(random(30,60));  
//   // this.x= this.x + random(-5,5);
//   this.y= this.y + random(-10,10); //random(-10,10);
  
// }