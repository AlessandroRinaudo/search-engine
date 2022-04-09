import {expect} from 'chai';
import 'mocha';
import {Transformer} from "./transformer";
import {RegExParser} from "../parser/parser";
import {NFA} from "../automata/nfa";

/**
 * Different from utils, it returns an NFA
 * @param string
 */
const parse = (string: string): NFA => {
    const parser = new RegExParser(string);
    const tree = parser.parse();
    const transformer = new Transformer(tree);
    return transformer.transform();
}


describe('Transformer test', () => {
    it('should transform ab into concat', () => {
        const nfa = parse('ab');
        expect(nfa.match('ab')).to.be.true;
        expect(nfa.match('a')).to.be.false;
    });

    it('should transform a|b|c into altern', () => {
        const nfa = parse('a|b|c');
        expect(nfa.match('a')).to.be.true;
        expect(nfa.match('b')).to.be.true;
        expect(nfa.match('c')).to.be.true;
        expect(nfa.match('d')).to.be.false;
    });

    it('should transform a* into repetition', () => {
        const nfa = parse('a*');
        expect(nfa.match('a')).to.be.true;
        expect(nfa.match('aa')).to.be.true;
        expect(nfa.match('b')).to.be.false;
    });

});
