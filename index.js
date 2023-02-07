const Surreal = require('surrealdb.js');

const db = new Surreal.default('http://127.0.0.1:8000/rpc');

async function main() {

	try {

		await db.signin({
			user: 'root',
			pass: 'root',
		});

		await db.use('test', 'test');

		console.log('----------------------------------------------------------------------------');
		let del = await db.delete("person");
		console.log('d', del);
		console.log('----------------------------------------------------------------------------');

		let created = await db.create("person:tobie", {
			title: 'Founder & CEO',
			name: {
				first: 'Tobie',
				last: 'Morgan Hitchcock',
			},
			marketing: true,
		});
        console.log('c', created);
        console.log('----------------------------------------------------------------------------');

		let updated = await db.change("person:jaime", {
			marketing: false,
		});
        console.log('u', updated);
        console.log('----------------------------------------------------------------------------');

		let people = await db.select("person");
        console.log('p', people);
        console.log('----------------------------------------------------------------------------');

		let groups = await db.query('SELECT marketing, count() FROM type::table($tb) GROUP BY marketing', {
			tb: 'person',
		});
        console.log('g', groups);
        console.log('----------------------------------------------------------------------------');
        console.log('gs', groups[0]);
        console.log('----------------------------------------------------------------------------');

        let deleted = await db.delete("person");
        console.log('d', deleted);
        console.log('----------------------------------------------------------------------------');

        let info = await db.query('INFO FOR DB;')
        console.log('i', info[0]);
        console.log('----------------------------------------------------------------------------');

	} catch (e) {

		console.error('ERROR', e);

	}

}

main();