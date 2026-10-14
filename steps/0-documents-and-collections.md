# 0. How Firestore organizes data

Firestore stores *documents*. A document is basically a JavaScript object,
like this:

```js
{ title: "Get to Know the Class", questions: [ ... ] }
```

Documents live in *collections*, kind of like files live in folders. Every
document has an ID, so you find a document with a path that looks a lot
like a folder path:

```
quizzes/quiz-1
```

That means "the document with ID `quiz-1` in the `quizzes` collection."

Documents can have their own collections inside them, too. Our quiz has a
`responses` collection, with one document for each person who answers:

```
quizzes/quiz-1/responses/<your account's ID>
```

Your account's ID is a long random string Google gives your account. You'll
see it in Step 3.

Next up: [Step 1: Get the quiz](1-get-the-quiz.md)
