/**?
describe(): It's used to group, which you can nest as deep;
it(): It's the test case;
before(): It's a hook to run before the first it() or describe();
beforeEach(): It’s a hook to run before each it() or describe();
after(): It’s a hook to run after it() or describe();
afterEach(): It’s a hook to run after each it() or describe(); 
 */

const { assert } = require('chai');
const chai = require('chai');
const expect = chai.expect;
const uuid = require('uuid');

const index = require('./../../index');

describe('Template Cloud Function', () => {
  describe('#templateCf()', () => {
    it('Deve ser uma function', () => {
      assert.isFunction(index.templateCf);
    });
  });

  describe('#createSchemaBq()', () => {
    let array = [{ att: 'a' }, { att: 'b' }];
    let obj = { c: 'c' };
    let string = 'teste';

    it('Deve ser uma function', () => {
      assert.isFunction(index.createSchemaBq);
    });
    it('Deve retornar um array com objetos', () => {
      expect(index.createSchemaBq(array, obj, string)).to.be.an('array').that.not.empty;
    });
    it('Array deve ter objeto com a propriedade data', () => {
      expect(index.createSchemaBq(array, obj, string)[0]).to.have.own.property('data');
    });
    it('Array deve ter objeto com a propriedade schema', () => {
      expect(index.createSchemaBq(array, obj, string)[1]).to.have.own.property('schema');
    });
  });

  describe('#addTimestamp()', () => {
    let patternTimestamp = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})$/;
    let obj = { attr: 'attr' };
    it('Deve ser uma function', () => {
      assert.isFunction(index.addTimestamp);
    });

    it('Deve possuir o atributo data', () => {
      expect(index.addTimestamp(obj)).to.have.own.property('data');
    });
    it('Data deve estar no padrão yyyy-mm-ddThh:mm:ss', () => {
      expect(patternTimestamp.test(index.addTimestamp(obj).data)).to.be.true;
    });
  });

  describe('#loadProjectConfig()', () => {
    it('Deve retornar o objeto de configuração', async () => {
      expect(await index.loadProjectConfig()).to.have.own.property('DEPARA_SCHEMA');
    });
  });
});
