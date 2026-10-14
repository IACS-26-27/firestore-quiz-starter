# 2. Show the questions on the page

Right now the quiz only shows up in the console. Let's put it on the page.

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

Save and sign in. You should see a text box for every question.

## Notice

**None of the questions are written in your code.** They come from the
database. If your teacher changes a question or adds a fifth one, your page
shows it — and you don't change a thing.

## Try it

Ask your teacher to add a question to the quiz. Reload. Did it show up?

**Next:** [Step 3: Save your answers](3-save-your-answers.md)
