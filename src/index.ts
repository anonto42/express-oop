import App from "./App";

const app = new App();

app.app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
