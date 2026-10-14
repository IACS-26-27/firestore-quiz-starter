# 1. Get the quiz from the database

Open [`app.js`](../app.js). Find the line that says
`Your code goes below this line`. That's inside a function that runs right
after you sign in. All your code for every step goes there.

Add this:

```js
const quizRef = doc(db, "quizzes", quizId);
const quizSnapshot = await getDoc(quizRef);
const quiz = quizSnapshot.data();
console.log(quiz);
```

Save, sign in again, and look at your console. Click the little arrow next
to the object to open it up.

## What just happened?

Getting a document took three lines, because three separate things happen:

1. **`doc(...)` makes a reference.** A reference is just the *address* of a
   document, like writing an address on an envelope. Nothing gets sent yet.
2. **`getDoc(...)` goes and asks** the database for whatever is at that
   address. That takes time, so we `await` it — same as `fetch` in the
   weather project.
3. What comes back is a **snapshot**: a picture of the document at the
   moment you asked. **`.data()`** pulls the actual object out of it.

It's the same idea as the weather project, where `fetch` gave you a
response and you had to call `.json()` to get the data out.

## Check yourself

Look at the object in your console and answer:

- What's in `quiz.questions`?
- What is the text of the first question? How would you write that in code?
- How many questions are there?

**Next:** [Step 2: Show the questions](2-show-the-questions.md)
