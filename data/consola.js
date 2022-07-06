console.log("🏢 mostrar los miembros de house 🏢");


data.results[0].members.forEach(members => console.log((members.first_name + " " + members.last_name)))


console.log("🗽 mostrar los miembros de senate 🗽");


data.results[0].members.forEach(j => console.log((j.first_name + " " + j.last_name)))


console.log("📚mostrar los estados, alfabeticamente y sin repetir 📚")


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

console.log("👨‍⚖️ funcion que muestre los miembros de un determinado partido 👨‍⚖️ ");

const miembrosPorPartido = (data, partido) =>
    data.results[0].members.filter(member => member.party === partido)
        .forEach(member => console.log(member.first_name + " " + member.last_name + " " + member.party));



console.log("🌎funcion que muestre los miembros de un determinado estado 🌎");
const miembrosPorEstado = (data, estado) =>
    data.results[0].members.filter(member => member.state === estado)
        .forEach(member => console.log(member.first_name + " " + member.last_name + " " + member.state));
