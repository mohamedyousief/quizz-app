    document.querySelector('.box_name').innerHTML += window.sessionStorage.getItem('sname');

    let quiz = [
        ["Which HTML tag is used to define a table row?", "tr", "td", "th"],
        ["What does CSS stand for?", "Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets"],
        ["Which JavaScript method is used to write into an alert box?", "alert()", "msg()", "message()"],
        ["Which HTML element is used to specify a footer for a document?", "footer", "section", "bottom"],
        ["Which CSS property is used to control the text size?", "font-size", "text-size", "font-weight"],
        ["Which JavaScript method is used to round a number to the nearest integer?", "Math.round()", "Math.floor()", "Math.ceil()"],
        ["Which HTML element is used to define a clickable button?", "button", "click", "input"],
        ["Which CSS property is used to change the font of an element?", "font-family", "font-type", "font-style"],
        ["What is the correct way to link an external CSS file?", "link rel='stylesheet' href='styles.css'", "stylesheet styles.css /stylesheet", "css-link href='styles.css'"],
        ["Which JavaScript function is used to parse a JSON string?", "JSON.parse()", "JSON.stringify()", "JSON.convert()"]
    ];

    let answers = [
        "tr",
        "Cascading Style Sheets",
        "alert()",
        "footer",
        "font-size",
        "Math.round()",
        "button",
        "font-family",
        "link rel='stylesheet' href='styles.css'",
        "JSON.parse()"  
    ];

    let question=[]
    for(let i=0;i<quiz.length;i++){
        question.push(quiz[i][0])
    }

    let selected_ans=['','','','','','','','','','']

    let q = 0;  
    let correct = 0;
    let previous_btn = document.getElementById('previous-btn');
    let next_btn = document.getElementById('next-btn');
    let finish_btn = document.getElementById('finish-btn');

    function displayQuestion() {
        let res = `
        <p>${quiz[q][0]}</p>
        <label class="option"><input type="radio" name="q${q}" value="${quiz[q][1]}"> ${quiz[q][1]}</label>
        <label class="option"><input type="radio" name="q${q}" value="${quiz[q][2]}"> ${quiz[q][2]}</label>
        <label class="option"><input type="radio" name="q${q}" value="${quiz[q][3]}"> ${quiz[q][3]}</label>
        `;
        document.querySelector('.question').innerHTML = res;
        let options = document.querySelectorAll(`input[name="q${q}"]`);
        if (selected_ans[q]!==''){
            options.forEach((o)=>{
                if (o.value===selected_ans[q]){
                    o.checked=true
                }
            })
        }
    }

    function show_btns() {
        if (q > 0) {
            previous_btn.classList.add('active');
        } else {
            previous_btn.classList.remove('active');
        }
        
        if (q < quiz.length - 1) {
            next_btn.classList.add('active');
            finish_btn.classList.remove('active');
        } else {
            next_btn.classList.remove('active'); 
            finish_btn.classList.add('active');
        }
    }

    function get_ans(){
        let options = document.querySelectorAll(`input[name="q${q}"]`);
        let ans = '';
        options.forEach((o) => {
            if (o.checked) {
                ans = o.value;
                selected_ans[q]=ans;
            }
        });
    }


    function handlebtns() {
        next_btn.addEventListener('click', () => {
            get_ans();
            if (q < quiz.length - 1) {
                q++;
                displayQuestion();
                show_btns();
            }
        });

        previous_btn.addEventListener('click', () => {
            if (q > 0) {
                q--;
                displayQuestion();
                show_btns();
            }
        });

        finish_btn.addEventListener('click', () => {
            get_ans();
            for(let i=0;i<selected_ans.length;i++){
                if(selected_ans[i]==answers[i]){
                    correct++
                }
            }
            alert('Correct answers: ' + correct);
            window.sessionStorage.setItem('selected_ans',JSON.stringify(selected_ans))
            window.sessionStorage.setItem('answers',JSON.stringify(answers))
            window.sessionStorage.setItem('question',JSON.stringify(question))
            window.sessionStorage.setItem('correct',correct)
            window.open('result.html', '_parent');
        });
    }


    function main() {
        displayQuestion();
        show_btns();
        handlebtns();
    }

    main();