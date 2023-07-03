
class Paleta{

    constructor( nombre ){
        this.imagen = loadImage(nombre);
    }
    darColor(){       
        let colores = [];
        // Itera sobre los píxeles de la imagen en incrementos de 100 en el eje x
        for (let x = 0; x < this.imagen.width; x += 200) {
          // Obtiene el color del píxel en la posición (x, 0)
          let c = this.imagen.get(x, 0);
    
          // Crea un nuevo objeto p5.Color con los componentes RGB del color obtenido
          let colorNuevo = color(red(c), green(c), blue(c));
    
          // Agrega el nuevo color al array
          colores.push(colorNuevo);
        }
        return colores;

    }

    
}
        
    
        // let x = int(map(x, 0, this.imagen.width, 0, this.imagen.width));// no me funciono

        // let x = int( random( this.imagen.width )); //este si
 
        // let elColor = this.imagen.get( x , 100 );
        // return elColor;
