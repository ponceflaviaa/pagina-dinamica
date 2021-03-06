console.log("π’ mostrar los miembros de house π’");


data.results[0].members.forEach(members => console.log((members.first_name + " " + members.last_name)))


console.log("π½ mostrar los miembros de senate π½");


data.results[0].members.forEach(j => console.log((j.first_name + " " + j.last_name)))


console.log("πmostrar los estados, alfabeticamente y sin repetir π")


const listaEstados =  (data) => {
    const arrayNuevo = []
    data.results[0].members.forEach(estado => {
        if (!arrayNuevo.includes(estado.state)) {
            arrayNuevo.push(estado.state)
        }
    })
    return arrayNuevo.sort()
};
listaEstados(data)

console.log("π¨ββοΈ funcion que muestre los miembros de un determinado partido π¨ββοΈ ");

const miembrosPorPartido = (data, partido) =>
    data.results[0].members.filter(member => member.party === partido)
        .forEach(member => console.log(member.first_name + " " + member.last_name + " " + member.party));



console.log("πfuncion que muestre los miembros de un determinado estado π");
const miembrosPorEstado = (data, estado) =>
    data.results[0].members.filter(member => member.state === estado)
        .forEach(member => console.log(member.first_name + " " + member.last_name + " " + member.state));
