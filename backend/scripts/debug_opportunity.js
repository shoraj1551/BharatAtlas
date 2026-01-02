import { connectMongo } from '../src/services/mongoService.js'
import Opportunity from '../models/Opportunity.js'

async function testOpp() {
    try {
        await connectMongo();
        console.log("✅ DB Connected");

        const opps = await Opportunity.find({}).limit(1);
        console.log("✅ Opportunity.find() executed. Result:", opps);

        process.exit(0);
    } catch (e) {
        console.error("❌ Opportunity Error:", e);
        process.exit(1);
    }
}

testOpp();
