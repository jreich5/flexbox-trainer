"use strict";

const answerContainer = document.querySelector('.answer-container');
const userContainer = document.querySelector('.user-container');
const tryItBtn = document.querySelector('#try-it');
const userInput = document.querySelector('textarea');
const getRandNum = (min, max) => Math.floor(Math.random() * (max - min) + min);
const getRandElement = arr => arr[getRandNum(0, arr.length)];
const arrNumOfItems = [3, 5, 20];

const flexboxProperties = {
    parent: [
        {
            name: "justify-content",
            values: ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"]
        },
        {
            name: "align-items",
            values: ["flex-start", "flex-end", "center", "baseline", "stretch"]
        },
        {
            name: "align-content",
            values: ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly", "stretch"]
        },
        {
            name: "flex-direction",
            values: ["row", "row-reverse", "column", "column-reverse"]
        },
        {
            name: "flex-wrap",
            values: ["nowrap", "wrap", "wrap-reverse"]
        },
        
    ],
    item: [
        {
            name: "align-self",
            values: ["flex-start", "flex-end", "center", "baseline", "stretch"]
        },
        {
            name: "order",
            values: "pos/neg"
        },
        {
            name: "flex-grow",
            values: [0, 1, 2]
        }  
    ]
}



const generateParentStyle = (arr) => {
    return arr.reduce((prev, curr) => {
        prev[curr.name] = getRandElement(curr.values);
        return prev;
    }, {});
};

const generateItemStyle = (arr) => {
    return arr.reduce((prev, curr) => {
        let result = "";
        switch (curr.name) {
            case "order":
                result = getRandNum(0, curr.values.length);
                break;
            default:
                result = getRandElement(curr.values);
        }
        prev[curr.name] = result;
        return prev;
    }, {});
};

const createHTML = (difficulty) => {
    let output = '';
    let numberOfItems = (difficulty === 'basic') ? [3] : arrNumOfItems;
    let length = getRandElement(numberOfItems);
    for (var i = 0; i < length; i += 1) {
        output += `<div class="item">Item ${String(i + 1).padStart(2, 0)}</div>`;
    }
    return output;
};

const verifyMatch = () => {
    return Promise.all([
        domtoimage.toPng(document.querySelector(".answer-container")),
        domtoimage.toPng(document.querySelector(".user-container"))
    ]).then(function(result) {
        return result[0] === result[1];
    }).catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
}


const addTryItButtonListener = () => {
    tryItBtn.addEventListener("click", function(e) {
        userContainer.style = userInput.value + "display: flex;";
        const textareas = [].slice.call(document.querySelectorAll("textarea"));
        textareas.shift();
        
        textareas.forEach(function(textarea, index) {
            document.querySelectorAll(".user-container div.item")[index].style = textarea.value + "display: flex";
        });
    
        verifyMatch().then(function(isMatch) {
            if (isMatch) {
                alert("Excellent work! :) Now try a new exercise.");
            }
        });
    });
}

const addItemStyle = (difficulty) => {
    const answerItems = document.querySelectorAll(".answer-container .item");
    if (difficulty === 'challenge' && answerItems.length < 10) {
        for (let answerItem of answerItems) {
            Object.assign(answerItem.style, generateItemStyle(flexboxProperties.item));
        }
    }
};

const addItemTextAreas = (difficulty) => {
    let output = "";
    const answerItems = document.querySelectorAll(".answer-container .item");
    if (difficulty === 'challenge' && answerItems.length < 10) {
        answerItems.forEach(function(element, index) {
            output += `
            <label for="item-${index + 1}-input">Enter attributes for item #${index + 1}</label>
            <textarea id='item-${index + 1}-input'>property-here: value-here;</textarea>
            `;
            index++;
        });
    }
    return output;
}


const setHTML = (difficulty) => {
    
    const initialHTML = createHTML(difficulty);
    answerContainer.style.display = "flex";
    userContainer.style.display = "flex";

    answerContainer.innerHTML = initialHTML;
    userContainer.innerHTML = initialHTML;
    userContainer.style = "";

    Object.assign(answerContainer.style, generateParentStyle(flexboxProperties.parent));

    return Promise.resolve();
};

setHTML('basic');

addTryItButtonListener();

document.querySelectorAll('.difficulty-btn').forEach(function(element) {
    element.addEventListener("click", function(e) {
        document.getElementById('user-input').value = "property-here: value-here;";
        setHTML(e.target.dataset.diff).then(function() {
            addItemStyle(e.target.dataset.diff);
        }).then(function() {
            const itemTextAreas = document.querySelector("#item-textareas");
            itemTextAreas.innerHTML = addItemTextAreas(e.target.dataset.diff);
        });
    });
});

