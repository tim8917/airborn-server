const supertest = require('supertest');
const server = require('../../server');

const request = supertest(server);

test('request by operationName.', async(done) => {
    request
        .post('/api/ql')
        .send({
            query: '{sendCommand(command: "check")}',
        })
        .expect(200)
        .end((err, res) => {
            expect(res.body.data.sendCommand).toEqual('check');
            done();
        });
});

test('query multiple Commands.', async(done) => {
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

test('query single Command.', async(done) => {
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
