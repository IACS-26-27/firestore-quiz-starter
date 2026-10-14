# 4. Save your answers

Your Step 2 code runs once, when the page loads. Saving is different: it
has to wait until someone clicks "Submit". So we need code that runs
*later*, which means another event listener, just like the sign-in button.

Add this to the bottom of `app.js`:

```js
const submitButton = document.querySelector("#submit");
submitButton.addEventListener("click", async () => {
  const answers = [];
  for (const input of quizDiv.querySelectorAll("input")) {
    answers.push(input.value);
  }
  console.log(answers);

  // Your Step 4 code goes here.
});
```

Click Submit and check that your answers show up in the console as an
array. Once that works, save them to the database.

## Who are you?

Inside your listener, find out who's signed in:

```js
const user = auth.currentUser;
console.log(user.uid);
```

`user.uid` is your account's ID: a long random string that's the same every
time you sign in. (If you get an error about reading `uid` of `null`,
you're not signed in. Go back to Step 3.)

## Write the address

In Step 1 you made a reference to the quiz:

```js
doc(db, "quizzes/quiz-1")
```

Your answers go one level deeper: in the quiz's `responses` collection, in
a document whose ID is your `user.uid`. Make a reference called
`myResponseRef` for that address. (Look back at the path in
[Step 0](0-documents-and-collections.md) if you're not sure, and remember
you can drop a variable into a string with `${}`.)

## Save it

Then write your answers there, along with your name:

```js
await setDoc(myResponseRef, { answers: answers, name: user.displayName });
console.log("Saved!");
```

`setDoc` writes an object to an address. If nothing's there, it creates
a new document. If something's already there, it replaces it.

Fill in the boxes, click Submit, and look for `Saved!`.

<details>
<summary>Stuck on the reference?</summary>

```js
const myResponseRef = doc(db, `quizzes/quiz-1/responses/${user.uid}`);
```

</details>

## Seeing red?

| Error says | Usually means |
|---|---|
| `Cannot read properties of null (reading 'uid')` | You're not signed in. |
| `Missing or insufficient permissions` | Your address is wrong (check every piece of the path), or you signed in with a personal account instead of your school one. |
| `ReferenceError: ___ is not defined` | A typo, or a name that doesn't exist where you used it. |
| `invalid-argument` | Your path has the wrong number of pieces. A document path always has an even number: collection, doc, collection, doc. |
| `Cross-Origin-Opener-Policy policy would block...` | Not you. That's Google's sign-in popup (`popup.ts`). Ignore it. |

(We'll get to where "permissions" come from in Step 6.)

## Why your ID and not your name?

Names make bad IDs: two people can have the same name, and names can
change. Your ID can't. So the ID decides *which document is yours*, and the
name is just there for showing.

Next up: [Step 5: See everyone's answers](5-see-everyones-answers.md)
