/**
 * Parse the RegEx string into a tree
 */
import {RegExTree} from "../regextree";
import {ALTERN, CONCAT, ETOILE, PROTECTION, PARENTHESEFERMANT, PARENTHESEOUVRANT, DOT} from "../constants";

export class RegExParser {
    regEx: string;

    constructor(regEx: string) {
        this.regEx = regEx;
    }

    parse(): RegExTree {
        let result = new Array<RegExTree>();
        for (let i = 0; i < this.regEx.length; i++) {
            let tmp_tree = new RegExTree(this.regEx.charAt(i), [])
            result.push(tmp_tree)
        }

        return this.parse_(result);
    }

    parse_(result: Array<RegExTree>): RegExTree {
        while (this.containsParenthese(result)) result = this.processParenthese(result);
        while (this.containsEtoile(result)) result = this.processEtoile(result);
        while (this.containsConcat(result)) result = this.processConcat(result);
        // while (this.containsDot(result)) result = this.processDot(result);
        while (this.containsAltern(result)) result = this.processAltern(result);
        // console.log(result)

        if (result.length > 1) {
            throw new Error("Oops, had a problem while parsing...");
        }

        return this.removeProtection(result[0]);
    }

    // concat process
    containsConcat(trees: Array<RegExTree>): boolean {
        let firstFound = false;
        for (let t of trees) {
            if (!firstFound && t.root != ALTERN) {
                firstFound = true;
                continue;
            }
            if (firstFound) {
                if (t.root != ALTERN)
                    return true;
                else
                    firstFound = false;
            }
        }
        return false;
    }

    processConcat(trees: Array<RegExTree>): Array<RegExTree> {
        let result = new Array<RegExTree>();
        let found = false;
        let firstFound = false;
        for (let t of trees) {
            if (!found && !firstFound && t.root != ALTERN) {
                firstFound = true;
                result.push(t);
                continue;
            }
            if (!found && firstFound && t.root == ALTERN) {
                firstFound = false;
                result.push(t);
                continue;
            }
            if (!found && firstFound && t.root != ALTERN) {
                found = true;
                let last = result.pop();
                let subTrees = new Array<RegExTree>();
                subTrees.push(last as RegExTree);
                subTrees.push(t);
                result.push(new RegExTree(CONCAT, subTrees));
            } else {
                result.push(t);
            }
        }
        return result;
    }

    // etoile process
    containsEtoile(trees: Array<RegExTree>): boolean {
        for (let t of trees) {
            if (t.root == ETOILE && !t.subTrees.length)
                return true;
        }
        return false;
    }

    processEtoile(trees: Array<RegExTree>): Array<RegExTree> {
        let result = new Array<RegExTree>();
        let found = false;
        for (let t of trees) {
            if (!found && t.root == ETOILE && !t.subTrees.length) {
                if (!result.length) throw "Oops...";
                found = true;
                let last = result.pop();
                let subTrees = new Array<RegExTree>();
                subTrees.push(last as RegExTree);
                result.push(new RegExTree(ETOILE, subTrees));
            } else {
                result.push(t);
            }
        }
        return result;
    }

    // parenthese process
    containsParenthese(trees: Array<RegExTree>): boolean {
        for (let tree of trees) {
            if (tree.root == PARENTHESEFERMANT || tree.root == PARENTHESEOUVRANT)
                return true;
        }
        return false;
    }

    processParenthese(trees: Array<RegExTree>): Array<RegExTree> {
        let result = new Array<RegExTree>();
        let found = false;
        for (let t of trees) {
            if (!found && t.root == PARENTHESEFERMANT) {
                let done = false;
                let content = new Array<RegExTree>();
                while (!done && result.length) {
                    if (result[result.length - 1].root == PARENTHESEOUVRANT) {
                        done = true;
                        result.pop();
                    } else {
                        content.unshift(result.pop() as RegExTree);
                    }
                }
                if (!done) throw "Oops... !done";
                found = true;
                let subTrees = new Array<RegExTree>();
                subTrees.push(this.parse_(content));
                result.push(new RegExTree(PROTECTION, subTrees));
            } else {
                result.push(t);
            }
        }
        if (!found) throw "Oops...";
        return result;
    }

    removeProtection(tree: RegExTree): RegExTree {
        if (tree.root == PROTECTION && tree.subTrees.length != 1) throw "parsing error";
        if (!tree.subTrees.length) return tree;
        if (tree.root == PROTECTION) return this.removeProtection(tree.subTrees[0]);

        let subTrees = new Array<RegExTree>();
        for (let t of tree.subTrees) subTrees.push(this.removeProtection(t));
        return new RegExTree(tree.root, subTrees);
    }

    // dot process
    containsDot(trees: Array<RegExTree>): boolean {
        for (let tree of trees) {
            if (tree.root == DOT && !tree.subTrees.length)
                return true;
        }
        return false;
    }

    processDot(trees: Array<RegExTree>): Array<RegExTree> {
        let result = new Array<RegExTree>();
        let found = false;
        let gauche = null;
        let done = false;

        for (let t of trees) {
            if (!found && t.root == DOT && !t.subTrees.length) {
                if (!result.length) throw "Error: result is empty"
                found = true;
                gauche = result.pop();
                continue;
            }
            if (found && !done) {
                if (gauche == null) throw "Error: gauche=null"
                done = true;
                let subTrees = new Array<RegExTree>();
                subTrees.push(gauche);
                subTrees.push(t);
                result.push(new RegExTree(DOT, subTrees))
            } else {
                result.push(t);
            }
        }
        return result;
    }

    // altern process
    containsAltern(trees: Array<RegExTree>): boolean {
        for (let tree of trees) {
            if (tree.root == ALTERN && !tree.subTrees.length)
                return true;
        }
        return false;
    }

    processAltern(trees: Array<RegExTree>): Array<RegExTree> {
        let result = new Array<RegExTree>();
        let found = false;
        let gauche = null;
        let done = false;

        for (let t of trees) {
            if (!found && t.root == ALTERN && !t.subTrees.length) {
                if (!result.length) throw "Error: result is empty"
                found = true;
                gauche = result.pop();
                continue;
            }
            if (found && !done) {
                if (gauche == null) throw "Error: gauche=null"
                done = true;
                let subTrees = new Array<RegExTree>();
                subTrees.push(gauche);
                subTrees.push(t);
                result.push(new RegExTree(ALTERN, subTrees))
            } else {
                result.push(t);
            }
        }
        return result;
    }

}
