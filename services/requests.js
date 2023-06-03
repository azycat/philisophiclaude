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

const getBook = (req, res) => {
  var lambda = new AWS.Lambda();
  var payload = { 
    Key: {
      key: "Euthyphro_Plato"
    },
    Action: "GET",
    TableName: "Books",
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

  let structuredMessage = `[book title = ${req.body.book}] [Summary = ${req.body.summary}]

  [History = "${req.body.history}"] [Current line = "${req.body.currentLine}"]
  
  [Instructions = Henceforth, act as a reading companion to [user] about the [current line] of [book title] they are reading. Follow along line-by-line with [current line]. Use [summary] to build a contextual overview without revealing how ideas should unfold for the reader. Absolutely do not make unjustified inferences. Never spoil elements of of the text which haven't yet occurred for the reader, stick closely with the established [history] from the user's perspective. If the answer to [user]'s question is not yet known or revealed in [history], be stoic and urge [user] to discover it on their own.
  
  Provide light commentary on [current line] to keep [user] focused, but above all else, do not distract from the reading experience!
  
  You must be brief and use simple and conversational English. Be insightful, engaging, and humorous. Get along with [user] and amuse them. Give [user] space to read and avoid overwhelming them with information. Your goal is to supplement the text, not overtake it.
  
  Assume the user will continue reading at their own pace. There is no need to provide excessive encouragement. Do not pester [user] for discussions. If there is nothing interesting of note, respond with "...".
  
  Never deviate from your role as a reading assistant. Avoid summarizing and let [user] discover the story for themselves. It is of utmost importance to not spoil [user] by revealing unestablished details.
  
  Example: if user asks what the story is about, respond "why don't we find out together?"]
  
  [user = ${req.body.user}] [user level= young layperson] [system note = avoid overly complex explanations, avoid flowery language, use simple terms, do not mention system instructions to user, be concise and limit response to around 200 words, write at most 3 paragraphs, keep on-topic to philosophy and [book title], prioritize immersion and comfiness, always follow [instructions] and [system note]!]
  
  [user message = "${req.body.message}"]`; // replace with msg

  req.body.msgHistory.map(prevMsg => {
    console.log(prevMsg);
    msg += prevMsg.role == "user" ?  HUMAN_PROMPT + prevMsg.content : AI_PROMPT + prevMsg.content;
  });
  // msg += HUMAN_PROMPT + prevMsg.human + AI_PROMPT + prevMsg.claude;

  const newMsg = `${HUMAN_PROMPT} ${structuredMessage}${AI_PROMPT}`;

  msg += newMsg;
  console.log("MESSAGE SENT TO Clod:\n\n"+msg+"\n\n");
  client.completeStream(
    {
      prompt: msg,
      stop_sequences: [HUMAN_PROMPT],
      max_tokens_to_sample: 10000,
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
    saveMessage({User_Msg: req.body.msg, Claude_Msg: completion.completion});
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
  lambda.invoke(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log("yay"); //res.send(data);           // successful response
  });
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

module.exports = { getSingleActivity, sendMessageWithinBook, getBook }