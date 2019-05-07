// import modules
const app = require('../../app');
const Event = require('../../models/event');
const HrAccount = require('../../models/hrAccount');

const chai = require('chai');
const { expect } = chai;
const mocha = require('mocha');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

// default token
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJNSEMiLCJpZCI6IjVjY2ZkMzcwNWM4MzkzMDAxNzk1ODdjNyIsImVtYWlsIjoiZ2xpbnRzQGluZG9uZXNpYS5jb20iLCJpYXQiOjE1NTcyMjAwMDAyNTEsImV4cCI6MTU1NzgyNDgwMDI1MSwicm9sZSI6ImhyQWNjb3VudCJ9.hbIEn5GFJAvoRXL9ocoelcpBAHTEqgV-zt_53Pv-x3s';

mocha.describe('HR Account Routes', () => {
  before(done => {
    HrAccount.create({
      companyName: 'PT Glints Indonesia, Tbk. ',
      email: 'glints@indonesia.com',
      password: 'glints123',
      address: {
        city: 'Kota Jakarta Selatan',
        streetName: 'Jl. Nongsa No. 24 Blok VII',
        postalCode: '294465'
      },
      phone: '07387486946'
    }) // create Hr account sample
      .then(user => {
        const objUser = {
          id: user.id
        };
        userId = user.id; // store _id as userId
      });
    Event.create({
      name: 'Health Consultation'
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
    HrAccount.deleteMany({}, () => {}); // delete all account created after test done
    Event.deleteMany({}, () => {}); // delete all event created after test done
    done();
  });

  mocha.it('Successfully sign up', done => {
    chai
      .request(app)
      .post('/api/v1/hraccount/signup')
      .send({
        companyName: 'PT Glints Indonesia1, Tbk. ',
        email: 'glints1@indonesia.com',
        password: 'glints1234',
        address: {
          city: 'Kota Jakarta Selatan1',
          streetName: 'Jl. Nongsa No. 24 Blok VII1',
          postalCode: '2944651'
        },
        phone: '073874869461'
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

  mocha.it('Successfully get all events', done => {
    chai
      .request(app)
      .get('/api/v1/hraccount/event/getevents')
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
      .get(`/api/v1/hraccount/event/getevents/${eventId}`)
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
  mocha.it('Successfully show grouped event', done => {
    chai
      .request(app)
      .get('/api/v1/hraccount/event/getgroupedevents')
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
  mocha.it('Successfully create booking', done => {
    chai
      .request(app)
      .post('/api/v1/hraccount/booking')
      .set('Authorization', token)
      .send({
        date: ['2019-05-23', '2019-05-08', '2019-05-14'],
        eventId: eventId
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body)
          .to.have.property('success')
          .that.equal(true);
        expect(res.body).to.have.property('data');
        done();
      });
  });
  mocha.it('Successfully get all booking', done => {
    chai
      .request(app)
      .get('/api/v1/hraccount/booking/getall')
      .set('Authorization', token)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body)
          .to.have.property('success')
          .that.equal(true);
        expect(res.body)
          .to.have.property('message')
          .that.equal('Showing book lists');
        expect(res.body)
          .to.have.property('data')
          .to.be.an('Array');
        done();
      });
  });
  mocha.it('Successfully get booking by HR ID', done => {
    chai
      .request(app)
      .get('/api/v1/hraccount/booking/get')
      .set('Authorization', token)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body)
          .to.have.property('success')
          .that.equal(true);
        expect(res.body)
          .to.have.property('message')
          .that.equal('Showing your book lists');
        expect(res.body).to.have.property('data');
        done();
      });
  });
});
