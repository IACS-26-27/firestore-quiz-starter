# 3. Save your answers

Everything so far runs once, right after you sign in. But saving has to
wait until someone clicks **Submit**. So we need code that runs *later* —
another event listener, just like the sign-in button.

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
array. Now save them to the database.

## Write the address

In Step 1 you made a reference to the quiz:

```js
doc(db, "quizzes", quizId)
```

Your answers go one level deeper: in the quiz's `responses` collection, in
a document whose ID is **your account's ID**, `user.uid`. Make a reference
called `myResponseRef` for that address. (Look back at the path in
[Step 0](0-documents-and-collections.md) if you're not sure.)

## Save it

Then write your answers there, with your name:

```js
await setDoc(myResponseRef, { answers: answers, name: user.displayName });
console.log("Saved!");
```

**`setDoc`** writes an object to an address. If nothing's there, it creates
a new document. If something's already there, it replaces it.

Fill in the boxes, click Submit, and look for `Saved!`.

<details>
<summary>Stuck on the reference?</summary>

```js
const myResponseRef = doc(db, "quizzes", quizId, "responses", user.uid);
```

</details>

## Why your ID, not your name?

Try `console.log(user.uid)`. It's a long random string that's the same every
time you sign in. Names aren't safe as IDs: two people can have the same
name, and names can change. Your ID can't. So the ID decides *which
document is yours*, and the name is just there for showing.

**Next:** [Step 4: See everyone's answers](4-see-everyones-answers.md)
