let chamber = document.querySelector("#senate") ? "senate" : "house"

let URLAPI = `https://api.propublica.org/congress/v1/113/${chamber}/members.json`;

let bodyhtml = document.querySelector("body");

let init = {
    method: "GET",
    headers: {
        "X-API-Key": "GfH6l0ho1tEwhcOupr8ArwKpc5qUhi8mqjBtnUtj",
    },
};
Vue.createApp({
    data() {
        return {
            miembros: [],
            miembrosFiltrados: [],
            check: [],
            ordenarEstado: [],
            filtrador: [],
            opciones: "all",
            tablaFiltrada: [],
            miembrosRepublicanos: 0,
            miembrosDemocratas: 0,
            miembrosIndependientes: 0,
            votosDelPartidoRepublicano: 0,
            votosDelPartidoDemocrata: 0,
            votosDelPartidoIndependiente: 0,
            totalDeMiembros: 0,
            totalVotosPromedio: 0,
            arrayCortadoMayores: 0,
            arrayCortadoMenores: 0,
            arrayMostLoyal: 0,
            arrayLeastLoyal: 0,
        }
    },
    created() {
        fetch(URLAPI, init)
            .then(response => response.json())
            .then(data => {
                this.miembros = data.results[0].members
                this.listaEstados(this.miembros)
                this.contarMiembrosPorPartido()
                this.tablas()
            })

    },

    methods: {
        listaEstados(ingreso) {
            let arrayNuevo = [];
            ingreso.forEach(estado => {
                if (!arrayNuevo.includes(estado.state)) {
                    arrayNuevo.push(estado.state)
                };
            });
            this.ordenarEstado = arrayNuevo.sort()
        },
        filtrarPorPartidos() {
            let miembrosFiltradosPorPartido = []
            if (this.check.length == 0) {

                miembrosFiltradosPorPartido = this.miembros
            } else {
                this.miembros.forEach(miembros => {
                    this.check.forEach(valorDeArray => miembros.party == valorDeArray ? miembrosFiltradosPorPartido.push(miembros) : "");
                })
            }
            this.filtrador = miembrosFiltradosPorPartido
        },
        filtrarPorEstados() {

            let filtrarMiembrosPorEstado = [];
            this.filtrador.forEach(miembros => {
                if (this.opciones == "all") {
                    filtrarMiembrosPorEstado.push(miembros)
                } else if (this.opciones == miembros.state) {
                    filtrarMiembrosPorEstado.push(miembros);
                };
            });
            this.tablaFiltrada = filtrarMiembrosPorEstado
        },
        contarMiembrosPorPartido() {
            this.miembros.forEach(representante => {
                if (representante.party == "D") {
                    this.miembrosDemocratas++;
                    this.votosDelPartidoDemocrata = this.votosDelPartidoDemocrata + representante.votes_with_party_pct;

                };
                if (representante.party == "R") {
                    this.miembrosRepublicanos++;
                    this.votosDelPartidoRepublicano = this.votosDelPartidoRepublicano + representante.votes_with_party_pct;

                };
                if (representante.party == "ID") {
                    this.miembrosIndependientes++;
                    this.votosDelPartidoIndependiente = this.votosDelPartidoIndependiente + representante.votes_with_party_pct;

                };

            });

            this.promedioRepublicanos = Math.round(this.votosDelPartidoRepublicano / this.miembrosRepublicanos);
            this.promedioDemocratas = Math.round(this.votosDelPartidoDemocrata / this.miembrosDemocratas);
            this.promedioIndependientes= Math.round(this.votosDelPartidoIndependiente / this.miembrosIndependientes);

            if (this.miembrosIndependientes == 0) {
                this.promedioIndependientes= 0
            };
            this.totalDeMiembros = Math.round(this.miembrosDemocratas + this.miembrosIndependientes + this.miembrosRepublicanos)

            this.totalVotosPromedio = Math.round(this.votosDelPartidoRepublicano + this.votosDelPartidoDemocrata + this.votosDelPartidoIndependiente)

        },





        tablas() {
            let diezPorCientoEnArray = Math.round(this.miembros.length * 0.10);


            const ordenarMenor = (x, y) => y.missed_votes_pct - x.missed_votes_pct;
            const ordenarMayor = (x, y) => x.missed_votes_pct - y.missed_votes_pct

            const lealtadMayor = (x, y) => y.votes_with_party_pct - x.votes_with_party_pct;
            const lealtadMenor = (x, y) => x.votes_with_party_pct - y.votes_with_party_pct;


            function cortarArray(array) {
                let arrayCortado = [];
                for (let i = 0; i < diezPorCientoEnArray; i++) {
                    arrayCortado.push(array[i]);
                };
                return arrayCortado;
            };

            let menores = this.miembros.sort(ordenarMenor);
            this.arrayCortadoMenores = cortarArray(menores);



            let mayores = this.miembros.sort(ordenarMayor);
            this.arrayCortadoMayores = cortarArray(mayores);


            let masLeales = this.miembros.sort(lealtadMayor);
            this.arrayMostLoyal = cortarArray(masLeales);


            let menosLeales = this.miembros.sort(lealtadMenor);
            this.arrayLeastLoyal = cortarArray(menosLeales);


        },


    },
    computed: { 
        actualizarTablas() {
            this.filtrarPorPartidos(),
                this.filtrarPorEstados()

        }
    }

}).mount('#app')

