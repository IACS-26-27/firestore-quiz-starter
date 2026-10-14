# 3. Sign in

So far you've only *read* from the database, and anyone can do that. Next
you're going to *write* your answers into it. But you can't just let anyone
write anything: the database needs to know who you are, so it can make sure
you only change *your own* answers. That's what signing in is for.

Add a "Sign in with Google" button to `index.html`, with the id `sign-in`.
Then, in `app.js`:

```js
const signInButton = document.querySelector("#sign-in");
signInButton.addEventListener("click", async () => {
  const result = await signInWithPopup(auth, new GoogleAuthProvider());
  console.log("Signed in as", result.user.email);
});
```

Click it, and sign in with your *school* account. You should see
`Signed in as ...` in the console.

You only have to do this once. Firebase remembers you, even when the page
reloads.

## Red stuff in the console

You'll probably also see a few red `Cross-Origin-Opener-Policy` errors.
Ignore them. Look at the file name on the right side of each message: they
come from `popup.ts` (Google's sign-in code), not your `app.js`. When
something in the console is red, that file name tells you whose problem it
is.

## Try it

Make the sign-in button disappear once you've signed in. (Hint: every
element has a `hidden` property you can set to `true`.)

You'll notice it comes back when the page reloads, even though you're
still signed in. Your page loads faster than Firebase remembers you. Fixing
that is an extra challenge in Step 6.

Next up: [Step 4: Save your answers](4-save-your-answers.md)
