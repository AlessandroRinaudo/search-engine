import {RegExTree} from "../regextree";
import {NFA} from "../automata/nfa";
import {ALTERN, CONCAT, ETOILE} from "../constants";
import {char, concat, or, rep} from "../builder/machines";

/**
 * Transform a RegExTree into a NDFA
 */
export class Transformer {
    regExTree: RegExTree

    constructor(tree: RegExTree) {
        this.regExTree = tree;
    }

    transform(): NFA {
        const visitTree = (tree: RegExTree): NFA => {
            if (tree.subTrees.length === 0) {
                return char(tree.root);
            }
            const subTreesNFA = [];
            for (const subTree of tree.subTrees) {
                subTreesNFA.push(visitTree(subTree));
            }
            const machine = this.getNfaMachine(tree.root);
            return machine(subTreesNFA[0], ...subTreesNFA);
        }
        return visitTree(this.regExTree);
    }

    getNfaMachine(root: string): NFAFun {
        switch (root) {
            case ALTERN:
                return or;
            case CONCAT:
                return concat;
            case ETOILE:
                return rep;
            default:
                throw new Error("Not supported");
        }
    }
}

type NFAFun = ((first: NFA, ...rest: Array<NFA>) => NFA);
