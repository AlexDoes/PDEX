# BAX (PDEX) - Web Application

<!-- ![Bax Logo](/public/baxlogo.png){width=350, height=400, align:center} -->

<p align="center">
  <img src="/public/baxlogo.png" width="350" height="400">
</p>

## [Check out BAX live here or at Bax.gg!](https://bax.gg)

BAX is a web application designed to create a community for like-minded individuals who share an interest in plants. The application is created using Next.js, Prisma, TypeScript, TailwindCSS, AWS and PostgresQL.

![Bax Screenshot](/public/images/baxSS.png)

## Features

Some key features of BAX (PDEX) web application include:

- User authentication and authorization through OAuth/NextAuth
- User profile management
- Community's submitted plant catalog with search and filtering options (two approaches)
- Plant collection / wishlist and favorites functionality
- Community forums for plant enthusiasts to connect and share knowledge through comments and more
- Social media-esque submission of personal plants utilizing AWS.

![Bax Search](/public/images/baxSearch.png)

## Technologies Used

The BAX (PDEX) web application is built using the following technologies:

- Next.js: A React framework for building server-side rendered and static websites
- Prisma: A modern database toolkit for TypeScript and Node.js
- TypeScript: A statically typed superset of JavaScript
- TailwindCSS: A utility-first CSS framework
- PostgresQL: A powerful, open-source relational database management system

## Highlight

Regarding the two search bar components:

1. `NavBarSearchbarMemoize` memoizes each input into the search bar to fetch data from backend as its being typed in. It caches the data in a map to reduce the need to fetch the same result multiple times, however this is expensive if there's no debounce and if the user chooses prefers to type out the whole search term or choose to delete certain chars. Duplicating results as the user types a more specific term.
2. `NavBarSearchbarPrefetch` is a fix to the initial problem by only fetching and making sure the results are related to the search bar's content. This decreases the unnecessary calls which would occur if the user typed in more specific terms/more keys. It also reduces the calls if the user were to choose to delete characters but the results are already fetched. This has a limit on the return and can be compounded with loss of suggestions but this can be improved on in the future. This approach to fetching relevant search data as suggestions is prefered and cost-saving.

## Installation

To get started with the BAX (PDEX) web application, follow these steps:

1. Clone the repository: `git clone https://github.com/alexdoes/pdex.git`
2. Navigate to the project directory: `cd pdex`
3. Install the dependencies: `npm install` or `yarn install`
4. Set up the database connection in the `.env` file (postgres database, OAuth key)
5. Run the development server: `npm run dev` or `yarn dev`
6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Contributing

We welcome contributions to the BAX (PDEX) web application! If you'd like to contribute, please follow these guidelines:

1. Fork the repository
2. Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name` or `git checkout -b bugfix/your-bug-fix-name`
3. Make your changes and commit them: `git commit -m "Add your commit message"`
4. Push your branch to your forked repository: `git push origin feature/your-feature-name` or `git push origin bugfix/your-bug-fix-name`
5. Open a pull request on the main repository

## License

The BAX (PDEX) web application is open source and available under the [MIT License](https://opensource.org/licenses/MIT).

## Contact

If you have any questions or need further assistance, feel free to contact our support team at baxreport@gmail.com.
