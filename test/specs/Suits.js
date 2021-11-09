describe('Sada 1', () => {

    before(() => {
        console.log('bezi pred vsemi testy v sade 1');
    });

    after(() => {
        console.log('bezi po vsech testech v sade 1');
    });

    beforeEach(() => {
        console.log('bezi pred kazdym testem v sade 1');
    });

    afterEach(() => {
        console.log('bezi po kazdem testu v sade 1');
    });

    it('test 1', () => {
        console.log('test 1');
    });

    it('test 2', () => {
        console.log('test 2');
    });

    it('test 3', () => {
        console.log('test 3');
    });
    
});

describe('Sada 2', () => {

    before(() =>  {
        console.log('Bezi uplne prvni');
    })

    describe('Blok 1', () => {

        before(() =>  {
            console.log('Bezi prvni v bloku 1');
        })

        it('blok 1 test 1', () => {
            console.log('blok 1 test1');
        })

    });

    describe('Blok 2', () => {

        beforeEach(() =>  {
            console.log('Bezi pred kazdym testem v bloku 2');
        })

        it('blok 2 test 1', () => {
            console.log('blok 2 test 1');
        })

        it('blok 2 test2', () => {
            console.log('blok 2 test 2');
        })

    });
    
});