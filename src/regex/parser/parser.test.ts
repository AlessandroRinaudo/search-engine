import { expect } from 'chai';
import 'mocha';

import {RegExParser} from "./parser";

describe('Parser test', () => {

    it('should parse single character a', () => {
        const re = 'a';

        const parser = new RegExParser(re);

        const tree = parser.parse();

        expect(tree.toString()).to.equal('a');
    });

    it('should parse alternation a|b|c', () => {
        const re = 'a|b|c';

        const parser = new RegExParser(re);

        const tree = parser.parse();

        expect(tree.toString()).to.equal('|(|(a,b),c)');
    });

    it('should parse concatenation ab', () => {
        const re = 'ab';

        const parser = new RegExParser(re);

        const tree = parser.parse();

        expect(tree.toString()).to.equal('.(a,b)');
    });

    it('should parse parenthesis', () => {
        const re = '(ab)';

        const parser = new RegExParser(re);

        const tree = parser.parse();

        expect(tree.toString()).to.equal('.(a,b)');
    });

    it('should parse repetition a*', () => {
        const re = 'a*';

        const parser = new RegExParser(re);

        const tree = parser.parse();

        expect(tree.toString()).to.equal('*(a)');
    });

});
