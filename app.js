const express = require("express");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("graphql-tools");
const fs = require("fs");
const path = require("path");
const resolvers = require("./graphql/resolver");

// Читай схему з файлу
const schemaPath = path.join(__dirname, 'graphql', 'schema.graphql');
const typeDefs = fs.readFileSync(schemaPath, "utf-8");

// Створюй схему з допомогою SDL та Resolver'ів
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();

// Підключення до MongoDB
mongoose.connect('mongodb+srv://yuliiashurek:5jVL69eSuujEhDR8@backenddb.r4n9n.mongodb.net/?retryWrites=true&w=majority&appName=BackendDb');

app.use("/graphql", graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000/graphql");
});
