let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
describe("Login", () => {
    describe('/GET Login', () => {
        it('it should validate user if correct', (done) => {
            chai.request(server)
                .get('/v1/user/self')
                .set("Authorization", "basic " + new Buffer("bvkvikas@gmail.com:Vikas@1234").toString("base64"))
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('it should validate user if non correct, return unauthorized', (done) => {
            chai.request(server)
                .get('/v1/user/self')
                .set("Authorization", "basic " + new Buffer("krish@gmail.com:krishna@123").toString("base64"))
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});