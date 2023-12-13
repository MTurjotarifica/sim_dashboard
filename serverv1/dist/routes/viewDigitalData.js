import express from "express";
import fs from "fs";
import csvParser from "csv-parser";
const router = express.Router();
router.get("/data", (req, res) => {
    const data = {
        id: [],
        website: [],
        provider: [],
        dates: [],
        two_year_cost: [],
    };
    // fs.createReadStream("df_kundigung_w_forecast.csv")
    fs.createReadStream("12sep.csv")
        .pipe(csvParser())
        .on("data", (row) => {
        data.id.push(row.id);
        data.website.push(row.website);
        data.provider.push(row.provider);
        data.dates.push(row.date);
        // Perform the division operation and push the result into vl_value
        const two_year_cost = parseFloat(row.two_year_cost) / 24;
        data.two_year_cost.push(two_year_cost);
        // console.log(row.vl_value)
    })
        .on("end", () => {
        res.json({
            totalItems: data.id.length,
            data,
        });
    })
        .on("error", (err) => {
        // Handle any errors during CSV parsing or reading
        console.error("Error reading CSV:", err);
        res.status(500).json({ error: "Failed to read CSV data" });
    });
});
export default router;
//# sourceMappingURL=viewDigitalData.js.map