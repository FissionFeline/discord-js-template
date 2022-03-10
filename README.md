# discord-js-template
This is my template for most of my discord.js bots, feel free to use!

## Setup
Copy the `.env.example` file to `.env`
```bash
cp .env.example .env
```

Open it with your favorite editor, Nano, Vim or Emacs.

Replace the TOKEN in the .env file with your own Authentication Token given to you by Discord in their portal 

## DO NOT MAKE THE .env FILE PUBLIC
By default, `.env` is git ignored (meaning it is ignored by git). If you disable this, there can be huge security risks such as
- Hackers being able to use your authentication token and using it for malicious purposes
- Bad in general

If you do not touch the `.gitignore` then you should be fine. But be sure not to remove the `.env` part from the `.gitignore`.
