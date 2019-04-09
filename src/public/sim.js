//emojis list and generated forest
let forestGenerated = [];
let emoji = ["🌴", "🌿", "🍃", "🍀", " ", "🌻", "🌸", "🌳", "🐿", "🌲"];

function main() {
    //set charset so emoji work
    const head = document.querySelector('head');
    const meta = document.createElement('meta');
    meta.content = "charset=utf-8";
    head.appendChild(meta);

    //have the button press to a function
    const b = document.querySelector('button');
    b.addEventListener('click', runGenerator);
}

function runGenerator() {
    //hide elements
    document.getElementById("pushtray").style.display = 'none';
    document.getElementById("intro").style.display = 'none';
    
    const sIndexResult = document.createElement('h3');
    const words = document.createTextNode(`Simpson's Index is: `);

    //make it identifiable by simpsons id
    sIndexResult.setAttribute('id', 'simpsons');
    sIndexResult.appendChild(words);
    document.body.append(sIndexResult);

    //generate forest picture
    createForestPicture();

    //to make the row stay and not rerandomize
    const forestRows = document.querySelectorAll('p');

    //if each row is pressed, mark it as toggled
    forestRows.forEach((p) => {
        p.addEventListener('click', toggleSelectedRows);
    });

    //create new button that will show new random forest
    const buttonNewText =  document.createTextNode("generate");
    const buttonNew = document.createElement('button');
    buttonNew.appendChild(buttonNewText);
    document.body.appendChild(buttonNew);
    buttonNew.addEventListener('click', renewForest);
}

//create original forest
function createForestPicture() {
    if (document.getElementById("inputForest").value) {
        //split the characters entered by user
        emoji = document.getElementById("inputForest").value.split('');
    }

    //ranodmize string with emojis
    for (let i = 0; i < 8; i++) {
        let temp = "";
        const ment = document.createElement('p');

        //set row as unpinned
        ment.setAttribute('class', 'unpinned');
        for (let j= 0; j < 8; j++) {
            temp += emoji[Math.floor(Math.random() * emoji.length)];        
        }
        forestGenerated.push(temp);
        const newText = document.createTextNode(temp);
        ment.appendChild(newText);
        document.body.appendChild(ment);
    }
    
    //print out the simpson's result
    const sLineResult = document.getElementById('simpsons');
    sLineResult.innerText += simpsonsIndex(forestGenerated).toFixed(2);
    ominousWarningMake();   
}

//create new forest
function renewForest() {
    const oLTemporary = document.getElementById("pushtray");
    if (oLTemporary.style.display == 'block') {
        oLTemporary.style.display = 'none';
        while (oLTemporary.firstChild) {
            oLTemporary.removeChild(oLTemporary.firstChild);
        }
    }   

    //randomize string with emojis
    const fRows = document.querySelectorAll('p');
    for (let i = 0; i < fRows.length; i++) {
        //if row is unpinned, we can randomize
        if (fRows[i].getAttribute('class') === 'unpinned') {
            let temp = "";
            for (let j = 0; j < 8; j++) {
                temp += emoji[Math.floor(Math.random() * emoji.length)];
            }
            forestGenerated[i] = temp;
            fRows[i].innerText = temp;
        }
    }

    //print out the simpsons result
    const sLineResult = document.getElementById('simpsons');
    sLineResult.innerText = "Simpson's index is: " + simpsonsIndex(forestGenerated).toFixed(2);
    ominousWarningMake();
}

//Toggle selected rows to make sticky 
function toggleSelectedRows() {
    //if row is pinned and u click, unpin it
    if (this.getAttribute('class') === 'pinned') {
        this.setAttribute('class', 'unpinned');
    } else {
        //if row isn't pinned and u click on it, pin it
        this.setAttribute('class', 'pinned');
    }
}

//Show pop up of warning
function ominousWarningMake() {
    if (simpsonsIndex(forestGenerated) < 0.8 && document.getElementById("pushtray").style.display === 'none') {
        const c1 = document.createElement('div');
        const cContent = document.createElement('p');

        //write warning message 
        cContent.textContent = "Warning: index dropped to " + simpsonsIndex(forestGenerated).toFixed(2);
        c1.appendChild(cContent);

        //set up displays and append
        document.getElementById("pushtray").style.display = 'block';
        document.getElementById("pushtray").appendChild(c1);
    }
}

const simpsonsIndex = forest =>
  1 - Object.entries(
  [...forest.join("")].reduce(
      (counts, emoji) => ({...counts, [emoji]: (counts[emoji] || 0) + 1}),
      {}
  )
  ).reduce(([top, bottom], [species, count]) => [top + (count * (count - 1)), bottom + count], [0, 0])
  .reduce((sumLilN,bigN) => sumLilN / (bigN * (bigN - 1)));


//after dom loaded
document.addEventListener('DOMContentLoaded', main); 