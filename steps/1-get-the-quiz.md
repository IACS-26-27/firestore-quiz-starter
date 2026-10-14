# 1. Get the quiz from the database

Open [`app.js`](../app.js). The top part loads Firebase and sets up `db`
(the database) and `auth` (signing in, which we'll get to in Step 3). Don't
change any of that. Your code goes at the bottom, below
`Your code goes below this line`.

Add this:

```js
const quizRef = doc(db, "quizzes/quiz-1");
const quizSnapshot = await getDoc(quizRef);
const quiz = quizSnapshot.data();
console.log(quiz);
```

Save, and look at your console. Click the little arrow next to the object
to open it up.

Notice you didn't have to sign in. Anyone is allowed to *read* this quiz.
(More on who's allowed to do what in Step 6.)

## Why three lines?

Getting a document takes three lines because three separate things happen:

1. `doc(...)` makes a *reference*. A reference is just the *address* of a
   document -- `quizzes/quiz-1`, same as in Step 0 -- like writing an
   address on an envelope. Nothing gets sent yet.
2. `getDoc(...)` goes and asks the database for whatever is at that
   address. That takes time, so we `await` it (same as `fetch` in the
   weather project).
3. What comes back is a *snapshot*: a picture of the document at the
   moment you asked. `.data()` pulls the actual object out of it.

This is a lot like the weather project, where `fetch` gave you a response
and you had to call `.json()` to get the data out.

(Why bother with a snapshot? It also knows things that aren't *in* the
data. For example, if nothing's at that address, `quizSnapshot.exists()` is
`false` and `.data()` is `undefined`. Try it: change `quiz-1` to
`quiz-nope`.)

## Check yourself

Look at the object in your console and answer:

- What's in `quiz.questions`?
- How would you write the text of the *first* question in code? Try
  `console.log`-ing it to check.
- How many questions are there?

Next up: [Step 2: Show the questions](2-show-the-questions.md)
