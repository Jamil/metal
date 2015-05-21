var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StatusProgram = new Schema({
    _id: String,
	  name: String,
	  airline: {
        type: String,
        ref: 'Airline'
    },
    slugs: {
        mile: String,
        segment: String,
        spend: String,
        point: String
    },
	  tiers: [{
		    _id: String,
		    tier_name: String,
		    level: Number,

		    mile_threshold: Number,
		    segment_requirement: Number,
		    point_requirement: Number,
		    spend_requirement: Number,

        mile_bonus: Number,
        spend_bonus: Number
	  }],
    revenue_based: Boolean
});

module.exports = mongoose.model('StatusProgram', StatusProgram, 'StatusProgram');
