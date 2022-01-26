
import { NextFunction } from "express";
import axios from "axios";
import request from "supertest";
import chai, { expect } from 'chai';
import sinonChai from "sinon-chai";
import sinon from "sinon";
import { describe, it } from "mocha";

import app from "../src/app";
import { API_ENDPOINT } from "../src/conf";
import { arePointsNear } from "../src/util";
import { getUsers } from "../src/controller";
import * as service from "../src/service";
import { mockData } from "./mock.spec";

chai.use(sinonChai);

describe("BPDTS API TEST SUITE", () => {

  beforeEach( done => {
    sinon.reset();
    sinon.restore();
    done();
  });

  afterEach( done => {
    sinon.reset();
    sinon.restore();
    done();
  });

  /* eslint-disable @typescript-eslint/no-explicit-any */
  describe("CONTROLLER", () => {
    it('should catch a Promise reject object when getUsers is called with Error Call rejected', async () => {
      const nextFunctionSpy: NextFunction = sinon.spy();
      const req = {} as any, res = {} as any;

      const rejected = Promise.reject(new Error('Error Call rejected'));
      sinon.stub(service, 'get').returns(rejected);

      try {
        await getUsers(req, res, nextFunctionSpy);
      } catch (error: any) {
        expect(error).to.be.instanceof(Error);
        expect(nextFunctionSpy).to.have.been.calledOnce;
      }
    });
    it('should catch a Promise reject object when getUsers is called with Connection error', async () => {
      const nextFunctionSpy: NextFunction = sinon.spy();
      const req = {} as any, res = {} as any;

      const err: any = new Error('Connection error');
      err.status = 500;
      const rejected = Promise.reject(err);
      sinon.stub(service, 'get').returns(rejected);

      try {
        await getUsers(req, res, nextFunctionSpy);
      } catch (error: any) {
        expect(error).to.be.instanceof(Error);
        expect(nextFunctionSpy).to.have.been.calledOnce;
      }
    });
    it('should send user that match the logic when getUsers is called', async () => {
      const nextFunctionSpy: NextFunction = sinon.spy();
      const res = { send: sinon.stub() } as any, req = {} as any;

      const resolved = Promise.resolve({ data: mockData });
      sinon.stub(axios, 'get').returns(resolved);

      await getUsers(req, res, nextFunctionSpy);

      expect(nextFunctionSpy).not.called;
      expect(res.send).to.have.been.calledOnce;
    });
  });
  
  describe("SERVICE", () => {
    it("should return a Promise object with mock data object from service GET call", async () => {
      const resolved = Promise.resolve({ data: mockData });
      sinon.stub(axios, 'get').returns(resolved);

      const users: any = await service.get(API_ENDPOINT);
      expect(users.length).equal(1000);
    });

    it("should return a Promise empty object (array) from service GET call \
        if axios response is not well formatted", async () => {
      const resolved = Promise.resolve({ payload: mockData });
      sinon.stub(axios, 'get').returns(resolved);

      const users: any = await service.get(API_ENDPOINT);
      expect(users.length).equal(0);
    });

    it("should return a Promise empty object (array) from service GET call \
        if axios response is just an empty object", async () => {
      const resolved = Promise.resolve({});
      sinon.stub(axios, 'get').returns(resolved);

      const users: any = await service.get(API_ENDPOINT);
      expect(users.length).equal(0);
    });

    it("should return a Promise reject object with error message from service GET call", async () => {
      const rejected = Promise.reject(new Error('Some error'));
      sinon.stub(axios, 'get').returns(rejected);

      try {
        await service.get(API_ENDPOINT);
      } catch (error: any) {
        expect(error).to.be.instanceof(Error);
        expect(error.message).to.equal("Some error");
      }
    });
  });

  describe("UTIL", () => {
    it(`should return four users withing the range of 50 miles`, async () => {
      let index = 0;
      mockData.forEach( user => {
        if(arePointsNear({ latitude: +user.latitude, longitude: +user.longitude})) index++;
      });

      expect(index).equal(4);
    });
  });

  // e2e tests
  describe("ROUTER", () => {
    ["/", "/dfg*/bslj", "/any/london/thing"].forEach( endpoint => {
      it(`should show a 404 error message for any wrong endpoint, like: ${endpoint}`, async () => {
        const resp = await request(app).get(endpoint);

        expect(resp.status).equal(404);
        expect(resp.text).contain(`Page not found: ${endpoint}`);
      });
    });

    it(`should return a response(2** or 5**) from endpoint: ${API_ENDPOINT}`, async () => {
      try {
        const resp = await request(app).get(API_ENDPOINT);
      
        expect(resp.status).equal(200);
        expect(resp.text).not.null;
      } catch (error: any) {              
        expect(error.status).not.equal(200);
        expect(error.message).not.null;
      }
    });
  });
});