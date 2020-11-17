const supertest = require('supertest');
const server = require('../../server');

const request = supertest(server);

test('Command returns multiple items.', async(done) => {
    request
        .post('/api/ql')
        .send({
            query: "{ commands {id} }",
        })
        .expect(200)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.data.commands.length).toEqual(2);
            done();
        });
});

test('Command returns single item.', async(done) => {
    request
        .post('/api/ql')
        .send({
            query: '{ command(id: "fly"){name} }',
        })
        .expect(200)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.data.command.name).toEqual('Fly');
            done();
        });
});
