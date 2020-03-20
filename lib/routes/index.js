import ScrapperService from "../services/ScrapperService";

const express = require("express");
const router = express.Router();

router.get("/", async function(req, res, next) {
  const data = await ScrapperService.fetch_data();
  res.json(data);
});

module.exports = router;
