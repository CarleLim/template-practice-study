const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const makePage = (options) => {
    const template = fs.readFileSync(path.join(__dirname, 'template.carle'), 'utf8');
    let result = template;
    Object.keys(options)
        .forEach((key) => {
            result = result.replace(`&{${key}}`, options[key]);
        })
    result = result.replace(/\&\{([^\}])*\}/g, '');
    return result;  
}

app.get('/', (req, res) => {
    const mainPage = makePage({
        title: 'Carle',
        contents: 'MainPage',
        additional: '추가정보'
    })
    res.send(mainPage)
});

app.get('/about', (req, res) => {
    const aboutPage = makePage({
        title: 'Carle',
        contents: 'ABOUT Page',
    })
    res.send(aboutPage)
});

app.listen(3000, () => {
    console.log('Server is running on port 3000')
});