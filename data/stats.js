const miembros = data.results[0].members;

let miembrosRepublicanos = 0;
let miembrosDemocratas = 0;
let miembrosIndependientes = 0;

let votosDelPartidoRepublicano = 0;
let votosDelPartidoDemocrata = 0;
let votosDelPartidoIndependiente = 0;

miembros.forEach(miembro => {
    if (miembro.party == "ID") {
        miembrosIndependientes++;
        votosDelPartidoIndependiente = votosDelPartidoIndependiente + miembro.votes_with_party_pct;

    };
    if (miembro.party == "R") {
        miembrosRepublicanos++;
        votosDelPartidoRepublicano = votosDelPartidoRepublicano + miembro.votes_with_party_pct;

    };
    if (miembro.party == "D") {
        miembrosDemocratas++;
        votosDelPartidoDemocrata = votosDelPartidoDemocrata + miembro.votes_with_party_pct;

    };

});

let promedioRepublicanos = Math.round(votosDelPartidoRepublicano / miembrosRepublicanos);
let promedioDemocratas = Math.round(votosDelPartidoDemocrata / miembrosDemocratas);
let promedioIndependientes = Math.round(votosDelPartidoIndependiente / miembrosIndependientes);

if (miembrosIndependientes == 0) {
    promedioIndependientes = 0
};

let totalDeMiembros =  miembrosRepublicanos + miembrosDemocratas + miembrosIndependientes;
let totalVotosPromedio = promedioRepublicanos + promedioDemocratas + promedioIndependientes;


let tabla = document.querySelector(".tablaData")
const dibujarTabla = (miembros) => {
    let fila = document.createElement("tr")
    tabla.innerHTML += ` 
    <tr>
    <td> Republicans</td>
    <td> ${miembrosRepublicanos}</td>
    <td>${promedioRepublicanos}%</td>
    </tr>
    <tr>
    <td> Democrats </td>
    <td>${miembrosDemocratas}</td>
    <td>${promedioDemocratas}%</td>
    </tr>
    <tr>
    <td> Independients </td>
    <td>${miembrosIndependientes}</td>
    <td>${promedioIndependientes}%</td>
    </tr>
    <tr>
    <td>Total </td>
    <td>${totalDeMiembros}</td>
    <td>${totalVotosPromedio}</td>
    </tr>
    `   
    tabla.appendChild(fila)
}
dibujarTabla(miembros)

let diezPorCiento = Math.round(totalDeMiembros * 10 / 100);

const miembrosConMenosVotosPerdidos = miembros.map(miembro => miembro).sort((miembro1, miembro2) => {
    if (miembro1.missed_votes_pct > miembro2.missed_votes_pct) {
        return 1
    } else if (miembro1.missed_votes_pct < miembro2.missed_votes_pct) {
        return -1
    } else { 
        return 0
    }
})

const miembrosConMasVotosPerdidos = miembros.map(miembro => miembro).sort((miembro1, miembro2) => {
    if (miembro1.missed_votes_pct > miembro2.missed_votes_pct) {
        return -1
    } else if (miembro1.missed_votes_pct < miembro2.missed_votes_pct) {
        return 1
    } else { 
        return 0
    }
});

const menosRepresentativo = miembros.map(miembro =>miembro).sort((miembro1, miembro2) => {
    if (miembro1.votes_with_party_pct < miembro2.votes_with_party_pct) {
        return 1
    } else if (miembro1.votes_with_party_pct > miembro2.votes_with_party_pct) {
        return -1
    } else { 
        return 0
    }
})

const masRepresentativo = miembros.map(miembro =>miembro).sort((miembro1, miembro2) => {
    if (miembro1.votes_with_party_pct > miembro2.votes_with_party_pct) {
        return -1
    } else if (miembro1.votes_with_party_pct < miembro2.votes_with_party_pct) {
        return 1
    } else { 
        return 0
    }
})

votosTotales = miembros.total_votes //100%
votosPorPartido = miembros.votes_with_party_pct 

function cortarArray (miembrosDeHouseYSenate) {
    let arrayDeDiezPorciento = [] 
    for ( let i=0 ; i < diezPorCiento ; i++){ 
        arrayDeDiezPorciento.push(miembrosDeHouseYSenate[i])}
            return arrayDeDiezPorciento;
}

function crearTablas(id, arrayCortado, filtro, houseOSenate) {
    let tabla = document.getElementById(`${id}`);
    arrayCortado.forEach(miembro => {   
        let cantidadVotos = (miembro.votes_with_party_pct * miembro.total_votes) / 100;
        let filaNueva = document.createElement("tr");
        filaNueva.innerHTML = `
    <td> <a href = "${miembro.url}">${miembro.last_name} 
    ${miembro.middle_name ? miembro.middle_name :""} 
    ${miembro.first_name}</a></td>
    <td>${filtro == "missed_votes"? miembro[filtro] : Math.floor(cantidadVotos)} </td>
    <td>${miembro[houseOSenate]}%</td>
    `
        tabla.appendChild(filaNueva);
    });
};


const mains = document.querySelector("main");

if(mains.id == "attendance"){
let menores = miembros.sort(miembrosConMenosVotosPerdidos);
let arrayCortadoMenores = cortarArray(menores);
crearTablas("least", arrayCortadoMe, "missed_votes", "missed_votes_pct");

let mayores = miembros.sort(miembrosConMasVotosPerdidos);
let arrayCortadoMayores = cortarArray(mayores); 
crearTablas("most", arrayCortadoMayores, "missed_votes", "missed_votes_pct");
} 
else if (mains.id == "loyalty"){

let masLeales = miembros.sort(masRepresentativo);
let arrayMostLoyal = cortarArray(masLeales);
crearTablas("mayores", arrayMostLoyal, "algo", "votes_with_party_pct");

let menosLeales = miembros.sort(menosRepresentativo);
let arrayLeastLoyal = cortarArray(menosLeales);
crearTablas("menores", arrayLeastLoyal, "algo", "votes_with_party_pct")
};

