# 2. Show the questions on the page

Right now the quiz only shows up in the console. Let's put it on the page.

For *each* question in `quiz.questions`, add this HTML to `quizSection`:

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
quizSection.innerHTML += `<button id="submit">Submit</button>`;
```

Save and sign in. You should see a text box for every question.

<details>
<summary>Stuck? Peek at one way to write the loop</summary>

```js
for (const question of quiz.questions) {
  quizSection.innerHTML += `
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

Next up: [Step 3: Save your answers](3-save-your-answers.md)
