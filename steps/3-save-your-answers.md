# 3. Save your answers

Everything so far runs once, right after you sign in. But saving your
answers has to wait until someone clicks **Submit**. So we need code that
runs *later* — another event listener, just like the sign-in button.

Add this below your Step 2 code:

```js
const submitButton = document.querySelector("#submit");
submitButton.addEventListener("click", async () => {
  const answers = [];
  for (const input of quizSection.querySelectorAll("input")) {
    answers.push(input.value);
  }

  const myResponseRef = doc(db, "quizzes", quizId, "responses", user.uid);
  await setDoc(myResponseRef, { answers: answers });
  console.log("Saved!", answers);
});
```

Fill in the boxes, click Submit, and look for `Saved!` in the console.

## What just happened?

You made a reference again, like in Step 1 — but this time to an address
that doesn't exist yet:

```
quizzes/quiz-1/responses/<your ID>
```

**`setDoc`** writes an object to that address. If nothing's there, it
creates a new document. If you already saved once, it replaces your old
one.

**`user.uid`** is your account's ID — a long random string that stays the
same every time you sign in. Using it as the document ID means everyone
gets exactly one response document.

## Check yourself

Change an answer and submit again. Did you make a second response, or
replace your first one? How do you know?

**Next:** [Step 4: See everyone's answers](4-see-everyones-answers.md)
