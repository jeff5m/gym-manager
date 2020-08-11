const { age, date } = require('../../lib/utils');
const Instructor = require('../models/Instructor')

module.exports = {
	index(req, res) {

		Instructor.all(function (instructors) {

			const newInstructors = new Array();

			for (instructor of instructors) {
        const formattedServices = instructor.services.split(',')
        newInstructors.push({
          ...instructor,
          services: formattedServices
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

    const values = [
      req.body.name,
      req.body.avatar_url,
      req.body.gender,
      req.body.services,
      date(req.body.birth).iso,
      date(Date.now()).iso
    ]

		Instructor.create(values, function(instructor) {
      return res.redirect(`/instructors/${instructor.id}`)
		})

	},
	show(req, res) {
		Instructor.find(req.params.id, function(instructor) {
			if(!instructor) return res.send('Instructor not found')

			instructor.age = age(instructor.birth)
			instructor.services = instructor.services.split(',')
			instructor.created_at = date(instructor.created_at).format
			
			return res.render('instructors/show', { instructor });
		})

	},
	edit(req, res) {
		Instructor.find(req.params.id, function(instructor) {
			if (!instructor) return res.send('Instructor not found!')

			instructor.birth = date(instructor.birth).iso

			return res.render('instructors/edit', { instructor })
		})

		return;
	},
	put(req, res) {
		const keys = Object.keys(req.body); // return only object keys 

		for (let key of keys) {
			if (req.body[key] == '') {
				return res.send('Please, fill all the fields!');
			}
		}

    const values = [
      req.body.avatar_url,
      req.body.name,
      date(req.body.birth).iso,
      req.body.gender,
      req.body.services,
      req.body.id
		]
		
		Instructor.update(values, function() {
			return res.redirect(`instructors/${req.body.id}`)
		})

		return;
	},
	delete(req, res) {
		Instructor.delete(req.body.id, function() {
			return res.redirect('/instructors')
		})
		return;
	},
}
