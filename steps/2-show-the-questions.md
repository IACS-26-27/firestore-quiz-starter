# 2. Show the questions on the page

Right now the quiz only shows up in the console. Let's put it on the page.

## Make a spot for it

Your page is empty. In [`index.html`](../index.html), we'll want to add placeholders where we'll fill in the quiz
data with the quiz from our database. Now that we know the *shape* of a quiz item we can make a good guess about what the display should look like: include a place for the title and a place for questions. Here's one way to do it (you can change this markup):

```html
<section id="quiz">
  <h1 id="quiz-title">
    <!-- Title will go here -->
  </h1>
  <div id="quiz-questions">
    <!-- questions will go here -->
  </div>
  <button id="quiz-submit">
    Send those Answers to the Database, Baby!
  </button>
</section>
```

## Fill it in

Let's start by filling in the title and making sure it works. You can write some JavaScript like this:

```js
const titleElement = document.querySelector('#quiz-title');
titleElement.innerHTML = quiz.title;
```

## Next, fill in the questions...
Your questions will be trickier because we have an **array** of questions, which means there are *many* questions. The server could provide us more or less, so we have to *build the question list* as we go.

Here's what the code might look like (you can change this as needed):

```js
let questionsDiv = document.querySelector('#quiz-questions');
// Add each question
for (const q of quiz.questions) {
  questionsDiv.innerHTML += `
    <label>
      ${q.text}: 
      <input type="text">
    </label>
  `;
}
```

You should see a box for each question. You might want to add some styles to make this look nice in `style.css` or you might want to add more mark-up (for example, you could put each question inside a list item or lay them out in a table).

## Extras: make it look like *yours*

There's an empty [`style.css`](../style.css) waiting for you. Some places
to start:

- `label { display: block; }` puts each question on its own line.
- Grab a font from [Google Fonts](https://fonts.google.com) (paste their
  `<link>` into your `<head>`, then use it in `font-family`).
- Make each question a little "card": `background`, `padding`,
  `border-radius`, and a soft `box-shadow`.
- Make the inputs feel nice to type in: bigger `font-size`, some `padding`,
  and an `input:focus` style so you can see which box you're in.
- Give the Submit button a `:hover` style. It should look worth clicking.
- Pick a color scheme and put it in variables
  (`:root { --accent: tomato; }`, then `color: var(--accent)`), so you can
  change your whole look in one place.

## Notice anything?

None of the questions are written in your code. They come from the
database. If I change a question or add a fifth one, your page will show
it without you changing a thing.

In fact, let's prove this out. I actually have a *second quiz* in the database. If you change the address of your quiz from `quiz-1` to `quiz-2` you should see the title and the questions on the page change! Now we're cooking!

Next up: [Step 3: Sign in](3-sign-in.md)
