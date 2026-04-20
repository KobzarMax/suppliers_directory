# Senior Frontend Developer – Take-Home Test

Thanks for your time. This exercise is designed to take around **2 hours** – please
don't feel you need to spend more. We care more about clean, idiomatic code and
sensible decisions than about shipping every last feature. Keep it simple, don't
add too much complexity and leverage React as much as possible. Also lodash has been
included to assist where needed.

## The brief

Build a small **Supplier Directory** SPA that lets a buyer:

1. View a list of suppliers fetched from a mock source.
2. Search the list.
3. Add a new supplier via a form.
4. View an individual supplier's detail.

A mock dataset is provided in `src/mocks/suppliers.json` and hosted at localhost:3001/suppliers
when you run the `npm run mock-api` script. The full list can be accessed at
http://localhost:3001/suppliers and searching can be performed via the `q` parameter
e.g. http://localhost:3001/suppliers?q=apex. Refer to json-server documentation on additional
features such as creating new records.

### Supplier shape

```ts
type Supplier = {
  id: string;
  name: string;
  registrationNumber: string;
  country: "UK" | "FR" | "ES" | "DE" | "IE";
  categories: string[];
  complianceStatus: "Verified" | "Pending" | "NotVerified";
  createdAt: string;
};
```

## Requirements

### 1. Supplier list

- Load suppliers on mount. Simulate latency (~500ms) so loading states are visible.
- E.g. localhost:3001/suppliers
- Show loading, error, empty, and success states.
- Columns/fields: name, country, categories, compliance status, created date.

### 2. Search & filter

- Text search by `name` (debounced, ~300ms).
- E.g. http://localhost:3001/suppliers?q=apex
- Show a clear "no results" state.

### 3. Add supplier

- Form to allow entering all supplier information, categories can be a comma separated list for simplicity
- Client-side validation:
  - `name`: required, min 2 chars.
  - `registrationNumber`: required, must match `/^[A-Z0-9-]{4,12}$/`.
  - `country`: required.
  - `categories`: at least one.
- On submit, POST request to the API.

### 4. Detail view

- Opening a supplier shows its full details. Route (`/suppliers/:id`) or separate section in the page.

### 5. Tests

Unit tests covering user interaction.

Follow React Testing Library best practices: role-based queries, `userEvent`
over `fireEvent`, avoid testing implementation details.

## Explicitly out of scope

- Redux / MobX / any global state library – hooks + context if needed.
- A real backend.
- Authentication.
- Internationalisation.
- Docker / CI.
- E2E tests.

## Getting started

```bash
npm install
npm start         # starts the webpack-dev-server on http://localhost:3000
npm test          # runs the Jest test suite
npm run mock-api # runs the mock server
```

The project uses **Webpack 5** for bundling and **Jest + React Testing Library**
for tests, to match the stack used in production.

## Deliverables

Keep it simple, don't worry about adding state management libraries, leverage React as much as possible.

- A Git repo (or zip) with your solution.

Good luck, and have fun.
