
const fs = require('fs')
const path = require('path')
const readline = require('readline');
require('dotenv').config({ path: '../.env' });



async function processLineByLine() {
  const fileStream = fs.createReadStream('./questions.txt');



  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const data = [];
  const dataStruct = {
    "question": "",
    "multipleChoice": [],
    "answer": ""
  }

  let newJson = JSON.parse(JSON.stringify(dataStruct));

  for await (const line of rl) {
    

    const number = Number.parseInt(line.substring(0,1))
    if(Number.isInteger(number)) {
      newJson = JSON.parse(JSON.stringify(dataStruct));
        newJson.question = line.slice(3).trim();
        // console.log(newJson)
    }

    const letter = line.substring(0,3).trim();

    if(letter === 'A.') {
      const choice = line.slice(3).trim();       
      console.log('choice', choice) 
        newJson?.multipleChoice?.push(choice);
    }
     if(letter === 'B.') {
      const choice = line.slice(3).trim();             
        newJson?.multipleChoice?.push(choice);
    }
     if(letter === 'C.') {
      const choice = line.slice(3).trim();        
        newJson?.multipleChoice?.push(choice);
    }
     if(letter === 'D.') {
      const choice = line.slice(3).trim();        
        newJson?.multipleChoice?.push(choice);

    }

    const answer = line.substring(0,7).trim();

    if(answer === 'Answer:') {
      newJson.answer = line.slice(10).trim();

      for(let i = 0; i <=20; i++) {
        console.log('line.slice(i).trim()', i, line.slice(i).trim())
      }
      console.log('newJson.answer', newJson.answer)
      data.push(JSON.parse(JSON.stringify(newJson)));
    }

  }

  console.log('data', data)
  fs.writeFile( './data.json', JSON.stringify(data), (err) => {
    if(err) {
      console.log(err)
    }
  } )
}

processLineByLine();









const { Configuration, OpenAIApi } = require("openai");


const queryGPT = async () => {
  console.log('process.env.OPENAI_API_KEY', process.env.OPENAI_API_KEY)
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "under grade 9 Physical Science:, subtopic: b. Matter and Properties, could you provide 50 multiple choice questions and their answers that comprehensively cover iv. Chemical Reactions . Four choices per question. No, \"None of the above\" and \"All of the above choices\". No true or false answers. No, \"What is the formula...\" questions.\n\n    The questions, choices and answers should adopt the following format:\n    1. What force causes objects to move in a straight line unless acted upon by another force?\nA. Friction\nB. Inertia\nC. Centripetal force\nD. Gravity\nAnswer: B. Inertia\n\nPlease note that the answer is not just a letter but a letter and the entire answer. I.e., Answer: B. Inertia\n\n\n1. What type of reaction is caused by a combination of two substances?\nA. Decomposition\nB. Synthesis\nC. Single Replacement\nD. Double Replacement\nAnswer: B. Synthesis\n\n2. What type of reaction is caused by a single element replacing another element in a compound?\nA. Decomposition\nB. Synthesis\nC. Single Replacement\nD. Double Replacement\nAnswer: C. Single Replacement\n\n3. What type of reaction is caused by the breakdown of a compound into two or more simpler compounds?\nA. Decomposition\nB. Synthesis\nC. Single Replacement\nD. Double Replacement\nAnswer: A. Decomposition\n\n4. What type of reaction is caused by two compounds swapping elements?\nA. Decomposition\nB. Synthesis\nC. Single Replacement\nD. Double Replacement\nAnswer: D. Double Replacement\n\n5. What type of reaction is caused by the combination of two or more elements to form a compound?\nA. Decomposition\nB. Synthesis\nC. Single Replacement\nD. Double Replacement\nAnswer: B. Synthesis\n\nplease continue at 10 questions at a time\n\n6. What type of reaction occurs when a metal is exposed to an acid?\nA. Decomposition\nB. Synthesis\nC. Single Replacement\nD. Double Replacement\nAnswer: C. Single Replacement\n\n7. What type of reaction occurs when hydrogen and oxygen combine to form water?\nA. Decomposition\nB. Synthesis\nC. Single Replacement\nD. Double Replacement\nAnswer: B. Synthesis\n\n8. What type of reaction occurs when a compound breaks down into two or more simpler compounds?\nA. Decomposition\nB. Synthesis\nC. Single Replacement\nD. Double Replacement\nAnswer: A. Decomposition\n\n9. What type of reaction occurs when two elements in a compound exchange places?\nA. Decomposition\nB. Synthesis\nC. Single Replacement\nD. Double Replacement\nAnswer: D. Double Replacement\n\n10. What type of reaction occurs when two elements combine to form a compound?\nA. Decomposition\nB. Synthesis\nC. Single Replacement\nD. Double Replacement\nAnswer: B. Synthesis\n\nplease continue at 10 questions at a time\n\n11. What type of reaction occurs when two compounds swap an element?\nA. Decomposition\nB. Synthesis\nC. Single Replacement\nD. Double Replacement\nAnswer: D. Double Replacement\n\n12. What type of reaction occurs when a metal reacts with oxygen to form an oxide?\nA. Decomposition\nB. Synthesis\nC. Single Replacement\nD. Double Replacement\nAnswer: C. Single Replacement\n\n13. What type of reaction occurs when a metal reacts with a nonmetal to form a compound?\nA. Decomposition\nB. Synthesis\nC. Single Replacement\nD. Double Replacement\nAnswer: B. Synthesis\n\n14. What type of reaction occurs when chlorine gas reacts with sodium metal to form sodium chloride?\nA. Decomposition\nB. Synthesis\nC. Single Replacement\nD. Double Replacement\nAnswer: B. Synthesis\n\n15. What type of reaction occurs when methane is exposed to oxygen to form carbon dioxide and water?\nA. Decomposition\nB. Synthesis\nC. Single Replacement\nD. Double Replacement\nAnswer: B. Synthesis\n\nplease continue at 10 questions at a time\n\n16. What type of reaction occurs when calcium oxide is heated to form calcium metal and oxygen gas?\nA. Decomposition\nB. Synthesis\nC. Single Replacement\nD. Double Replacement\nAnswer: A. Decomposition\n\n17. What type of reaction occurs when two elements swap places in a compound?\nA. Decomposition\nB. Synthesis\nC. Single Replacement\nD. Double Replacement\nAnswer: D. Double Replacement\n\n18. What type of reaction occurs when two compounds combine to form a larger compound?\nA. Decomposition\nB. Synthesis\nC. Single Replacement\nD. Double Replacement\nAnswer: B. Synthesis\n\n19. What type of reaction occurs when hydrochloric acid reacts with magnesium to form magnesium chloride and hydrogen gas?\nA. Decomposition\nB. Synthesis\nC. Single Replacement\nD. Double Replacement\nAnswer: C. Single Replacement\n\n20. What type of reaction occurs when sulfur dioxide is exposed to oxygen to form sulfur trioxide?\nA. Decomposition\nB. Synthesis\nC. Single Replacement\nD. Double Replacement\nAnswer: B. Synthesis\n\nplease continue at 10 questions at a time\n\n21. What type of reaction occurs when two compounds exchange elements?\nA. Decomposition\nB. Synthesis\nC. Single Replacement\nD. Double Replacement\nAnswer: D. Double Replacement\n\n22. What type of reaction occurs when sodium hydroxide reacts with hydrochloric acid to form sodium chloride and water?\nA. Decomposition\nB. Synthesis\nC. Single Replacement\nD. Double Replacement\nAnswer: D. Double Replacement\n\n23. What type of reaction occurs when a metal reacts with a nonmetal to produce a compound and a gas?\nA. Decomposition\nB. Synthesis\nC. Single Replacement\nD. Double Replacement\nAnswer: C. Single Replacement\n\n24. What type of reaction occurs when hydrogen gas reacts with chlorine gas to form hydrogen chloride?\nA. Decomposition\nB. Synthesis\nC. Single Replacement\nD. Double Replacement\nAnswer: B. Synthesis\n\n25. What type of reaction occurs when calcium carbonate is exposed to heat to form calcium oxide and carbon dioxide?\nA. Decomposition\nB. Synthesis\nC. Single Replacement\nD. Double Replacement\nAnswer: A. Decomposition\n\nplease continue at 10 questions at a time\n\n26. What type of reaction occurs when copper metal reacts with nitric acid to form copper nitrate and nitrogen dioxide?\nA. Decomposition\nB. Synthesis\nC. Single Replacement\nD. Double Replacement\nAnswer: C. Single Replacement\n\n27. What type of reaction occurs when sodium reacts with chlorine to form sodium chloride?\nA. Decomposition\nB. Synthesis\nC. Single Replacement\nD. Double Replacement\nAnswer: B. Synthesis\n\n28. What type of reaction occurs when sodium chloride is heated to form sodium and chlorine gas?\nA. Decomposition\nB. Synthesis\nC. Single Replacement\nD. Double Replacement\nAnswer: A. Decomposition\n\n29. What type of reaction occurs when magnesium reacts with oxygen to form magnesium oxide?\nA. Decomposition\nB. Synthesis\nC. Single Replacement\nD. Double Replacement\nAnswer: B. Synthesis\n\n30. What type of reaction occurs when hydrogen peroxide is exposed to heat to form water and oxygen gas?\nA. Decomposition\nB. Synthesis\nC. Single Replacement\nD. Double Replacement\nAnswer: A. Decomposition\n\nplease continue at 10 questions at a time\n\n31. What type of reaction occurs when zinc metal reacts with sulfuric acid to form zinc sulfate and hydrogen gas?\nA. Decomposition\nB. Synthesis\nC. Single Replacement\nD. Double Replacement\nAnswer: C. Single Replacement\n\n32. What type of reaction occurs when two elements in a compound exchange places?\nA. Decomposition\nB. Synthesis\nC. Single Replacement\nD. Double Replacement\nAnswer: D. Double Replacement\n\n33. What type of reaction occurs when two elements combine to form a compound?\nA. Decomposition\nB. Synthesis\nC. Single Replacement\nD. Double Replacement\nAnswer: B. Synthesis\n\n34. What type of reaction occurs when methane and oxygen react to form carbon dioxide and water?\nA. Decomposition\nB. Synthesis\nC. Single Replacement\nD. Double Replacement\nAnswer: B. Synthesis\n\n35. What type of reaction occurs when hydrochloric acid reacts with magnesium to form magnesium chloride and hydrogen gas?\nA. Decomposition\nB. Synthesis\nC. Single Replacement\nD. Double Replacement\nAnswer: C. Single Replacement\n\nplease continue at 10 questions at",
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  console.log('respoonse', response);
}


