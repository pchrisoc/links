# Links
- Forked from [hyperdti-cu](https://hyperdt.in/)
- Backend adapted from [IEEE Berkeley Short Circuit](https://github.com/IEEEBerkeley/short-circuit)
- Branding for IEEE Berkeley adapted from [IEEE Berkeley](https://ieee.berkeley.edu/)
- PostHog analytics removed for the moment

## Features

- Create Short URLs that are automatically copied to your clipboard upon generation.
- Create custom aliases for your URLs, if you want.
- URL Validation upon form submission.

## Installation
Use yarn to install dependencies and run the development server.

```bash
yarn
yarn dev
```

### Environment Variables
Navigate to `./server` and create a `.env` file with the MongoDB connection string following `.env.example`.

### Deployment
Navigate to project root and run `npm run deploy`. This will build the frontend, copy the build folder to server, and deploy it via the Express server at `:3333/`.
## License

[MIT](LICENSE)
