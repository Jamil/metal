var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StatusProgram = new Schema({
	  name: String,
	  airline: String,
    slugs: {
        mile: String,
        segment: String,
        spend: String,
        point: String
    },
	  tiers: [{
		    tier_name: String,
		    level: Number,
		    mile_threshold: Number,
		    segment_requirement: Number,
		    point_requirement: Number,
		    spend_requirement: Number
	  }]
});

module.exports = mongoose.model('StatusProgram', StatusProgram, 'StatusProgram');
