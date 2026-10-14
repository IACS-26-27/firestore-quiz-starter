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

Add this inside your Submit listener, right after `console.log("Saved!")`:

```js
try {
  await setDoc(doc(db, "quizzes/quiz-1/responses/someone-else"), { answers: ["hacked"] });
  console.log("It worked?!");
} catch (error) {
  console.log("Blocked:", error.code, error.message);
}
```

`try`/`catch` lets your code keep running when something fails, and
`error.code` tells you *why* it failed. Click Submit. You should see
`Blocked: permission-denied`. That's hack #1: writing someone else's
response.

Now swap in these hacks, *one at a time*. You write the `setDoc` line:

2. Write `{ title: "hacked" }` to the quiz itself.
3. Write `{ answers: "hacked" }` (a string, not a list) to *your own*
   response.
4. Write `{ answers: ["hi"], name: "Your Teacher" }` to your own response.

Each one should say `permission-denied`. If it says anything else, read the
message: that's a mistake in your code, not the rules (see the
[error table in Step 4](4-save-your-answers.md#seeing-red)).

One sneaky thing: if your address for #3 or #4 is wrong, you'll *also* get
`permission-denied`, because you're writing to a document that isn't yours.
`console.log` the address to make sure it really ends in your uid.

Delete your hack code when you're done.

## Check yourself

- Hack #3 was *your own* document. Why did it get blocked anyway?
- Why can you read everyone's answers, but only write your own?
- Our rules let anyone read every response. Can you think of an app where
  you *wouldn't* want that?

## If you finish

- Make the sign-in button stay hidden after a reload if you're already
  signed in. (Hint: `await auth.authStateReady()` waits until Firebase
  remembers who you are. After that, check `auth.currentUser`.)
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
