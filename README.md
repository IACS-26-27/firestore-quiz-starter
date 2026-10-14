# Get to Know the Class

In the weather project, you used `fetch` to **read** data from someone else's
server. This time you'll read **and write** data, in a database your whole
group shares. You'll answer a quiz, save your answers, and then see everyone
else's answers come back to your page.

Your teacher has already set up the database. It's called **Firestore**, and
it's made by Google. You don't need to set anything up.

## Steps

Do these in order. Each one adds a few lines to the same function in
[`app.js`](app.js).

0. [How Firestore organizes data](steps/0-documents-and-collections.md)
1. [Get the quiz from the database](steps/1-get-the-quiz.md)
2. [Show the questions on the page](steps/2-show-the-questions.md)
3. [Save your answers](steps/3-save-your-answers.md)
4. [See everyone's answers](steps/4-see-everyones-answers.md)
5. [The rules of the road](steps/5-rules-of-the-road.md)

## Before you start

- Start Live Server, same as always, and open the page.
- Open dev tools (right-click → **Inspect**) and click the **Console** tab.
  Keep it open the whole time.
- Click **Sign in with Google** and use your **school** account. You should
  see `Signed in as ...` in the console.
- Every time you save and the page reloads, **click Sign in again**. Your
  code only runs after you sign in.
