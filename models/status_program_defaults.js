conn = new Mongo();
db = conn.getDB("metal");

/***********
 MILEAGEPLUS
 ***********/

var mp =
	  {
		    "name": "MileagePlus",
		    "airline": "United Airlines",
        "slugs": {
            "mile": "PQM",
            "segment": "PQS",
            "spend": "PQD"
        },
        "tiers": [
            {
                "tier_name": "Premier Silver",
                "level": 0,
                "mile_threshold": 25000,
                "segment_requirement": 30,
                "spend_requirement": 3000
            },
            {
                "tier_name": "Premier Gold",
                "level": 1,
                "mile_threshold": 50000,
                "segment_requirement": 60,
                "spend_requirement": 6000
            },
            {
                "tier_name": "Premier Platinum",
                "level": 2,
                "mile_threshold": 75000,
                "segment_requirement": 90,
                "spend_requirement": 9000
            },
            {
                "tier_name": "Premier 1K®",
                "level": 3,
                "mile_threshold": 100000,
                "segment_requirement": 120,
                "spend_requirement": 12000
            }
        ]
    };


/***********
   SKYMILES
 ***********/

var sm =
	  {
		    "name": "SkyMiles",
		    "airline": "Delta Airlines",
        "slugs": {
            "mile": "MQM",
            "segment": "MQS",
            "spend": "MQD"
        },
        "tiers": [
            {
                "tier_name": "Silver Medallion",
                "level": 0,
                "mile_threshold": 25000,
                "segment_requirement": 30,
                "spend_requirement": 3000
            },
            {
                "tier_name": "Gold Medallion",
                "level": 1,
                "mile_threshold": 50000,
                "segment_requirement": 60,
                "spend_requirement": 6000
            },
            {
                "tier_name": "Platinum Medallion",
                "level": 2,
                "mile_threshold": 75000,
                "segment_requirement": 100,
                "spend_requirement": 9000
            },
            {
                "tier_name": "Diamond Medallion",
                "level": 3,
                "mile_threshold": 125000,
                "segment_requirement": 140,
                "spend_requirement": 15000
            }
        ]
    };


/***********
  AADVANTAGE
 ***********/

var aa =
	  {
		    "name": "AAdvantage",
		    "airline": "American Airlines",
        "slugs": {
            "mile": "EQM",
            "segment": "EQS",
            "point": "EQP"
        },
        "tiers": [
            {
                "tier_name": "Silver Medallion",
                "level": 0,
                "mile_threshold": 25000,
                "segment_requirement": 30,
                "spend_requirement": 3000
            },
            {
                "tier_name": "Gold Medallion",
                "level": 1,
                "mile_threshold": 50000,
                "segment_requirement": 60,
                "spend_requirement": 6000
            },
            {
                "tier_name": "Platinum Medallion",
                "level": 2,
                "mile_threshold": 75000,
                "segment_requirement": 100,
                "spend_requirement": 9000
            },
            {
                "tier_name": "Diamond Medallion",
                "level": 3,
                "mile_threshold": 125000,
                "segment_requirement": 140,
                "spend_requirement": 15000
            }
        ]
    };

db.StatusProgram.update({ "name": "MileagePlus" }, { $set: mp }, { upsert: "true" });
db.StatusProgram.update({ "name": "SkyMiles" }, { $set: sm }, { upsert: "true" });
db.StatusProgram.update({ "name": "AAdvantage" }, { $set: aa }, { upsert: "true" });