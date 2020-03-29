// importar função
const generateUniqueId = require('../../src/utils/generateUniqueId');

// describe ('categoria do teste', arrow function com os tests)
describe(`Generate Unique ID`, () => {
    // it: testes escritos no formato de uma frase
    it('should generate an 8 digits ID', () =>{
        const id = generateUniqueId();
        
        expect(id).toHaveLength(8);
    });
});