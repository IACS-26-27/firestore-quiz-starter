# 3. Sign in

So far you've only *read* from the database, and anyone can do that. Next
you're going to *write* your answers into it. But you can't just let anyone
write anything: the database needs to know who you are, so it can make sure
you only change *your own* answers. That's what signing in is for.

Add a "Sign in with Google" button to `index.html`, with the id `sign-in`.
Then, in `app.js`:

```js
let user; // A variable to store the user once they sign in!
const signInButton = document.querySelector("#sign-in");
signInButton.addEventListener("click", async () => {
  const result = await signInWithPopup(auth, new GoogleAuthProvider());
  console.log("Signed in as", result.user.email);
  user = result.user; // Save the user!
});
```

Click it, and sign in with your *school* account. You should see
`Signed in as ...` in the console.

Every time the page reloads, `user` starts out empty again, so you'll need
to sign in again. (Firebase actually *does* remember you. Getting your page
to notice is an extra challenge in Step 6.)

## Red stuff in the console

You'll probably also see a few red `Cross-Origin-Opener-Policy` errors.
Ignore them. Look at the file name on the right side of each message: they
come from `popup.ts` (Google's sign-in code), not your `app.js`. When
something in the console is red, that file name tells you whose problem it
is.

## Try it

You might want to think about the workflow for your user. We won't be able to save answers until the user is signed in, so what's the nicest way to make this work for your user? You could move the sign-in code to happen *when the user clicks Submit*, or you could wait to show the quiz *until the user has already signed in*. 

If you want to hide and show buttons, the `hidden` attribute is the simplest way to handle it. You could start your whole quiz hidden (`<section id="quiz" hidden>`) and then only show it once the user is signed in; similarly, you could hide the sign in button once they're signed in.

```js
// When they sign in, show the quiz and hide the button!
document.querySelector('#quiz').hidden = false;
document.querySelector('#sign-in').hidden = true;
```

Next up: [Step 4: Save your answers](4-save-your-answers.md)
