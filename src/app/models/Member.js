const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
  all(callback) {

    db.query(`SELECT * FROM members ORDER BY name ASC`, function (err, results) {
      if (err) throw `Database error! ${err}`
      
      callback(results.rows)
    })
  },
  create(values, callback) {
    const query = `
			INSERT INTO members (
				name,
				avatar_url,
				gender,
				email,
				birth,
        blood,
        weight,
        height
			) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
			RETURNING id
		`
    db.query(query, values, function (err, results) {
      if (err) throw `Database error! ${err}`
      callback(results.rows[0])
    })
  },
  find(id, callback) {
    db.query(`
      SELECT * 
      FROM members 
      WHERE id = $1`, [id], function (err, results) {
        if (err) throw `Database error! ${err}`
      
        callback(results.rows[0])
    })
  },
  update(values, callback) {
    const query = `
      UPDATE members SET
        avatar_url=($1),
        name=($2),
        birth=($3),
        gender=($4),
        email=($5),
        blood=($6),
        weight=($7),
        height=($8)
      WHERE id = $9 
    ` // important establish WHERE for update only the row with the specific id

    db.query(query, values, function(err, results) {
      if (err) throw `Database error! ${err}`

      callback()
    })

  },
  delete(id, callback) {
    db.query(`
      DELETE FROM members
      WHERE id = $1`, [id], function(err, results) {
        if (err) throw `Database error! ${err}`

        return callback()
      })
  }
}