import {ALTERN, CONCAT, ETOILE, DOT} from "./constants";

/**
 * Represent the RegEx tree
 */

export class RegExTree {
    root: string;
    subTrees: Array<RegExTree>;

    constructor(root: string, subTrees: Array<RegExTree>) {
        this.root = root;
        this.subTrees = subTrees;
    }

    /**
     * Return the string representation of the Regex tree
     */
    toString(): string {
        if (!this.subTrees.length) return this.root;
        let result = this.root + "(" + this.subTrees[0].toString();
        for (let i = 1; i < this.subTrees.length; i++) {
            result += "," + this.subTrees[i].toString();
        }
        return result + ")";
    }

    rootToString(): string {
        if (this.root == CONCAT) return ".";
        else if (this.root == ETOILE) return "*";
        else if (this.root == ALTERN) return "|";
        else if (this.root == DOT) return ".";
        return this.root;
    }

}
