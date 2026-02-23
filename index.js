import express from "express";

let courses = [
  {
    id: 1,
    title: "Introduction to Web Development",
    price: 500,
    description: "This course will teach you the basics of web development",
    instructor: "John Doe",
  },
  {
    id: 2,
    title: "Advanced Web Development",
    price: 1000,
    description:
      "This course will teach you advanced web development techniques",
    instructor: "Jane Doe",
  },
  {
    id: 3,
    title: "Python Programming",
    price: 800,
    description: "This course will teach you the basics of Python programming",
    instructor: "Bob Smith",
  },
];

const app = express();
app.use(express.json());
// http://localhost:3000
app.get("/", (req, res) => {
  res.send("<h1>Welcome To our Server....</h1>");
});

app.get("/api/courses", (req, res) => {
  res.status(200).send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const { id } = req.params;

  const course = courses.find((course) => course.id === +id);

  if (!course) {
    return res.status(404).send("Course not found");
  }

  res.status(200).send(course);
});

app.post("/api/courses", (req, res) => {
  const newCourse = { id: courses.length + 1, ...req.body };
  courses.push(newCourse);
  res.status(201).send(newCourse);
});

app.put("/api/courses/:id", (req, res) => {
  const { id } = req.params;

  const course = courses.find((course) => course.id === +id);

  if (!course) {
    return res.status(404).send("Course not found");
  }

  courses = courses.map((course) =>
    course.id === +id ? { ...course, ...req.body } : course,
  );

  res.status(200).send(courses);
});

app.delete("/api/courses/:id", (req, res) => {
  const { id } = req.params;

  const course = courses.find((course) => course.id === +id);

  if (!course) {
    return res.status(404).send("Course not found");
  }

  courses = courses.filter((course) => course.id !== +id);

  res.status(200).send(courses);
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
