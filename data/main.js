const listaEstados = (ingreso) => { 
    const arrayNuevo = []; 
    ingreso.results[0].members.forEach(estado => {
        if (!arrayNuevo.includes(estado.state)) {
            arrayNuevo.push(estado.state)
        };
    });
    return arrayNuevo.sort();
};
listaEstados(data)


const dibujarTabla = (tablaInfo, id) => {
    let opcionesDeEstados = document.querySelector(`#${id}`);
    opcionesDeEstados.innerHTML = ""
    tablaInfo.forEach(miembro => {
        let datosAcargar = document.createElement("tr");
        datosAcargar.innerHTML = `
            <td>${miembro.last_name} 
                ${miembro.middle_name ? miembro.middle_name :""}
                ${miembro.first_name}</td>
            <td>${miembro.party}</td>
            <td>${miembro.state}</td>
            <td>${miembro.seniority} years</td>
            <td>${miembro.votes_with_party_pct} Votes</td>
            `
            opcionesDeEstados.appendChild(datosAcargar);
        });
        
    };

    dibujarTabla(data.results[0].members, "completadoAutomatico");
    
    const seleccionar = document.querySelector("form");
    const opcionesEstados = document.querySelector("select");
    const marcados = document.querySelectorAll("input[type='checkbox']");
    const marcado = Array.from(marcados)

seleccionar.addEventListener("change", () => {
    let verificacion = marcado.filter(elPartido => elPartido.checked === true);
    let partidos = verificacion.map(elPartido => elPartido.value);
    let mXpartido = [];
    const filtrarPorPartidos = () => {

        if (partidos.length == 0) {
            mXpartido = data.results[0].members
        } else {
            data.results[0].members.forEach(miembros => {
                partidos.forEach(queMarco => miembros.party == queMarco ? mXpartido.push(miembros) : "");
            })
        }
        dibujarTabla(mXpartido, "completadoAutomatico");
    }
    filtrarPorPartidos()

    let seleccion = opcionesEstados.value;

    const filtradoDePartido = () => {
        let estadoParaFiltrar = [];
        mXpartido.forEach(miembros => {
            if (seleccion == "all") {
                estadoParaFiltrar.push(miembros)
            } else if (seleccion == miembros.state) {
                estadoParaFiltrar.push(miembros);
            };
        });
        dibujarTabla(estadoParaFiltrar, "completadoAutomatico")
    };
    filtradoDePartido();
});
const dibujarOpciones = (datosEstado) => {
    datosEstado.forEach(arrayNuevo => { 
        let opciones = document.createElement("option") 
        opciones.innerHTML = arrayNuevo;  
        opciones.value = arrayNuevo;
        opcionesEstados.appendChild(opciones);
    });
};
dibujarOpciones(listaEstados(data));