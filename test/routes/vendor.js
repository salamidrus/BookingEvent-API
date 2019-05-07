// import modules
const app = require('../../app');
const Event = require('../../models/event');
const Vendor = require('../../models/vendor');

const chai = require('chai');
const { expect } = chai;
const mocha = require('mocha');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

// default token
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJNSEMiLCJpZCI6IjVjY2ZkMzM4NWM4MzkzMDAxNzk1ODdjNiIsImVtYWlsIjoiaWRydXNAdGVzdC5jb20iLCJpYXQiOjE1NTcyMTE3MTI2NDUsImV4cCI6MTU1NzgxNjUxMjY0NSwicm9sZSI6InZlbmRvciJ9.vDDkNsbUGvPEseRioxAUVm2mq6LbhN9-K6zA7lRAB_M';

mocha.describe('Vendor Routes', () => {
  before(done => {
    Vendor.create({
      name: 'Idrus Productions Ltd.',
      email: 'idrus@test.com',
      password: 'idrus123',
      address: 'Rusun BPJS'
    }) // create Vendor account sample
      .then(user => {
        const objUser = {
          id: user.id
        };
        userId = user.id; // store _id as userId
      });
    Event.create({
      name: 'Health Snacking'
    }) // create Event sample
      .then(user => {
        const objUser = {
          id: user.id
        };
        userId = user.id; // store _id as userId
        eventId = String(objUser.id);
      });
    done();
  });
  after(done => {
    Vendor.deleteMany({}, () => {}); // delete all account created after test done
    Event.deleteMany({}, () => {}); // delete all event created after test done
    done();
  });

  mocha.it('Successfully sign up', done => {
    chai
      .request(app)
      .post('/api/v1/vendor/signup')
      .send({
        name: 'Idrus1 Productions Ltd.',
        email: 'idrus1@test.com',
        password: 'idrus1234',
        address: 'Rusun BPJS'
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body)
          .to.have.property('success')
          .that.equal(true);
        expect(res.body)
          .to.have.property('message')
          .that.equal('Account created');
        expect(res.body).to.have.property('data');
        done();
      });
  });
  mocha.it('Succesfully create event', done => {
    chai
      .request(app)
      .post('/api/v1/vendor/create')
      .set('Authorization', token)
      .send({
        name: 'Health Snacking'
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body)
          .to.have.property('success')
          .that.equal(true);
        expect(res.body)
          .to.have.property('data')
          .that.haveOwnProperty('_id');
        expect(res.body)
          .to.have.property('data')
          .that.haveOwnProperty('name');
        expect(res.body)
          .to.have.property('data')
          .that.haveOwnProperty('vendorId');
        expect(res.body)
          .to.have.property('data')
          .that.haveOwnProperty('createdAt');
        expect(res.body)
          .to.have.property('data')
          .that.haveOwnProperty('updatedAt');
        expect(res.body)
          .to.have.property('data')
          .that.haveOwnProperty('__v');

        done();
      });
  });

  mocha.it('Successfully get all events', done => {
    chai
      .request(app)
      .get('/api/v1/vendor/event/getevents')
      .set('Authorization', token)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body)
          .to.have.property('success')
          .that.equal(true);
        expect(res.body)
          .to.have.property('message')
          .that.equal('Showing Event lists');
        expect(res.body)
          .to.have.property('data')
          .to.be.an('Array');
        done();
      });
  });
  mocha.it('Successfully get event by Id', done => {
    chai
      .request(app)
      .get(`/api/v1/vendor/event/get/${eventId}`)
      .set('Authorization', token)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body)
          .to.have.property('success')
          .that.equal(true);
        expect(res.body)
          .to.have.property('message')
          .that.equal('Showing event lists');
        expect(res.body)
          .to.have.property('data')
          .to.be.an('Array');
        done();
      });
  });
  mocha.it('Successfully get event by vendor Id', done => {
    chai
      .request(app)
      .get('/api/v1/vendor/event/getbyid')
      .set('Authorization', token)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body)
          .to.have.property('success')
          .that.equal(true);
        expect(res.body)
          .to.have.property('data')
          .to.be.an('Array');
        done();
      });
  });
  mocha.it('Successfully delete event', done => {
    chai
      .request(app)
      .delete(`/api/v1/vendor/event/delete/${eventId}`)
      .set('Authorization', token)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body)
          .to.have.property('message')
          .that.equal('Event successfully deleted!');
        expect(res.body).to.have.property('data');
        done();
      });
  });
  mocha.it('Successfully get booking by vendor Id', function() {
    this.skip();
  });
  mocha.it('Successfully update event', function() {
    this.skip();
  });
  mocha.it('Successfully update status booking', function() {
    this.skip();
  });
});
