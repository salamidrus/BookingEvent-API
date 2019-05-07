// import modules
const app = require('../../app');
const HrAccount = require('../../models/hrAccount');
const Vendor = require('../../models/vendor');

const chai = require('chai');
const { expect } = chai;
const mocha = require('mocha');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

mocha.describe('Login HR Routes', () => {
  before(done => {
    HrAccount.create({
      companyName: 'PT Glints Indonesia2, Tbk. ',
      email: 'glints2@indonesia.com',
      password: 'glints1232',
      address: {
        city: 'Kota Jakarta Selatan2',
        streetName: 'Jl. Nongsa No. 24 Blok VII2',
        postalCode: '2944652'
      },
      phone: '073874869462'
    }) // create HR account sample
      .then(user => {
        const objUser = {
          id: user.id
        };
        userId = user.id; // store _id as userId
      });
    done();
  });
  after(done => {
    HrAccount.deleteMany({}, () => {}); // delete all account created after test done
    done();
  });
  mocha.it('successfully logged in!', done => {
    chai
      .request(app)
      .post('/api/v1/login')
      .send({
        email: 'glints2@indonesia.com',
        password: 'glints1232'
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body)
          .to.have.property('message')
          .that.equal('Succesfully logged in!');
        expect(res.body).to.have.property('token');
        done();
      });
  });
});

mocha.describe('Login Vendor Routes', () => {
  before(done => {
    Vendor.create({
      name: 'Idrus2 Productions Ltd.',
      email: 'idrus2@test.com',
      password: 'idrus1232',
      address: 'Rusun BPJS2'
    }) // create Vendor account sample
      .then(user => {
        const objUser = {
          id: user.id
        };
        userId = user.id; // store _id as userId
      });
    done();
  });
  after(done => {
    Vendor.deleteMany({}, () => {}); // delete all account created after test done
    done();
  });
  mocha.it('successfully logged in!', done => {
    chai
      .request(app)
      .post('/api/v1/login')
      .send({
        email: 'idrus2@test.com',
        password: 'idrus1232'
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body)
          .to.have.property('message')
          .that.equal('Succesfully logged in!');
        expect(res.body).to.have.property('token');
        done();
      });
  });
});
