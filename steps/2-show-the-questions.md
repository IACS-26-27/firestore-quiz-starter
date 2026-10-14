# 2. Show the questions on the page

Right now the quiz only shows up in the console. Put it on the page.

For **each** question in `quiz.questions`, add this HTML to `quizSection`:

```js
`<label>
  ${question.text}
  <input type="text">
</label>`
```

You'll need a loop. You've used `for...of` and `innerHTML +=` before.

After the loop, add a Submit button the same way:

```js
quizSection.innerHTML += `<button id="submit">Submit</button>`;
```

Save and sign in. You should see a text box for every question.

<details>
<summary>Stuck? Peek at one way to write the loop</summary>

```js
for (const question of quiz.questions) {
  quizSection.innerHTML += `
    <label>
      ${question.text}
      <input type="text">
    </label>
  `;
}
```

</details>

## Notice

**None of the questions are written in your code.** They come from the
database. If your teacher changes a question or adds a fifth one, your page
shows it — and you don't change a thing.

**Next:** [Step 3: Save your answers](3-save-your-answers.md)
