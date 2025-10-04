process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); 

const expect = chai.expect;
chai.use(chaiHttp);

describe('Equipment API Endpoints', () => {
  let createdEquipmentId;

  it('POST /api/equipment - should create new equipment', (done) => {
    chai.request(app)
      .post('/api/equipment')
      .send({ name: 'Test Equipment', description: 'Test Description' })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('_id');
        expect(res.body).to.have.property('name', 'Test Equipment');
        createdEquipmentId = res.body._id;
        done();
      });
  });

  it('GET /api/equipment - should get all equipment', (done) => {
    chai.request(app)
      .get('/api/equipment')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('GET /api/equipment/:id - should get equipment by id', (done) => {
    chai.request(app)
      .get(`/api/equipment/${createdEquipmentId}`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('_id', createdEquipmentId);
        done();
      });
  });

  it('GET /api/equipment/:id - should return 404 for non-existing id', (done) => {
    chai.request(app)
      .get('/api/equipment/000000000000000000000000')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('PUT /api/equipment/:id - should update equipment by id', (done) => {
    chai.request(app)
      .put(`/api/equipment/${createdEquipmentId}`)
      .send({ description: 'Updated Description' })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('description', 'Updated Description');
        done();
      });
  });

  it('PUT /api/equipment/:id - should return 404 when updating non-existing equipment', (done) => {
    chai.request(app)
      .put('/api/equipment/000000000000000000000000')
      .send({ description: 'No Update' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('DELETE /api/equipment/:id - should delete equipment by id', (done) => {
    chai.request(app)
      .delete(`/api/equipment/${createdEquipmentId}`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Equipment deleted');
        done();
      });
  });

  it('DELETE /api/equipment/:id - should return 404 when deleting non-existing equipment', (done) => {
    chai.request(app)
      .delete('/api/equipment/000000000000000000000000')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
