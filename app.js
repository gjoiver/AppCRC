Vue.component("modal", {});

new Vue({
  el: "#app",
  data() {
    return {
      data: "",
      poli: "",
      datosSum: "",
      datosCRC: "",
      tramaObtenida: "",
      showDatas: false,
    };
  },

  methods: {
    calcularCRC(data, poli) {
      let current;
      let string = "";
      let rem = Array.from(data);
      let div = Array.from(poli);
      this.current = 0;
      while (true) {
        for (let i = 0; i < div.length; i++) {
          if (rem[current + i] == div[i]) {
            rem[current + i] = "0";
          } else {
            rem[current + i] = "1";
          }
        }
        for (let b = 0; b < rem.length; b++) {
          if (rem[b] == "0") {
            current++;
          }
          if (rem[b] == "1") {
            current = b;
            break;
          }
        }
        if (rem.length - current <= div.length - 1) {
          break;
        }
      }
      for (let i = 0; i < rem.length; i++) {
        string += rem[i];
      }

      return string;
    },
    addData(data, remainder) {
      let crc = "";
      let l = 3;
      for (let i = 0; i < data.length - l; i++) {
        crc += data.charAt(i);
      }
      for (let i = data.length; i < data.length - l; i++) {
        crc += remainder.charAt(i);
      }

      return crc;
    },
    Main() {
      let data = this.data;
      let poli = this.poli;

      let dataAux = this.data;

      let poliLength = poli.length;

      for (var i = 0; i < poliLength - 1; i++) {
        data += "0";
      }
      this.datosSum = data;
      let rem = this.calcularCRC(data, poli);
      this.datosCRC = rem.replace(/\b0+/g, "");
      let tram = this.addData(data, rem);
      this.tramaObtenida=tram;
      let rec = Array.from(data);
      if (rec[4] == 0) {
        rec[4] = 1;
      } else {
        rec[4] = 0;
      }

      let r = rec.toString();

      let rem2 = this.calcularCRC(r, poli);

      let k = 0;

      for (let i = 0; i < rem2.length; i++) {
        if (rem2.charAt(i)) {
          k = +1;
        }
      }
      if (k == rem2.length) {
        alert("No se han recibido datos, intente otra vez");
      } else {
        alert("Los datos han sido recibidos de forma satisfactoria");
      }
      this.data = "";
      this.poli = "";
    },
  },
});
