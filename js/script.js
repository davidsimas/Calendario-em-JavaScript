const currentDate = document.querySelector(".current-date"),
daysTag  = document.querySelector(".days"),
prevNextIcon = document.querySelectorAll(".icons span");

// Obtendo nova data, ano e mês atuais.
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

const renderCalendar = () => {
    // Obtendo a primeira data do mês.
    let firstDateofMonth = new Date(currYear, currMonth, 1).getDay();
    // Obtendo a última data do mês.
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    // Obtendo último dia do mês.
    let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
    // Obtendo a última data do mês anterior.
    let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

    // Criando "li" dos últimos dias do mês anterior.
    for (let i = firstDateofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    // Criando li de todos os dias do mês atual.
    for (let i = 1; i <= lastDateofMonth; i++) {
        // Adicionando classe "active" a "li" se o dia, mês e ano atuais corresponderem.
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear ===new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    // Criando li dos primeiros dias do próximo mês.
    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }
    
    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon => {
    // Adicionando evento de clique em ambos os ícones.
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth -1 : currMonth + 1;
        
        // Se o mês atual for menor que 0 ou maior que 11.
        if (currMonth < 0 || currMonth > 11) {
            // Criando uma nova data do ano e mês atual e transmitindo-a como valor de data.
            date = new Date(currYear, currMonth)
            // Atualizando o ano atual com o novo ano da data.
            currYear = date.getFullYear();
            // Atualizando o mês atual com a nova data mês.
            currMonth = date.getMonth();
        } else {
            // Caso contrário, passe nova data como valor de data.
            date = new Date();
        }
        
        renderCalendar()
    });
});