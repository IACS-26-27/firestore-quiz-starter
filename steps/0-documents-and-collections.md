# 0. How Firestore organizes data

Firestore stores **documents**. A document is basically a JavaScript object:

```js
{ title: "Get to Know the Class", questions: [ ... ] }
```

Documents live in **collections**, the way files live in folders. Every
document has an ID, so you find a document with a path, like a folder path:

```
quizzes/quiz-1
```

That means: the document with ID `quiz-1`, in the `quizzes` collection.

A document can have collections inside it, too. Each person's answers to
the quiz will live here:

```
quizzes/quiz-1/responses/<your ID>
```

That's all you need for now.

**Next:** [Step 1: Get the quiz](1-get-the-quiz.md)
