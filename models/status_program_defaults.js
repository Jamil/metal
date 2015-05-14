conn = new Mongo();
db = conn.getDB("metal");

/***********
 MILEAGEPLUS
 ***********/

var mp = 
	{
		"name": "MileagePlus",
		"airline": "United",
		"tiers": [
		{
			"tier_name": "Premier Silver",
			"mile_requirement": {
				"threshold": 25000,
				"slug": "PQM"
			},
			"segment_requirement": {
				"threshold": 30,
				"slug": "PQS"
			},
			"spend_requirement": {
				"threshold": 3000,
				"slug": "PQD"
			}
		},
		{
			"tier_name": "Premier Gold",
			"mile_requirement": {
				"threshold": 50000,
				"slug": "PQM"
			},
			"segment_requirement": {
				"threshold": 60,
				"slug": "PQS"
			},
			"spend_requirement": {
				"threshold": 6000,
				"slug": "PQD"
			}
		},
		{
			"tier_name": "Premier Platinum",
			"mile_requirement": {
				"threshold": 75000,
				"slug": "PQM"
			},
			"segment_requirement": {
				"threshold": 90,
				"slug": "PQS"
			},
			"spend_requirement": {
				"threshold": 9000,
				"slug": "PQD"
			}
		},
		{
			"tier_name": "Premier 1K",
			"mile_requirement": {
				"threshold": 100000,
				"slug": "PQM"
			},
			"segment_requirement": {
				"threshold": 120,
				"slug": "PQS"
			},
			"spend_requirement": {
				"threshold": 12000,
				"slug": "PQD"
			}
		}
		]
	};

/********
 SKYMILES
 ********/

var sm = 
	{
		"name": "SkyMiles",
		"airline": "Delta",
		"tiers": [
		{
			"tier_name": "Silver Medallion",
			"mile_requirement": {
				"threshold": 25000,
				"slug": "MQM"
			},
			"segment_requirement": {
				"threshold": 30,
				"slug": "MQS"
			},
			"spend_requirement": {
				"threshold": 3000,
				"slug": "MQD"
			}
		},
		{
			"tier_name": "Gold Medallion",
			"mile_requirement": {
				"threshold": 50000,
				"slug": "MQM"
			},
			"segment_requirement": {
				"threshold": 60,
				"slug": "MQS"
			},
			"spend_requirement": {
				"threshold": 6000,
				"slug": "MQD"
			}
		},
		{
			"tier_name": "Platinum Medallion",
			"mile_requirement": {
				"threshold": 75000,
				"slug": "MQM"
			},
			"segment_requirement": {
				"threshold": 100,
				"slug": "MQS"
			},
			"spend_requirement": {
				"threshold": 9000,
				"slug": "MQD"
			}
		},
		{
			"tier_name": "Diamond Medallion",
			"mile_requirement": {
				"threshold": 125000,
				"slug": "MQM"
			},
			"segment_requirement": {
				"threshold": 140,
				"slug": "MQS"
			},
			"spend_requirement": {
				"threshold": 15000,
				"slug": "MQD"
			}
		}
		]
	};

/**********
 AADVANTAGE
 **********/

var aa = 
	{
		"name": "AAdvantage",
		"airline": "American",
		"tiers": [
		{
			"tier_name": "AAdvantage Gold",
			"mile_requirement": {
				"threshold": 25000,
				"slug": "EQM"
			},
			"segment_requirement": {
				"threshold": 30,
				"slug": "EQS"
			},
			"point_requirement": {
				"threshold": 25000,
				"slug": "EQP"
			}
		},
		{
			"tier_name": "AAdvantage Platinum",
			"mile_requirement": {
				"threshold": 50000,
				"slug": "EQM"
			},
			"segment_requirement": {
				"threshold": 60,
				"slug": "EQS"
			},
			"point_requirement": {
				"threshold": 50000,
				"slug": "EQP"
			}
		},
		{
			"tier_name": "AAdvantage Executive Platinum",
			"mile_requirement": {
				"threshold": 100000,
				"slug": "EQM"
			},
			"segment_requirement": {
				"threshold": 120,
				"slug": "EQS"
			},
			"point_requirement": {
				"threshold": 100000,
				"slug": "EQP"
			}
		}
		]
	};

db['StatusProgram'].update({ "name": "MileagePlus" }, { $set: mp }, { upsert: "true" });
db['StatusProgram'].update({ "name": "SkyMiles" }, { $set: sm }, { upsert: "true" });
db['StatusProgram'].update({ "name": "AAdvantage" }, { $set: aa }, { upsert: "true" });
