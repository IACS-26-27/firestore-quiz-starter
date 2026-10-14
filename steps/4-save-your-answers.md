# 4. Save your answers

You already have a Submit button from Step 2 (`#quiz-submit`). Set up a listener to run when someone clicks it:

```js
const submitButton = document.querySelector("#quiz-submit");
submitButton.addEventListener("click", async () => {
  const answers = [];
  for (const input of document.querySelectorAll("#quiz-questions input")) {
    answers.push(input.value);
  }
  console.log(answers);
  // More code coming soon...
});
```
Go ahead and run the code at this point to make sure you can successfully collect answers!

## Next Step: Send them to the Database!

In Step 1 you made a reference to the quiz:

```js
doc(db, "quizzes/quiz-1")
```

We're going to save *answers* from each user in a `responses` collection inside the quiz, with one document per user, like this:

`quizzes/quiz-1/responses/<user's ID>`

You can *build* the path from the `user` you saved in Step 3 like this:

```js
const myResponseRef = doc(db, `quizzes/quiz-1/responses/${user.uid}`);
```

Your **answer** is going to be a *document* like everything in a **firestore** database. Our document will have this structure:

```js
{
  name : "The Display Name for the User",
  answers : [
    ...a list of answers
  ]
}
```

So let's build the answer like this:

```js
let myResponse = {
  name : user.displayName,
  answers : answers
};
```

Then, finally, we can *save* the answers using the function `setDoc` which we imported from firebase at the top:

```js
await setDoc(myResponseRef, myResponse);
console.log("Saved!");
```

`setDoc` writes an object to an address. If nothing's there, it creates
a new document. If something's already there, it replaces it.

Fill in the boxes, click Submit, and look for `Saved!`.

## Seeing red?

| Error says | Usually means |
|---|---|
| `Cannot read properties of undefined (reading 'uid')` | You're not signed in, or the page reloaded since you did. Click Sign in. |
| `Missing or insufficient permissions` | Your address is wrong. Did you use backticks (`` ` ``), not quotes, so `${user.uid}` actually becomes your uid? `console.log` the address and check. Or: you signed in with a personal account instead of your school one. |
| `ReferenceError: ___ is not defined` | A typo, or a name that doesn't exist where you used it. |
| `invalid-argument` | Your path has the wrong number of pieces. A document path always has an even number: collection, doc, collection, doc. |
| `Cross-Origin-Opener-Policy policy would block...` | Not you. That's Google's sign-in popup (`popup.ts`). Ignore it. |

(We'll get to where "permissions" come from in Step 6.)

## Why your ID and not your name?

Names make bad IDs: two people can have the same name, and names can
change. Your ID can't. So the ID decides *which document is yours*, and the
name is just there for showing.

Next up: [Step 5: See everyone's answers](5-see-everyones-answers.md)
