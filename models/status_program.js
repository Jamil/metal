var Schema = mongoose.Schema;

var StatusProgram = new Schema({
	name: String,
	airline: String,
	tiers: [{
		tier_name: String,
		level: Number,
		mile_requirement: {
			slug: String,
			threshold: Number,
		},
		segment_requirement: {
			slug: String,
			threshold: Number,
		},
		point_requirement: {
			slug: String,
			threshold: Number,
		},
		spend_requirement: {
			slug: String,
			threshold: Number,
		}
	}]
});

module.exports = mongoose.model('StatusProgram', StatusProgram, 'StatusProgram');
