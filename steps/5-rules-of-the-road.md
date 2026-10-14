# 5. The rules of the road

Here's a question you might have had in Step 3: if anyone in the class can
write to the database, what stops you from changing *someone else's*
answers?

The answer is **security rules**. The database has a short list of rules
that say who's allowed to do what. Every time anyone reads or writes
anything, Google's servers check the rules first.

## Our rules, in plain English

| What | Read it? | Write it? |
|---|---|---|
| The quiz (`quizzes/quiz-1`) | Anyone | Nobody (from a web page) |
| Your response (`.../responses/<your ID>`) | Anyone | **Only you**, signed in with a school account |
| Someone else's response | Anyone | Nobody but them |
| Delete any response | — | Nobody |

The real rules are in [`firestore.rules`](../firestore.rules). See if you
can match each line in that file to a row in this table.

## The rules don't live in your page

The rules run on Google's servers, not in your JavaScript. So nothing you
change in `app.js` can get around them. Prove it.

Inside your Submit listener, add this:

```js
const notMineRef = doc(db, "quizzes", quizId, "responses", "someone-else");
await setDoc(notMineRef, { answers: ["hacked"] });
```

Click Submit. Look in the console. You should see an error with
**`permission-denied`** in it. That's the server saying no.

Now try one more: write to the quiz itself.

```js
await setDoc(quizRef, { title: "hacked" });
```

Same error? Good. **Delete both** of those when you're done.

## Check yourself

- Why can you read everyone's answers, but only write your own?
- Our rules let anyone read every response. That's what makes Step 4
  work. Can you think of an app where you *wouldn't* want that?

## If you finish

- Show which question each answer goes with — maybe as a `<table>`.
- Your teacher can make a `quiz-2`. Change `quizId` in `app.js` and see what
  happens.
