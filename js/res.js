let answers = JSON.parse(window.sessionStorage.getItem('answers'))
let selected_ans = JSON.parse(window.sessionStorage.getItem('selected_ans'))
let question = JSON.parse(window.sessionStorage.getItem('question'))
let res = ''

function getcolor(x, y) {
    if (x === y) {
        return 'bg_green'
    }
    else {
        return 'bg_red'
    }
}

for (let i = 0; i < answers.length; i++) {
    res += `
        <tr class="${getcolor(selected_ans[i], answers[i])}">
            <td>${question[i]}</td>
            <td>${selected_ans[i]}</td>
            <td>${answers[i]}</td>
            <td>${true ? selected_ans[i] === answers[i] : false}</td>
        </tr>
    `
}

res += `
    <tr class="bg_blue">
        <td colspan="3">total</td>
        <td>${window.sessionStorage.getItem('correct')}</td>
    </tr>
`
document.querySelector('.table').innerHTML += res



