
const fs = require('fs')
const path = require('path')
const readline = require('readline');


async function createStudyNotes() {
  const fileStream = fs.createReadStream('./grade-9/science/force-motion-energy/newtons-laws-study-notes.txt');



  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

 
  const notes = [];

  for await (const line of rl) {
    
    const number = Number.parseInt(line.substring(0,1))
    if(Number.isInteger(number)) {
        notes.push(line);
        // console.log(newJson)
    }


  }

  console.log('notes', notes)
}

createStudyNotes();