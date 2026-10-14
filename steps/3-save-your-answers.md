# 3. Save your answers

Everything so far runs once, right after you sign in. Saving is different:
it has to wait until someone clicks "Submit". So we need code that runs
*later*, which means another event listener, just like the sign-in button.

Add this below your Step 2 code:

```js
const submitButton = document.querySelector("#submit");
submitButton.addEventListener("click", async () => {
  const answers = [];
  for (const input of quizSection.querySelectorAll("input")) {
    answers.push(input.value);
  }
  console.log(answers);

  // Your Step 3 code goes here.
});
```

Click Submit and check that your answers show up in the console as an
array. Once that works, save them to the database.

## Write the address

In Step 1 you made a reference to the quiz:

```js
doc(db, "quizzes", quizId)
```

Your answers go one level deeper: in the quiz's `responses` collection, in
a document whose ID is *your account's ID*, `user.uid`. Make a reference
called `myResponseRef` for that address. (Look back at the path in
[Step 0](0-documents-and-collections.md) if you're not sure.)

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
const myResponseRef = doc(db, "quizzes", quizId, "responses", user.uid);
```

</details>

## Seeing red?

| Error says | Usually means |
|---|---|
| `Missing or insufficient permissions` | Your address is wrong (check every piece of the path), or you signed in with a personal account instead of your school one. |
| `ReferenceError: ___ is not defined` | A typo, or a name that doesn't exist where you used it. Is it `uid` or `user.uid`? |
| `invalid-argument` | Your path has the wrong number of pieces. A document path always has an even number: collection, doc, collection, doc. |

(We'll get to where "permissions" come from in Step 5.)

## Why your ID and not your name?

Try `console.log(user.uid)`. It's a long random string, and it's the same
every time you sign in. Names make bad IDs: two people can have the same
name, and names can change. Your ID can't. So the ID decides *which
document is yours*, and the name is just there for showing.

Next up: [Step 4: See everyone's answers](4-see-everyones-answers.md)
