# 6. The rules of the road

Everyone in the class can write to this database. So what stops you from
changing someone else's answers? Or the quiz itself?

The answer is *security rules*. The database has a short list of rules
saying who can do what, and every time anyone reads or writes anything,
Google's servers check the rules first.

## Our rules, in plain English

| What | Read it? | Write it? |
|---|---|---|
| A quiz | Anyone | Only the person who made it |
| A brand-new quiz | — | Anyone with a school account |
| Your response | Anyone | **Only you**, with a school account |
| Someone else's response | Anyone | Only them |
| Delete any response | — | Nobody |

I made quiz-1 by hand, so it has no author, which means nobody can change
it from a web page.

Also, things have to *look* right: a response's `answers` must be a list,
and if you include a `name`, it has to be your real one.

The real rules are in [`firestore.rules`](../firestore.rules). See if you
can match each line to a row in the table.

## Try to break them

The rules run on Google's servers, not in your page, so nothing you change
in `app.js` gets around them. Don't take my word for it -- prove it.

Add this inside your sign-in listener, right after the
`console.log("Signed in as"...)` line, so it runs once you're signed in:

```js
try {
  // your hack goes here
  console.log("It worked?!");
} catch (error) {
  console.log("Blocked:", error.code);
}
```

`try`/`catch` lets your code keep running when something fails, and
`error.code` tells you *why* it failed.

Try these hacks *one at a time*. Each one needs an `await setDoc(...)`
line, and you write the reference:

1. Write `{ answers: ["hacked"] }` to `quizzes/quiz-1/responses/someone-else`.
2. Write `{ title: "hacked" }` to the quiz itself.
3. Write `{ answers: "hacked" }` (a string, not a list) to *your own*
   response. (In here, your uid is `result.user.uid`.)
4. Write `{ answers: ["hi"], name: "Your Teacher" }` to your own response.

Each one should print `Blocked: permission-denied`. If you get anything
else, that means your code has a mistake, not that the rules stopped you
(see the [error table in Step 4](4-save-your-answers.md#seeing-red)).

Delete your hack code when you're done.

## Check yourself

- Hack #3 was *your own* document. Why did it get blocked anyway?
- Why can you read everyone's answers, but only write your own?
- Our rules let anyone read every response. Can you think of an app where
  you *wouldn't* want that?

## If you finish

- Highlight your own row. (Hint: `responseDoc.id` is the document's ID.
  What should it match?)
- Add a "Refresh" button that reloads everyone's answers without
  resubmitting. (Hint: move your Step 5 code into its own `async`
  function, so both buttons can call it.)
- Show which question each answer goes with, maybe as a `<table>`.
- Make your own quiz. Write a document to `quizzes/<an ID you pick>` with a
  `title`, a list of `questions` (each one `{ text: "..." }`), and
  `author: auth.currentUser.uid`. Then point your page at it. How many
  places did you have to change `quiz-1`? Could a variable help?
- Can a friend take your quiz? Can they change it?
- Now go back and look at Step 2. You used `innerHTML` to show the
  questions because I wrote them. Is that still safe?
