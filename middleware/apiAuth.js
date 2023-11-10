const validApiKeys = ["your-api-key-1", "your-api-key-2"];
const adminMethods = ["POST", "PUT", "DELETE", "PATCH"];

export const authenticateAPIKey = (req, res, next) => {
  const apiKey = req.header("X-API-Key");
  const method = req.method;
  console.log({ apiKey, method });
  if (adminMethods.includes(method)) {
    if (!apiKey || !validApiKeys.includes(apiKey)) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }

  next();
};

// const requestData = req.body;
// const queryParamValue = req.query.paramName;
// app.get('/api/users/:userId', (req, res) => {
//   const userId = req.params.userId;
//   res.json({ userId });
// });

// const reqData = {
//   path: req.path,
//   url: req.url,
//   originalUrl: req.originalUrl,
//   hostname: req.hostname,
//   ip: req.ip,
//   protocol: req.protocol,
//   header: req.get("X-API-Key")
// }
// console.log(reqData)

// const sampleFront = async () => {
//   // Replace 'YOUR_API_KEY' with the actual API key
//   const apiKey = "YOUR_API_KEY";
//   const response = await axios.post("/api/private-post-route", postData, {
//     headers: {
//       "X-API-Key": apiKey,
//     },
//   });

//   const res = await axios.get("/api/protected", {
//     headers: {
//       "X-API-Key": apiKey,
//     },
//   });
// };
