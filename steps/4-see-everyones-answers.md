# 4. See everyone's answers

Your answers are in the database now. So is everyone else's who has
submitted. Let's get them all back.

Put this **inside** your Submit listener, right after the
`console.log("Saved!", answers);` line:

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

Submit again. You should see your answers — and everyone else's.

Get a friend to submit. Then submit again yourself. Their answers just came
back to *your* page, from *their* computer.

## What just happened?

- **`collection(...)`** is a reference to a whole collection, not one
  document.
- **`getDocs`** (with an **s**) gets every document in it.
- The snapshot has a **`.docs`** array. Each one has a `.data()` — the same
  pattern as Step 1, done once per person.

Why did we put this *inside* the Submit listener? What does that mean about
when you're allowed to see everyone else's answers?

## Why `textContent` here, but `innerHTML` in Step 2?

The questions in Step 2 were written by your teacher. These answers were
written by **anyone in the class**. And `innerHTML` doesn't just show text
— it turns text into real HTML that runs on the page.

See for yourself:

1. Change `row.textContent` to `row.innerHTML`.
2. Submit this as one of your answers:
   ```
   <img src="x" onerror="alert('gotcha')">
   ```
3. Your page just ran code that came out of the database. So would the page
   of anyone else in the class who used `innerHTML` — and that code could
   do a lot worse than an alert.
4. **Change it back to `textContent`**, and submit a normal answer to
   replace your prank.

`textContent` shows the text exactly as it was typed, and never runs it.
Any time you show something a *person* typed, use `textContent`.

**Next:** [Step 5: The rules of the road](5-rules-of-the-road.md)
