export class KMP {
    static longestPrefix(str: string): Array<number> {
        // table de la longueur de 'str'
        // table[i] : prefixe du plus long prefixe de la sous-chaine str[0...i]
        let maxPrefix = 0;
        let table = new Array(str.length);

        table[0] = 0;

        for (let i = 1; i < str.length; i++) {
            // cas 1: le char courrant ne match pas au dernier char du plus long prefixe
            while (maxPrefix > 0 && str.charAt(i) !== str.charAt(maxPrefix)) {
                maxPrefix = table[maxPrefix - 1];
            }

            // cas 2: le dernier char du plus long prefixe matche avec le char courant de 'str'
            if (str.charAt(maxPrefix) === str.charAt(i)) {
                maxPrefix++;
            }

            table[i] = maxPrefix;
        }

        return table;
    }

    // recherche 'foo' dans la chaine str
    // pour chaque occurrence, retourne les positions de son premier et dernier char
    // tab_res : [ 
    //             [pos0_1, pos0_2],
    //             [pos1_1, pos1_2], 
    //             ...
    //           ]
    static kmpSearch(str: string, foo: string): Array<Array<number>> {
        let tab_res = new Array();
        const tab_prefixes = this.longestPrefix(foo);  // O(n)

        let i = 0, j = 0;
        while (i < str.length) {    // On(n)
            if (str.charAt(i) === foo.charAt(j)) {
                i++;
                j++;
            }
            if (j === foo.length) {
                tab_res.push([i - j, i - j + foo.length]);
                j = tab_prefixes[j - 1];
            }
            else if (str.charAt(i) !== foo.charAt(j)) {
                if (j !== 0) j = tab_prefixes[j - 1];
                else i++;
            }
        }

        return tab_res;
    }

}
