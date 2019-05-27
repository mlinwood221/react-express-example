import "regenerator-runtime/runtime";
import axios from 'axios';
import chai, { assert, expect, should } from 'chai';
import chaiHttp from 'chai-http';
import sinon, { stub, match, spy } from 'sinon'; 
import sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';

import ItemService from '../src/services/item';
import itemsEndpoint from '../src/api/items';
import app from '../app';

import mockSearchMlServiceResponse from './mocks/searchMlApiMock.json';
import mockItemMlServiceResponse from './mocks/itemMlApiMock.json';
import mockItemDescriptionMlServiceResponse from './mocks/itemDescriptionMlApiMock.json';
import mockSearchServiceResponse from './mocks/searchServiceMock.json';
import mockItemServiceResponse from './mocks/itemServiceMock.json';


chai.use(chaiHttp);
chai.use(sinonChai);
chai.should();

describe("Test Items", () => {
    describe("Test Route items", () => {
        let sandbox;
        beforeEach( (done) => {
          sandbox = sinon.createSandbox();
          done();
        });

        afterEach( (done) => {
          sandbox.restore();
          done();
        });

        it("should retrieve a list of items", (done) => {
          const resolved = new Promise((r) => r({}));
          sandbox.stub(axios, 'get').returns(resolved);
          sandbox.stub(ItemService.prototype, 'buildItemsResponse').callsFake(() => {
            return mockSearchServiceResponse;
          });
          chai.request(app)
           .get('/items?q=notebook')
           .set('authorization', 'nicolas cuevas')
           .end((err, res) => {
               ItemService.prototype.buildItemsResponse.called.should.equal(true);
               res.should.have.status(200);
               res.body.should.be.a('object');
               res.body.should.have.property('categories');
               res.body.should.have.property('items');
               done();
            });
         });

        it("should retrieve an item", (done) => {
          const resolved = new Promise((r) => r({}));
          sandbox.stub(axios, 'get').returns(resolved);
          sandbox.stub(ItemService.prototype, 'buildSingleItemResponse').callsFake(() => {
            return mockItemServiceResponse;
          });
          chai.request(app)
           .get('/items/MLA688402546')
           .set('authorization', 'nicolas cuevas')
           .end((err, res) => {
               ItemService.prototype.buildSingleItemResponse.called.should.equal(true);
               res.should.have.status(200);
               res.body.should.be.a('object');
               res.body.should.have.property('id');
               done();
            });
         });
    });

    describe("Test Items Service", () => {

        it("should build an items list response", () => {
          const service = new ItemService();
          const buildItemsResponse = service.buildItemsResponse(mockSearchMlServiceResponse);
          buildItemsResponse.should.have.property('items');
          buildItemsResponse.should.have.property('categories');
         });

        it("should build an item response", () => {
          const service = new ItemService();
          const buildItemsResponse = service.buildSingleItemResponse(
            mockItemMlServiceResponse, mockItemDescriptionMlServiceResponse);
          buildItemsResponse.should.have.property('id');
          buildItemsResponse.should.have.property('description');
         });
    });
});