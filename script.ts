import { prisma } from "./lib/prisma";

async function main() {
  const newPost = await prisma.blog.create({
    data: {
      title:
        "I Replaced Axios With 25 Lines of Vanilla JS (And You Should Too)",
      desc: `I used to install Axios in every project.

It felt professional. “Real developers use Axios,” I thought.

Then I actually read Axios’s source code.

Turns out, I was importing 13KB to wrap fetch() with features JavaScript already provides.

Here’s what changed my mind.

What Axios Actually Does
Before we replace it, let’s be honest about what Axios gives you:

Automatic JSON transformation — Axios auto-parses JSON responses

Better error handling — Axios rejects on HTTP error status codes

Request/response interceptors — Middleware for requests

Request cancellation — AbortController wrapper

Timeout support — Race condition with setTimeout

That’s it. Five features.

And here’s the thing: JavaScript’s Fetch API can do all of this.

You just need to know how.`,
    },
  });

  console.log("Data berhasil dibuat:", newPost);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
