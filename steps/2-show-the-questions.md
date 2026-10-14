# 2. Show the questions on the page

Right now the quiz only shows up in the console. Let's put it on the page.

## Make a spot for it

Your page is empty. In [`index.html`](../index.html), add an element with
the id `quiz` where you want the questions to go (a `<div>` is fine). Then,
in `app.js`, grab it with `querySelector` and call it `quizDiv`.

## Fill it in

For *each* question in `quiz.questions`, add this HTML to `quizDiv`:

```js
`<p>
  <label>
    ${question.text}
    <input type="text">
  </label>
</p>`
```

You'll need a loop. You've used `for...of` and `innerHTML +=` before.

After the loop, add a Submit button the same way:

```js
quizDiv.innerHTML += `<button id="submit">Submit</button>`;
```

Save. You should see a text box for every question.

<details>
<summary>Stuck? Peek at one way to write it</summary>

In `index.html`:

```html
<div id="quiz"></div>
```

In `app.js`:

```js
const quizDiv = document.querySelector("#quiz");
for (const question of quiz.questions) {
  quizDiv.innerHTML += `
    <p>
      <label>
        ${question.text}
        <input type="text">
      </label>
    </p>
  `;
}
```

</details>

## Notice anything?

None of the questions are written in your code. They come from the
database. If I change a question or add a fifth one, your page will show
it without you changing a thing.

Next up: [Step 3: Sign in](3-sign-in.md)
