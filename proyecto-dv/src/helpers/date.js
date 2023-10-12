/**
 * Transforma un objeto Date a una representación como string con el formato:
 * AAAA-MM-DD hh:mm:ss
 * 
 * Si date es null, se retorna null.
 * 
 * @param {Date|null} date 
 * @returns {string|null}
 */
export function dateToString(date)
{
    if(date == null) return null;

    // Tenemos dos maneras de lograr el objetivo:
    // 1. Parsear manualmente el objeto Date y armar el string.
    // 2. Usar la API de Intl.

    // Forma 1:
    /*let year = date.getFullYear();
    let month = ("" +(date.getMonth() + 1)).padStart(2, '0'); // Los meses en Date los cuenta de 0 a 11.
    let day = ("" + date.getDate()).padStart(2, '0');
    let hours = ("" + date.getHours()).padStart(2, '0');
    let minutes = ("" + date.getMinutes()).padStart(2, '0');
    let seconds = ("" + date.getSeconds()).padStart(2, '0');

    // month = month < 10 ? '0' + month : month;
    // day = day < 10 ? '0' + day : day;
    // hours = hours < 10 ? '0' + hours : hours;
    // minutes = minutes < 10 ? '0' + minutes : minutes;
    // seconds = seconds < 10 ? '0' + seconds : seconds;

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;*/

    // Forma 2:
    const dateFormatter = new Intl.DateTimeFormat('es-AR', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
    }).format(date);

    return dateFormatter.replace(',', '');

    // const dateFormatter = new Intl.DateTimeFormat('es-AR', {
    //     year: 'numeric', month: '2-digit', day: '2-digit',
    // }).format(date);
    // const hourFormatter = new Intl.DateTimeFormat('es-AR', {
    //     hour: '2-digit', minute: '2-digit', second: '2-digit',
    // }).format(date);
    // return `${dateFormatter} ${hourFormatter}`;
}