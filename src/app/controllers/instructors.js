const { age, date } = require('../../lib/utils');
const db = require('../../config/db')

module.exports = {
	index(req, res) {

		const newInstructors = new Array();

		db.query(`SELECT * FROM instructors`, function(err, results) {
			if (err) return res.send('Database Error')
			
		for (instructor of results.rows) {
			const formatedServices = instructor.services.split(',')
			newInstructors.push({
				...instructor,
				services: formatedServices
			})
		}
			return res.render('instructors/index', { newInstructors });
		})

	},
	create(req, res) {
		return res.render('instructors/create');
	},
	post(req, res) {
		const keys = Object.keys(req.body); // return only object keys 

		for (let key of keys) {
			if (req.body[key] == '') {
				return res.send('Please, fill all the fields!');
			}
		}

		const query = `
			INSERT INTO instructors (
				name,
				avatar_url,
				gender,
				services,
				birth,
				created_at
			) VALUES ($1, $2, $3, $4, $5, $6)
			RETURNING id
		`

		const values = [
			req.body.name,
			req.body.avatar_url,
			req.body.gender,
			req.body.services,
			date(req.body.birth).iso,
			date(Date.now()).iso
		]

		db.query(query, values, function(err, results) {
			if (err) return res.send('Database Error')
			return res.redirect(`/instructors/${results.rows[0].id}`)
		})
	},
	show(req, res) {
		// req.query = is any query parameters.
		// req.body = is the actual body of the request
		// req.params = is route parameters. Can catch more than one



		return res.send('works');
	},
	edit(req, res) {
		return;
	},
	put(req, res) {
		const keys = Object.keys(req.body); // return only object keys 

		for (let key of keys) {
			if (req.body[key] == '') {
				return res.send('Please, fill all the fields!');
			}
		}

		let { avatar_url, birth, name, services, gender } = req.body;

		return;
	},
	delete(req, res) {
		return;
	},
}
