# manuelbichler.com

This is my digital garden where I try new stuff. It doesn't follow DRY principles as I sometimes have multiple things added that basically do the same stuff but differently. So if you find something that you don't like you can write a PR. If you have a question you can reach me via twitter @manuelbichler or bichler@gmail.com

## Spotlight

Spotlight is a [Tailwind UI](https://tailwindui.com) site template built using [Tailwind CSS](https://tailwindcss.com) and [Next.js](https://nextjs.org).

## Getting started

To get started with this template, first install the npm dependencies:

```bash
npm install
```

Next, create a `.env.local` file in the root of your project and set the `NEXT_PUBLIC_SITE_URL` variable to your site's public URL:

```
NEXT_PUBLIC_SITE_URL=https://example.com
```

Next, run the development server:

```bash
npm run dev
```

Finally, open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Customizing

You can start editing this template by modifying the files in the `/src` folder. The site will auto-update as you edit these files.

## License

This site template is a commercial product and is licensed under the [Tailwind UI license](https://tailwindui.com/license).

## Learn more

To learn more about the technologies used in this site template, see the following resources:

- [Tailwind CSS](https://tailwindcss.com/docs) - the official Tailwind CSS documentation
- [Next.js](https://nextjs.org/docs) - the official Next.js documentation
- [Headless UI](https://headlessui.dev) - the official Headless UI documentation
- [MDX](https://mdxjs.com) - the MDX documentation

## plantescale database

connect to pscale `pscale auth login`
connect to pscale database `pscale connect manuelbichler inital-setup --port 3309`
do`npx prisma db push` to update the planetscale database. If you get a `Error: direct DDL is disabled` check if you have the correct pw from pscale. You'll find it in the settings of the branch in the pscale dashboard.
This will update the `initial-setup` branch of the database. To push it to main you need to create a deploy request in the planetscale dashboard.
