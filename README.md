# lenotes-ng 

A simple note-taking app.

### Tech
- Angular
	Client.
- NestJS
	Web API.
- Supabase
	Auth and data storage.
- Nx
	Monorepo functionality. 

### Architecture
The app uses a modular architecture througout. Interfaces are the entry point for
adding new functionality and dependency injection allows for simple swapping of
implementations.

![dependency graph](/assets/graph.png)

### Showcase
![demo 1](/assets/demo1.gif)

![demo 2](/assets/demo2.gif)

![demo 3](/assets/demo3.gif)

---
![log in](/assets/logIn.png)

---
![sign up](/assets/signUp.png)

### Test launch 
- Clone this repo.
- Run `npm i` to install required dependencies.
- a) Use `git switch naive` to use an in-memory storage that does not need any setup. The
   auth views will not be visible; you'll be taken directly to the app. Log out will not
   do anything.

	 or

  b) Set up a supabase app. Run the `schema.sql` file on the provided PostgreSQL database,
  then create a `.env` file with `SUPABASE_URL` set to the app's URL, and `SUPABASE_KEY` set
  to the app's `anon` key.
- Run `nx start api` and `nx serve client`.
    If you're using the *naive* version you'll see the app directly, otherwise you'll be
    taken to the auth page where you'll be able to create an user and then log in.

