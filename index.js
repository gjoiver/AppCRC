Vue.component("modal", {});

new Vue({
  el: "#app",
  data() {
    return {
      mensaje: "",
      generador: "",
      datosCRC: "",
      tramaObtenida: "",
      crc: "",
      tx: "",
      crcReceptor: "",
      txReceptor:"",
      confirmacionDato:"",
      showModal: false,
    };
  },

  methods: {
    calcularCRC(mensaje, generador) {
      let current;
      let string = "";
      let tam;
      //pasamos el mensaje y generador que vienen siendo una cadena de texto a arrays
      //para poder hacer las operaciones pertinentes
      let rem = [...mensaje]
      let div = [...generador]
      
      
      this.current = 0;
      
      //empezamos a dividir rem que viene siendo el dividendo y div el divisor
      for(let i=0;i<div.length;i++){
        rem.push("0")
      }
      console.log(rem)
      while (true) {
        //Creamos un ciclo for que tendra como tamaño la cantidad de elementos que tiene el divisor
        for (let i = 0; i < div.length; i++) {
          
          //si el dividendo en la posicion actual mas la siguiente es igual al divisor en la posicion i actual
          if (rem[current + i] == div[i]) {
          //entonces el vividendo en la posicion actual mas la siguiente sera igual a 0
          //empezando a reemplazar los vaalores del array original para obtener uno nuevo  
            rem[current + i] = "0";
          } else {
            //de lo contrario sera igual a 1
            rem[current + i] = "1";
          }
        }

        for (let b = 0; b < rem.length; b++) {
          //si rem en la posicion b es igual a 0 entonces aumentamos el contador
          if (rem[b] == "0") {
            current++;
          }
          //si el contador en la posicion b es igual a 1
          //entonces el contador sera igual a b y rompemos el ciclo while
          if (rem[b] == "1") {
            current = b;
            break;
          }
        }
        //si la resta de rem menos el contador actual es menor o igual que el divisor en la antepenultima posicion
        //finalizamos el ciclo while
        if (rem.length - current <= div.length - 1) {
          break;
        }
      }
      //agregamos el resultado obtenido de la division en un string
      for (let i = 0; i < rem.length; i++) {
        string += rem[i];
      }
      
      tam=string.length-div.length
      string=string.substr(tam, div.length)
      //y por ultimo retornamos el valor crc
      
      return string;
    },
    Main() {
      //obtenemos los datos ingresados por el usuario
     

     
      
      
      //calculamos el crc
      let rem = this.calcularCRC(this.mensaje, this.generador);
      
      this.datosCRC=rem
      
      //asignamos esta variable para poder mostrarla en la interfaz
      this.tramaObtenida=this.mensaje+rem;

      
      this.crc=rem;
      this.tx=this.tramaObtenida;
           
      
    },
    enviar(){
      //calculamos si se recibio el mensaje
      let receptorResultado=this.calcularCRC(this.tx,this.generador)
      console.log(receptorResultado)
      //pasamos ese mensaje a un array para poderlo comparar más adelante
      let resultadoFinal=[...receptorResultado]

      console.log(resultadoFinal)
      
      //al pasar el resultado a un array, podemos utilizar el metodo includes
      //en el cual permite buscar si un elemento existe dentro del array
      if(resultadoFinal.includes("1")){
        //si dentro del array hay un 1, entonces los datos no fueron recibidos
               
        this.confirmacionDato="Mensaje incorrecto"
        //mostramos los datos en el modal
        this.crcReceptor=this.crc;
        this.txReceptor=this.tx;
        //hacemos true la variable para mostrar el modal o pantalla donde se confirma si el mensaje es correcto
        this.showModal=true;
      }else{
        //en caso contrario se han recibido de forma satisfactoria
        
        this.confirmacionDato="Mensaje correcto"
        this.crcReceptor=this.crc;
        this.txReceptor=this.tx;
        this.showModal=true;
      }
      
    }
  },
});
