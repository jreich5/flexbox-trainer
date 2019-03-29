"use strict";

const answerContainer = document.querySelector('.answer-container');
const userContainer = document.querySelector('.user-container');
const tryItBtn = document.querySelector('#try-it');
const userInput = document.querySelector('textarea');

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
            name: "flex-basis",
            values: ["1em", "2em", "3em", "4em", "5em"]
        },
        {
            name: "order",
            values: "pos/neg"
        },
        {
            name: "flex-shrink",
            values: [0, 1, 2]
        },
        {
            name: "flex-grow",
            values: [0, 1, 2]
        }  
    ]
}

const getRandNum = (min, max) => Math.floor(Math.random() * (max - min) + min);
const getRandElement = arr => arr[getRandNum(0, arr.length)];
const numberOfItems = [3, 5, 20];

const generateParentStyle = (arr) => {
    return arr.reduce((prev, curr) => {
        prev[curr.name] = getRandElement(curr.values);
        return prev;
    }, {});
};

const generateItemStyle = (arr) => {
    return arr.reduce((prev, curr) => {
        prev[curr.name] = getRandElement(curr.values);
        return prev;
    }, {});
};

const createItemsHtml = () => {
    let output = '';
    let length = getRandElement(numberOfItems);
    for (var i = 0; i < length; i += 1) {
        output += `<div class="item">Item ${String(i + 1).padStart(2, 0)}</div>`;
    }
    return output;
};

const initialHtml = createItemsHtml();

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

answerContainer.style.display = "flex";
userContainer.style.display = "flex";
answerContainer.innerHTML = initialHtml;
userContainer.innerHTML = initialHtml;

tryItBtn.addEventListener("click", function(e) {
    userContainer.style = userInput.value + "display: flex;";
    verifyMatch().then(function(isMatch) {
        if (isMatch) {
            alert("Excellent work! :) Now try a new exercise.");
        }
    });
});

Object.assign(answerContainer.style, generateParentStyle(flexboxProperties.parent));