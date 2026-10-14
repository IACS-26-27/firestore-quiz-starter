# 5. See everyone's answers

Your answers are in the database now, along with everyone else's who has
submitted. Let's get them all back.

Put this *inside* your Submit listener, after `console.log("Saved!")`:

```js
const responsesRef = collection(db, "quizzes/quiz-1/responses");
const responsesSnapshot = await getDocs(responsesRef);

for (const responseDoc of responsesSnapshot.docs) {
  const response = responseDoc.data();
  console.log(response);
}
```

Submit, and look in the console. You should see one object per person.

- `collection(...)` is a reference to a whole collection instead of one
  document.
- `getDocs` (with an *s*) gets every document in it.
- The snapshot has a `.docs` array, and each item in it has a `.data()`.
  It's the same pattern as Step 1, just once per person.

## Put them on the page

Add another element to `index.html` for the results, with the id
`results`, and grab it in `app.js` as `resultsDiv`.

Now show each response in `resultsDiv` instead of the console: the
person's name and their answers. (Hint: `response.answers.join(", ")`
turns the array into one string.) Write it the same way you did in Step 2.
And clear out `resultsDiv` before the loop, or every Submit will add
another copy of everything.

<details>
<summary>Stuck? Peek at one way to write it</summary>

Before the loop:

```js
resultsDiv.innerHTML = "";
```

Inside the loop, in place of `console.log(response)`:

```js
resultsDiv.innerHTML += `<p>${response.name}: ${response.answers.join(", ")}</p>`;
```

</details>

Then:

1. Get a friend to submit.
2. Click Submit again yourself.

Their answers just showed up on *your* page, and they typed them on
*their* computer. That's what a database is for.

(Your page only gets fresh results when you click Submit. If you see
`undefined` for a name, that response was saved before names were added.)

## Uh oh, you just made a security hole

Your loop uses `innerHTML` to show what *other people typed*. But
`innerHTML` doesn't just show text. It turns text into real HTML, and
runs it.

One person (ask me who) submits this as an answer:

```
<img src="x" onerror="alert('gotcha')">
```

Now everyone clicks Submit. Your page just ran code that came out of the
database. A real attacker wouldn't use an alert.

(Why not just a `<script>` tag? Browsers skip scripts added with
`innerHTML`, but they don't skip `onerror`. Attackers know that.)

The fix is to build each row with `textContent`, which shows text exactly
as typed and never runs it:

```js
const row = document.createElement("p");
row.textContent = `${response.name}: ${response.answers.join(", ")}`;
resultsDiv.appendChild(row);
```

`createElement` makes a new element without putting it on the page yet,
and `appendChild` puts it on the page. Fix your loop, then have the
prankster submit a normal answer.

Rule of thumb: if a *person* typed it, show it with `textContent`. (Step 2
used `innerHTML` because I wrote the questions. Hang on to that thought
until Step 6.)

## Extras: show them off

A plain list works, but you can do a lot better. Some ideas:

- One card per person, laid out in a grid (`display: grid` with
  `grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr))`).
- A circle with each person's initials as a little avatar.
- Show favorite colors as actual colors: `row.style.backgroundColor =
  response.answers[0]`. (If someone types something that isn't a color,
  the browser just ignores it.)
- Group answers by *question* instead of by person: everyone's favorite
  number together, everyone's song together.
- Make new results fade in with a CSS `animation`.

Whatever you build, keep using `textContent` for anything a person typed.

## Check yourself

- Change one answer and submit again. Did you add a second row, or replace
  your first one? Why?
- Your page only shows results *after* you submit. Does that stop someone
  from seeing everyone's answers without submitting? (Hint: no. That's your
  page's choice, not a rule. Step 6 is about the actual rules.)

Next up: [Step 6: The rules of the road](6-rules-of-the-road.md)
