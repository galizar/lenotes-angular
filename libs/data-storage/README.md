# data-storage

This library was generated with [Nx](https://nx.dev).


## Running unit tests

Run `nx test data-storage` to execute the unit tests via [Jest](https://jestjs.io).

**Supabase implementations**
When using the supabase implementations, you must make sure that an user with
DUMMY_EMAIL and DUMMY_PASSWORD is signed up.

The test domain objects must belong to said user (i.e. their `user_id` property
must be the uuid of that user). See the `schema.sql` file in the
`src/implementations/supabase` folder.

## Running lint

Run `nx lint data-storage` to execute the lint via [ESLint](https://eslint.org/).

