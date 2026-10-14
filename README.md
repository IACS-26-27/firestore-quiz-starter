# Get to Know the Class

In the weather project, you used `fetch` to **read** data from someone else's
server. This time you'll read **and write** data, in a database your whole
group shares. Everyone's answers end up in the same place, and everyone's
page can show them.

Your teacher has already set up the database. It's called **Firestore**, and
it's made by Google. You don't need to set anything up — open
[`app.js`](app.js) and start at Step 1.

## How Firestore organizes data

Firestore stores **documents**. A document is basically a JavaScript object,
like `{ title: "Get to Know the Class", questions: [...] }`.

Documents live in **collections**, the way files live in folders. Every
document has an ID, so you find one with a path like a folder path:

```
quizzes/quiz-1                 ← the quiz-1 document, in the quizzes collection
quizzes/quiz-1/responses/abc   ← one person's answers to quiz-1
```

## Before you start

- Start Live Server, same as always, and open the page.
- Open dev tools (right-click → Inspect) and click the **Console** tab.
- Click **Sign in with Google** and use your school account. You should see
  `Signed in as ...` in the console.

All your code goes inside the function in `app.js`, below the line that says
`Your code goes below this line`. That function runs after you sign in.
You'll keep adding to the same function for every step.

## Step 1: Get the quiz from the database

Add this:

```js
const quizRef = doc(db, "quizzes", quizId);
const quizSnapshot = await getDoc(quizRef);
const quiz = quizSnapshot.data();
console.log(quiz);
```

Reload, sign in, and look at your console.

**What just happened?** Getting a document takes three lines because
there are three separate things going on:

1. **`doc(...)` makes a reference** — the address of a document, like writing
   an address on an envelope. Nothing has been sent anywhere yet. It doesn't
   even check whether the document exists.
2. **`getDoc(...)` actually goes and asks** the database for whatever is at
   that address. That takes time, so we `await` it, just like `fetch` in the
   weather project.
3. What comes back is a **snapshot**: a picture of the document at the moment
   you asked. The snapshot isn't the data itself — it's a wrapper that can
   also tell you things like whether the document exists
   (`quizSnapshot.exists()`). **`.data()`** takes the actual object out.

This is a lot like the weather project: `fetch` gave you a response, and you
had to call `.json()` on it to get the data out.

**Check your understanding** — type these into the console:
- What's in `quiz.questions`?
- What's `quiz.questions[0].text`?
- How many questions are there?

(To use `quiz` in the console, add `window.quiz = quiz;` after your
`console.log`.)

## Step 2: Show the questions on the page

Add this below your Step 1 code:

```js
for (const question of quiz.questions) {
  quizSection.innerHTML += `
    <label>
      ${question.text}
      <input type="text">
    </label>
  `;
}
quizSection.innerHTML += `<button id="submit">Submit</button>`;
```

Reload and sign in. You should see a text box for every question.

Notice that **none of the questions are written in your code**. They come
from the database. If your teacher changes a question, or adds a fifth one,
your page will show it without you changing anything. That's the point of
keeping data in a database instead of in your HTML.

## Step 3: Save your answers

The code so far runs once, right after you sign in. But saving your answers
needs to wait until you click **Submit**. So we need a function that runs
*later*, when the button is clicked — another event listener. Add this:

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

**What just happened?** You made a reference again — but this time to an
address that doesn't exist yet: `quizzes/quiz-1/responses/<your ID>`.
`setDoc` writes an object to that address, creating the document if it
isn't there and replacing it if it is.

`user.uid` is your account's ID: a long random string that's the same every
time you sign in. Using it as the document ID means each person gets exactly
one response document, and submitting again just replaces yours.

Fill in the boxes, click Submit, and look for `Saved!` in the console.

## Step 4: Show everyone's answers

Put this **inside** your Submit listener, after the `console.log("Saved!"...)`
line, so the results show up after you submit:

```js
const responsesRef = collection(db, "quizzes", quizId, "responses");
const responsesSnapshot = await getDocs(responsesRef);

resultsSection.innerHTML = "";
for (const responseDoc of responsesSnapshot.docs) {
  const response = responseDoc.data();
  const row = document.createElement("p");
  row.textContent = response.answers.join(" | ");
  resultsSection.appendChild(row);
}
```

**What just happened?** `collection(...)` is a reference to a whole
collection instead of one document. `getDocs` (with an **s**) gets every
document in it. The snapshot has a `.docs` array, and each one has a
`.data()` — the same pattern as Step 1, just repeated.

Get a friend to take the quiz. Submit again, and their answers should show
up too.

### Why `textContent` here, but `innerHTML` in Step 2?

In Step 2, the questions were written by your teacher. In Step 4, the
answers were written by **anyone in the class** — and `innerHTML` doesn't
just show text, it turns text into real HTML.

Try it: change `row.textContent` to `row.innerHTML`, then submit this as one
of your answers:

```
<img src="x" onerror="alert('gotcha')">
```

Now everyone who loads the results runs your code. Change it back to
`textContent`. It shows the text exactly as typed, and doesn't run it.

## Step 5: Try to break the rules

Your teacher's database has **security rules**: a short list of what each
person is allowed to do. You can read them in
[`firestore.rules`](firestore.rules). In plain English:

- Anyone can read the quiz and everyone's answers.
- Nobody can change the quiz from a web page.
- You can write **only** the response document whose ID is your own `uid`,
  and only with a school account.

The rules run on Google's servers, not in your page — so changing your
JavaScript can't get around them. Prove it. Inside your Submit listener,
try writing to an ID that isn't yours:

```js
const notMineRef = doc(db, "quizzes", quizId, "responses", "someone-else");
await setDoc(notMineRef, { answers: ["hacked"] });
```

You should get a `permission-denied` error in the console. Delete that code
when you're done.

## If you finish

- Only show everyone's answers if you've submitted (you already did this!
  Why does putting Step 4 inside the listener do that?)
- Show which question each answer goes with, maybe as a table.
- Your teacher can make a `quiz-2`. Change `quizId` and see what happens.
