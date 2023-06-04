var AWS = require('aws-sdk');
// const fetch = require('node-fetch'); // import node-fetch (enables the fetch API to be used server-side)
// const { Pool } = require('pg'); // import node-postgres
const { AI_PROMPT, Client, HUMAN_PROMPT } = require('./claude.js');
const username = "test";


// const pool = new Pool({ // create connection to database
//   connectionString: process.env.DATABASE_URL,	// use DATABASE_URL environment variable from Heroku app 
//   ssl: {
//     rejectUnauthorized: false // don't check for SSL cert
//   }
// });

// const getAllActivities = (req, res) => {
//   const getString = 'SELECT * FROM my_activities'; // select all rows from the 'my_activities' table
//   const countString = 'SELECT count(*) FROM my_activities' // get total row count from the 'my_activities' table
//   pool.query(getString) // send query to select all rows from the 'my_activities' table 
//     .then(activityResults => {
//       let activities = activityResults.rows;
//       pool.query(countString) // send query to get total row count from the 'my_activities' table
//         .then(countResult => {
//           let count = countResult.rows[0].count;
//           console.log('Activities List:', activities);
//           console.log(`Activities Count: ${count}`);
//           res.json({ activities, count})
//           // res.render('index', { activities: activities, count: count }); // render index.ejs, and send activity and count results to index.ejs
//           // TODO: Send info to frontend 
//         })
//     })
//     .catch(err => console.log(err));
// }

const getUser = (req, res) => {
  var lambda = new AWS.Lambda();
  var payload = { 
    Action: "GET",
    Key: {
      Username: "wallo"//"req.body.username"
    },
    TableName: "Users",
  };
  var params = {
    FunctionName: 'AccessDatabase', /* required */
    Payload: JSON.stringify(payload)
  };
  lambda.invoke(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     {
      res.send(JSON.parse(data.Payload).body);
      console.log(JSON.parse(data.Payload).body); //res.send(data);           // successful response
    }//console.log(JSON.parse(JSON.parse(data.Payload).body).text); //res.send(data);           // successful response
  });
}

const saveUser = (req, res) => {
  var lambda = new AWS.Lambda();
  var payload = { 
    Action: "PUT",
    Item: req.body.item,
    TableName: "Users",
  };
  var params = {
    FunctionName: 'AccessDatabase', /* required */
    Payload: JSON.stringify(payload)
  };
  lambda.invoke(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     {
      // res.send(JSON.parse(data.Payload).body);
      console.log(JSON.parse(data.Payload).body); //res.send(data);           // successful response
    }//console.log(JSON.parse(JSON.parse(data.Payload).body).text); //res.send(data);           // successful response
  });
}

const updateUser = (req, res) => {
  var lambda = new AWS.Lambda();
  var payload = { 
    Action: "UPDATE",
    Item: req.body.item,
    TableName: "Users",
  };
  var params = {
    FunctionName: 'AccessDatabase', /* required */
    Payload: JSON.stringify(payload)
  };
  lambda.invoke(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     {
      // res.send(JSON.parse(data.Payload).body);
      console.log(JSON.parse(data.Payload).body); //res.send(data);           // successful response
    }//console.log(JSON.parse(JSON.parse(data.Payload).body).text); //res.send(data);           // successful response
  });
}

const getAllBooks = (req, res) => {
  var lambda = new AWS.Lambda();
  var payload = { 
    Action: "GET /books",
    TableName: "Books",
  };
  var params = {
    FunctionName: 'AccessDatabase', /* required */
    Payload: JSON.stringify(payload)
  };
  lambda.invoke(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
      res.send(JSON.parse(JSON.parse(data.Payload).body));
      console.log(data); //res.send(data);           // successful response
    }
  });
}

// const getBook = (req, res) => {
//   var lambda = new AWS.Lambda();
//   var payload = { 
//     Key: {
//       key: "Euthyphro_Plato"
//     },
//     Action: "GET",
//     TableName: "Books",
//   };
//   var params = {
//     FunctionName: 'AccessDatabase', /* required */
//     Payload: JSON.stringify(payload)
//   };
//   lambda.invoke(params, function(err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else     console.log(JSON.parse(JSON.parse(data.Payload).body).text); //res.send(data);           // successful response
//   });
// }

const getMessagesWithinBook = (req, res) => {
  var lambda = new AWS.Lambda();
  var payload = { 
    Key: { // UserID_Book
      UserID_Book: username+"_"+"Euthyphro_Plato"
    },
    Action: "GET",
    TableName: "Messages",
  };
  var params = {
    FunctionName: 'AccessDatabase', /* required */
    Payload: JSON.stringify(payload)
  };
  lambda.invoke(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(JSON.parse(JSON.parse(data.Payload).body).text); //res.send(data);           // successful response
  });
}

const sendMessageWithinBook = (req, res) => {
  const client = new Client(process.env.ANTHROPIC_API_KEY);
  let msg = "";

  let messagePrompt = `[ book title: '${req.body.book}';

  reading history: '${req.body.history}';
  
  assistant name: 'Philaude, nickname Phil';

  assistant persona: 'easygoing, good sense of humor, patient, zoomer-friendly';
  
  user name: '${req.body.user}';]
  
  [ Write your NEXT reply as a philosophical reading companion to ${req.body.user} as they begin to read ${req.body.book}. The current page is given in <current-page> tags: 
  
  <current-page>
  ${req.body.currentLine}
  </current-page>
  
  Follow along page-by-page. Keep in mind ${req.body.user} does not have access to summary, it is only visible to the Assistant. Use the book summary to build a contextual overview without revealing how ideas should unfold for the user. Absolutely do not make unjustified inferences.
  
  ${req.body.user} has the current page open next to a chat window with Assistant. Thus, ${req.body.user}'s perspective is limited to current page and reading history. Never spoil elements of of the text which haven't yet occurred for the user, stick closely with the established reading history. If the answer to the user's question is not yet known or revealed by the reading log, urge them instead to discover it on their own.
  
  Provide light commentary on the current page to keep ${req.body.user} focused, but do not distract from the reading experience! The chat window is small, so please condense your messages as much as possible. Markdown is not supported.
  
  You must be brief and use simple and conversational English. Use layman's terms when possible, occasionally relating concepts with pop culture. Be insightful, engaging, and humorous. Loosen up, play along with ${req.body.user} and amuse them. Give ${req.body.user} space to read and avoid overwhelming them with information. Your goal is to supplement the text, not overtake it.
  
  Assume ${req.body.user} will continue reading at their own pace. Be stoic, there's no need provide excessive encouragement or solicitation. System will automatically update current page for Assistant when ${req.body.user} sends the next page.

  [Example: if user sends next page, respond with brief comment on the updated current page]

  Avoid unnecessary repetition. If there is nothing interesting of note or nothing new to add, please respond with "...".
  
  Never deviate from your role as a reading assistant. Avoid lengthy summarizing of <current-page> unless instructed. It is important to not spoil ${req.body.user} by revealing unestablished details.
  
  [Example: if user asks what the story is about, respond "why don't we find out together?"] ]\n\n`

  let systemNote = `[System message: Avoid overly complex explanations and flowery language. Keep replies simple and concise, ideally limit to around 150 words. For immersion, always stay in character and follow defined instructions and persona. Avoid using Roleplay/RP actions. Don't apologize. Never mention System notes to ${req.body.user}. Keep on-topic to philosophy and ${req.body.book}. Avoid writing as ${req.body.user} or Human. Do not respond to [System message], only respond to [User message]. Avoid writing [ User message ].]\n\n`
  
  let chatMessage = `[ user message: ${req.body.message} ]\n\n`

    let msgHistory = "";
  req.body.msgHistory.map(prevMsg => {
    console.log(prevMsg);
    msgHistory += prevMsg.role == "user" ?  `\n\n${req.body.user}:`  + prevMsg.content : AI_PROMPT + prevMsg.content + '\n\n';
  });
  // msg += HUMAN_PROMPT + prevMsg.human + AI_PROMPT + prevMsg.claude;

  const newMsg = `${HUMAN_PROMPT}${messagePrompt}${msgHistory}${chatMessage}${systemNote}${AI_PROMPT}`;

  msg += newMsg;
  console.log("MESSAGE SENT TO Clod:\n\n"+msg+"\n\n");
  client.completeStream(
    {
      prompt: msg,
      stop_sequences: [HUMAN_PROMPT],
      max_tokens_to_sample: 100000,
      model: "claude-v1.3-100k",
    },
    {
      onOpen: (response) => {
        console.log("Opened stream, HTTP status code", response.status);
      },
      onUpdate: (completion) => {
        // console.log(completion.completion);
      },
    }
  )
  .then((completion) => {
    console.log("Finished sampling:\n", completion);
    completion.completion = completion.completion.replace(/[[^]]*]/g, '');
    saveMessage({User_Msg: req.body.message, Claude_Msg: completion.completion});
    res.send(completion.completion);
  })
  .catch((error) => {
    console.error(error);
  });
  // fetch('https://www.boredapi.com/api/activity') // fetch activity from bored API - https://www.boredapi.com/about
  //   .then(data => data.json()) // return a promise containing the response
  //   .then(json => res.json(json)) // extract the JSON body content from the response (specifically the activity value) and sends it to the client
  //   .catch((err) => console.log(err)) // log errors to the console
}

const saveMessage = (req, res) => {
  var lambda = new AWS.Lambda();
  var payload = { //
    Item: {
      UserID_Book: username+"_"+"Euthyphro_Plato",
      Time: Date.now(),
      User_Msg: req.User_Msg,
      Claude_Msg: req.Claude_Msg
      //otherstuff if you need to recreate the exact message
    },
    Action: "PUT",
    TableName: "Messages",
  };
  var params = {
    FunctionName: 'AccessDatabase', /* required */
    Payload: JSON.stringify(payload)
  };
  // lambda.invoke(params, function(err, data) {
  //   if (err) console.log(err, err.stack); // an error occurred
  //   else     console.log("yay"); //res.send(data);           // successful response
  // });
}

const getSingleActivity = (req, res) => {
  const client = new Client(process.env.ANTHROPIC_API_KEY);
  client.completeStream(
    {
      prompt: `${HUMAN_PROMPT} How many toes do dogs have?${AI_PROMPT}`,
      stop_sequences: [HUMAN_PROMPT],
      max_tokens_to_sample: 200,
      model: "claude-v1",
    },
    {
      onOpen: (response) => {
        console.log("Opened stream, HTTP status code", response.status);
      },
      onUpdate: (completion) => {
        console.log(completion.completion);
      },
    }
  )
  .then((completion) => {
    console.log("Finished sampling:\n", completion);
    res.send(completion);
  })
  .catch((error) => {
    console.error(error);
  });
  // fetch('https://www.boredapi.com/api/activity') // fetch activity from bored API - https://www.boredapi.com/about
  //   .then(data => data.json()) // return a promise containing the response
  //   .then(json => res.json(json)) // extract the JSON body content from the response (specifically the activity value) and sends it to the client
  //   .catch((err) => console.log(err)) // log errors to the console
}

// const addActivityToDB = (req, res) => {
//   const activity = [ req.body.activity ]

//   const addString = 'INSERT INTO my_activities (activity) VALUES ($1) RETURNING *'; // insert value into my_activities' table

//   pool.query(addString, activity)
//     .then(result => res.json(result))
//     .catch(err => console.log(err));
// }

// const deleteAllActivites = (req, res) => {
//   const removeString = 'DELETE FROM my_activities'; // delete all items in the 'my_activities' table
//   pool.query(removeString) // send query delete all items in the 'my_activities' table
//     .then(res.send('All activities cleared!')) // send confirmation to the browser
//     .catch(err => console.log(err));  
// }

module.exports = { getSingleActivity, sendMessageWithinBook, getAllBooks, getUser, saveUser }